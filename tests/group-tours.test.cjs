const assert = require("node:assert/strict");
const { test } = require("node:test");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { loadSource } = require("./helpers/load-source.cjs");

const pricingPromise = loadSource("src/helper/groupTourPricing.js");

test("sharing prices support any combination and normalize INR amounts", async () => {
  const { normalizeTripPricing } = await pricingPromise;
  for (const sharingPrices of [{ 2: "12000" }, { 3: "10000.5", 4: "9000" }, { 2: 12000, 3: 10000, 4: 9000 }]) {
    const result = normalizeTripPricing({ isGroupTour: true, price: "stale price", sharingPrices });
    assert.equal(result.price, null);
    assert.deepEqual(Object.keys(result.sharingPrices), Object.keys(sharingPrices));
    for (const key of Object.keys(sharingPrices)) {
      assert.equal(result.sharingPrices[key], Number(sharingPrices[key]).toFixed(2));
    }
  }
});

test("group tours reject missing, unsupported, non-positive and malformed prices", async () => {
  const { normalizeTripPricing } = await pricingPromise;
  for (const sharingPrices of [{}, null, [], { 5: "100" }, { 2: "" }, { 2: "0" }, { 2: "-1" }, { 2: "NaN" }, { 2: Infinity }, { 2: true }, { 2: "12.345" }, { 2: "1e3" }, { 2: "12000", 3: "" }]) {
    assert.throws(() => normalizeTripPricing({ isGroupTour: true, sharingPrices }));
  }
  assert.throws(() => normalizeTripPricing({ isGroupTour: "true", sharingPrices: { 2: 100 } }));
});

test("regular trips retain their single price and clear stale sharing options", async () => {
  const { normalizeTripPricing, getSharingOptions } = await pricingPromise;
  assert.deepEqual(normalizeTripPricing({ price: "15000", sharingPrices: { 2: "10" } }), {
    isGroupTour: false, price: "15000", sharingPrices: {},
  });
  assert.deepEqual(getSharingOptions({ 2: "12000", 3: "", 4: -1, 5: 50 }).map(option => option.key), ["2"]);
});

async function actionsHarness({ authorized = true, existingSlugs = [] } = {}) {
  const writes = [], invalidations = [], selected = [];
  const tripTable = { id: "trip-id", slug: "trip-slug", isVisible: "trip-visible" };
  const groupTripTable = { id: "group-id", slug: "group-slug", isVisible: "group-visible" };
  const query = (table, condition) => {
    const rows = condition?.column === groupTripTable.slug && existingSlugs.includes(condition.value) ? [{ id: "exists" }] : [];
    return { where: value => { selected.push({ table, condition: value }); return query(table, value); }, limit: async () => rows, then: (...args) => Promise.resolve(rows).then(...args) };
  };
  const db = {
    select: () => ({ from: table => { selected.push({ table }); return query(table); } }),
    insert: table => ({ values: data => { writes.push({ table, data }); return { returning: async () => [data] }; } }),
    update: table => ({ set: data => { writes.push({ table, data }); return { where: () => ({ then: resolve => resolve(), returning: async () => [data] }) }; } }),
    delete: table => ({ where: () => { writes.push({ table, deleted: true }); return Promise.resolve(); } }),
  };
  const mocks = {
    "./db": { db }, "../db/schema": { tripTable, groupTripTable },
    "../src/helper/groupTourPricing": await pricingPromise,
    "./adminAuth": { requireAdmin: async () => { if (!authorized) throw new Error("Admin access required."); } },
    "next/cache": { revalidatePath: (...args) => invalidations.push(args) },
    "drizzle-orm": { eq: (column, value) => ({ column, value }), like: () => ({}), and: (...conditions) => conditions },
  };
  const groupActions = await loadSource("lib/groupTripHelper.js", mocks);
  const actions = await loadSource("lib/tripHelper.js", {
    ...mocks,
  });
  return { actions, groupActions, writes, invalidations, selected, tripTable, groupTripTable };
}

test("group create/edit use their own table, save rates and leave existing slugs stable", async () => {
  const { groupActions, writes, invalidations, groupTripTable } = await actionsHarness();
  await groupActions.insertGroupTrip({ title: "Manali Group Tour", sharingPrices: { 2: "12000", 4: "9000" }, isVisible: false });
  assert.equal(writes[0].table, groupTripTable);
  assert.equal(writes[0].data.slug, "manali-group-tour");
  assert.equal(writes[0].data.isVisible, false);
  assert.equal(writes[0].data.price, undefined);
  assert.deepEqual(writes[0].data.sharingPrices, { 2: "12000.00", 4: "9000.00" });
  await groupActions.editGroupTrip({ id: "id", slug: "new-slug", title: "Renamed", sharingPrices: { 3: "10000" } });
  assert.equal(writes[1].table, groupTripTable);
  assert.equal(writes[1].data.slug, undefined);
  assert.deepEqual(writes[1].data.sharingPrices, { 3: "10000.00" });
  assert(invalidations.some(([path]) => path === "/"));
  assert(invalidations.some(([path]) => path === "/sitemap.xml"));
  assert(invalidations.some(([path, type]) => path === "/group-trip/[slug]" && type === "page"));
  assert(invalidations.some(([path]) => path === "/admin/group-trips"));
});

test("regular trip writes keep their single price and never write group data", async () => {
  const { actions, writes, tripTable } = await actionsHarness();
  await actions.insertTrip({ title: "Regular trip", price: "15000", sharingPrices: { 2: "100" } });
  await actions.editTrip({ id: "id", title: "Regular trip", slug: "regular-trip", price: "16000" });
  assert(writes.every(write => write.table === tripTable));
  assert.equal(writes[0].data.price, "15000");
  assert.equal(writes[1].data.price, "16000");
  assert(writes.every(write => !Object.hasOwn(write.data, "sharingPrices")));
});

test("invalid group pricing is rejected by both actions before database writes", async () => {
  const { groupActions, writes } = await actionsHarness();
  for (const action of [groupActions.insertGroupTrip, groupActions.editGroupTrip]) {
    await assert.rejects(() => action({ title: "Bad tour", sharingPrices: { 2: "-100" } }));
  }
  assert.equal(writes.length, 0);
});

test("group slug collisions are checked within the group table", async () => {
  const { groupActions, writes } = await actionsHarness({ existingSlugs: ["manali", "manali-2"] });
  await groupActions.insertGroupTrip({ title: "Manali", sharingPrices: { 2: "1000" } });
  assert.equal(writes[0].data.slug, "manali-3");
});

test("group admin operations require authorization before reading or writing", async () => {
  const { groupActions, writes, selected } = await actionsHarness({ authorized: false });
  for (const operation of [
    () => groupActions.insertGroupTrip({}), () => groupActions.editGroupTrip({ id: "id" }),
    () => groupActions.getAllGroupTrips(), () => groupActions.getGroupTripById("id"),
    () => groupActions.toggleGroupTripVisibility({ id: "id", isVisible: true }),
    () => groupActions.deleteGroupTrip("id"),
  ]) await assert.rejects(operation, /Admin access required/);
  assert.equal(writes.length, 0);
  assert.equal(selected.length, 0);
});

test("group visibility/delete only affect the group table and public reads exclude hidden groups", async () => {
  const { groupActions, writes, selected, groupTripTable } = await actionsHarness();
  await groupActions.toggleGroupTripVisibility({ id: "id", isVisible: false });
  await groupActions.deleteGroupTrip("id");
  assert(writes.every(write => write.table === groupTripTable));
  assert.equal(writes[0].data.isVisible, false);
  assert.equal(writes[1].deleted, true);
  await groupActions.getGroupTripBySlug("manali");
  const conditions = selected.find(read => Array.isArray(read.condition)).condition;
  assert(conditions.some(condition => condition.column === groupTripTable.slug && condition.value === "manali"));
  assert(conditions.some(condition => condition.column === groupTripTable.isVisible && condition.value === true));
});

async function publicComponents() {
  const { GroupTourPrices } = await loadSource("src/components/groupTourPrices.jsx", {
    "@/helper/groupTourPricing": await pricingPromise,
  });
  const components = await loadSource("src/app/(normal)/packages.jsx", {
    "@/components/groupTourPrices": { GroupTourPrices },
    "@/lib/utils": { cn: (...classes) => classes.filter(Boolean).join(" ") },
    "next/link": ({ href, children }) => React.createElement("a", { href }, children),
    "next/image": props => React.createElement("img", props),
    "motion/react": { motion: { div: ({ initial, animate, transition, ...props }) => React.createElement("div", props) } },
  });
  return { ...components, GroupTourPrices };
}

test("landing sections separate group tours from trips and show only available per-person rates", async () => {
  const { Packages, GroupTourPackages } = await publicComponents();
  const regular = renderToStaticMarkup(React.createElement(Packages, { data: [
    { slug: "manali", title: "Regular Trip", bannerImage: "/trip.jpg", isDomestic: true },
  ] }));
  const group = renderToStaticMarkup(React.createElement(GroupTourPackages, { data: [
    { slug: "manali", title: "Group Tour", bannerImage: "/group.jpg", sharingPrices: { 2: "12000", 4: "9000" } },
  ] }));
  assert.match(regular, /Regular Trip/);
  assert.doesNotMatch(regular, /Group Tour/);
  assert.match(group, /Group Tour Package/);
  assert.doesNotMatch(group, /Regular Trip/);
  assert.match(regular, /href="\/trip\/manali"/);
  assert.match(group, /href="\/group-trip\/manali"/);
  assert.match(group, /Price per person/);
  assert.match(group, /2-sharing/);
  assert.match(group, /4-sharing/);
  assert.doesNotMatch(group, /3-sharing/);
  assert.match(group, /12,000/);
  assert.match(group, /9,000/);
});

test("group tour section has an empty state and detail pricing includes all enabled options", async () => {
  const { GroupTourPackages, GroupTourPrices } = await publicComponents();
  assert.match(renderToStaticMarkup(React.createElement(GroupTourPackages)), /available soon/);
  const prices = renderToStaticMarkup(React.createElement(GroupTourPrices, { sharingPrices: { 2: "12000", 3: "10000", 4: "9000" } }));
  for (const label of ["2-sharing", "3-sharing", "4-sharing", "Price per person"]) assert(prices.includes(label));
});

function descendants(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(descendants);
  return [node, ...descendants(node.props?.children)];
}

async function formHarness(tripData, isGroupTour = true) {
  const states = [], saved = [];
  let cursor = 0;
  const stub = () => null;
  const { TripForm } = await loadSource("src/components/tripForm.jsx", {
    react: { useState: initial => { const index = cursor++; if (!(index in states)) states[index] = initial; return [states[index], next => { states[index] = typeof next === "function" ? next(states[index]) : next; }]; } },
    "@/conponents/input": stub, "@/conponents/textArea": stub,
    "./inputArray": { InputArray: stub }, "./customSwitch": { CustomSwitch: stub },
    "./bannerImage": { UploadImage: stub }, "./imagesInput": { Images: stub },
    "@/conponents/RichTextEditor": stub,
    "next/navigation": { useRouter: () => ({ push: () => {}, refresh: () => {} }) },
    "@/lib/utils": { cn: () => "" }, "@/helper/groupTourPricing": await pricingPromise,
    lib: {
      insertTrip: async details => saved.push({ ...details, action: "insertTrip" }),
      editTrip: async details => saved.push({ ...details, action: "editTrip" }),
      insertGroupTrip: async details => saved.push({ ...details, action: "insertGroupTrip" }),
      editGroupTrip: async details => saved.push({ ...details, action: "editGroupTrip" }),
    },
  });
  const render = () => { cursor = 0; return descendants(TripForm({ tripData, isGroupTour })); };
  return { render, saved };
}

test("admin can enable a sharing option, enter its rate, disable it and save other rates", async () => {
  const { render, saved } = await formHarness({ id: "id", slug: "group", isGroupTour: true, isVisible: false, sharingPrices: { 2: "12000" } });
  let nodes = render();
  assert.equal(nodes.find(node => node.props?.title === "Is Visible").props.value, false);
  nodes.filter(node => node.type === "input" && node.props.type === "checkbox")[1].props.onChange({ target: { checked: true } });
  nodes = render();
  nodes.filter(node => node.type === "input" && node.props.type === "number")[1].props.onChange({ target: { value: "10000" } });
  nodes = render();
  nodes.filter(node => node.type === "input" && node.props.type === "checkbox")[0].props.onChange({ target: { checked: false } });
  nodes = render();
  await nodes.find(node => node.props?.onClickHandler).props.onClickHandler();
  assert.equal(saved.length, 1);
  assert.deepEqual(saved[0].sharingPrices, { 3: "10000.00" });
  assert.equal(saved[0].slug, "group");
  assert.equal(saved[0].isVisible, false);
  assert.equal(saved[0].action, "editGroupTrip");
});

test("group editor has sharing controls and shows validation errors instead of saving empty rates", async () => {
  const { render, saved } = await formHarness();
  const nodes = render();
  assert(nodes.some(node => node.type === "fieldset"));
  assert(!nodes.some(node => node.props?.title === "Price"));
  await nodes.find(node => node.props?.onClickHandler).props.onClickHandler();
  assert.equal(saved.length, 0);
  assert(render().some(node => node.props?.role === "alert"));
});

test("regular editor keeps a single price input and calls only regular trip actions", async () => {
  const { render, saved } = await formHarness({ title: "Regular trip", price: "15000" }, false);
  const nodes = render();
  assert(nodes.some(node => node.props?.title === "Price"));
  assert(!nodes.some(node => node.type === "fieldset"));
  await nodes.find(node => node.props?.onClickHandler).props.onClickHandler();
  assert.equal(saved[0].action, "insertTrip");
  assert.equal(saved[0].price, "15000");
});

test("group details route uses its own lookup and handles missing groups with 404", async () => {
  let group = { title: "Manali Group", sharingPrices: { 2: "12000" }, hotels: [] };
  let requestedSlug;
  const { default: page } = await loadSource("src/app/(normal)/group-trip/[slug]/page.jsx", {
    "@/conponents/tripHero": () => null,
    "lib/groupTripHelper": { getGroupTripBySlug: async slug => { requestedSlug = slug; return group ? [group] : []; } },
    "../../trip/tripDetails": { TripDetails: () => null }, "../../trip/hotelSection": { HotelSection: () => null },
  });
  const tree = await page({ params: Promise.resolve({ slug: "manali" }) });
  assert.equal(requestedSlug, "manali");
  assert(descendants(tree).some(node => node.props?.isGroupTour === true && node.props.tripData === group));
  group = null;
  await assert.rejects(() => page({ params: Promise.resolve({ slug: "missing" }) }), error => error.digest === "NEXT_HTTP_ERROR_FALLBACK;404");
});

test("admin table routes group edit, visibility and delete to group controls only", async () => {
  const states = [], calls = [];
  let cursor = 0;
  const stub = () => null;
  const { TripTable } = await loadSource("src/app/(admin)/admin/tripTable.js", {
    react: {
      useState: initial => { const index = cursor++; if (!(index in states)) states[index] = initial; return [states[index], next => { states[index] = typeof next === "function" ? next(states[index]) : next; }]; },
      useEffect: () => {},
    },
    "@/components/ui/table": Object.fromEntries(["Table", "TableBody", "TableCell", "TableHead", "TableHeader", "TableRow"].map(key => [key, stub])),
    "@/components/ui/switch": { Switch: stub }, "next/link": stub,
    "next/navigation": { useRouter: () => ({ refresh: stub }) },
    "@/helper/groupTourPricing": await pricingPromise,
    lib: {
      toggleGroupTripVisibility: async details => calls.push({ action: "group-visibility", details }),
      toggleTripVisiblity: async details => calls.push({ action: "trip-visibility", details }),
      deleteGroupTrip: async id => calls.push({ action: "group-delete", id }),
    },
  });
  const data = [{ id: "group-id", title: "Group", isVisible: true, sharingPrices: { 2: "10000" } }];
  const render = () => { cursor = 0; return descendants(TripTable({ tripData: data, isGroupTour: true })); };
  const nodes = render();
  assert(nodes.some(node => node.props?.href === "/admin/group-trip?id=group-id"));
  await nodes.find(node => node.props?.onCheckedChange).props.onCheckedChange();
  await render().find(node => node.type === "button").props.onClick();
  assert.deepEqual(calls, [
    { action: "group-visibility", details: { id: "group-id", isVisible: false } },
    { action: "group-delete", id: "group-id" },
  ]);
});

test("admin guard rejects unsigned and unauthorized sessions", async () => {
  let session;
  const { requireAdmin } = await loadSource("lib/adminAuth.js", {
    "next-auth": { getServerSession: async () => session },
    "../src/lib/auth": { authOptions: {} },
    "../src/const/admin": { ADMIN_EMAILS: ["admin@example.com"] },
  });
  await assert.rejects(requireAdmin, /Admin access required/);
  session = { user: { email: "visitor@example.com" } };
  await assert.rejects(requireAdmin, /Admin access required/);
  session = { user: { email: "admin@example.com" } };
  await requireAdmin();
});

test("sitemap keeps identical trip and group slugs on independent public routes", async () => {
  const blogTable = { slug: "blog" }, tripTable = { slug: "trip", isVisible: "trip-visible" }, groupTripTable = { slug: "group", isVisible: "group-visible" };
  const { default: sitemap } = await loadSource("src/app/sitemap.jsx", {
    "../../db/schema": { blogTable, tripTable, groupTripTable },
    "drizzle-orm": { eq: (column, value) => ({ column, value }) },
    "../../lib/db": { db: { select: () => ({ from: table => table === blogTable ? Promise.resolve([]) : {
      where: condition => {
        assert.equal(condition.column, table.isVisible);
        assert.equal(condition.value, true);
        return Promise.resolve([{ slug: "manali" }]);
      },
    } }) } },
  });
  const entries = await sitemap();
  assert(entries.some(entry => entry.url.endsWith("/trip/manali")));
  assert(entries.some(entry => entry.url.endsWith("/group-trip/manali")));
});
