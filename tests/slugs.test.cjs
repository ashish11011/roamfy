const assert = require("node:assert/strict");
const { test } = require("node:test");
const { loadSource } = require("./helpers/load-source.cjs");

async function actionsHarness({ authorized = true } = {}) {
  const tables = Object.fromEntries(["tripTable", "groupTripTable", "blogTable"].map(name => [
    name, { id: `${name}.id`, slug: `${name}.slug` },
  ]));
  const records = new Map(Object.values(tables).map(table => [table, []]));
  const writes = [], invalidations = [];
  const select = table => ({
    where: async ({ column, value }) => records.get(table).filter(row =>
      row[column === table.id ? "id" : "slug"] === value).map(row => ({ ...row })),
  });
  const db = {
    select: () => ({ from: select }),
    insert: table => ({ values: data => ({ returning: async () => {
      const row = { ...data, id: `id-${records.get(table).length + 1}` };
      records.get(table).push(row);
      writes.push({ table, row });
      return [row];
    } }) }),
    update: table => ({ set: data => ({ where: ({ column, value }) => ({
      returning: async () => {
        assert.equal(column, table.id, "Updates must identify records by ID");
        const row = records.get(table).find(row => row.id === value);
        if (!row) return [];
        Object.assign(row, data);
        writes.push({ table, row });
        return [row];
      },
    }) }) }),
  };
  const mocks = {
    "./db": { db },
    "../db/schema": tables,
    "./slug": await loadSource("lib/slug.js"),
    "../src/helper/groupTourPricing": await loadSource("src/helper/groupTourPricing.js"),
    "./adminAuth": { requireAdmin: async () => {
      if (!authorized) throw new Error("Admin access required.");
    } },
    "drizzle-orm": { eq: (column, value) => ({ column, value }) },
    "next/cache": { revalidatePath: (...args) => invalidations.push(args) },
  };
  const trip = await loadSource("lib/tripHelper.js", mocks);
  const group = await loadSource("lib/groupTripHelper.js", mocks);
  const blog = await loadSource("lib/blogHelper.js", mocks);
  return {
    kinds: [
      { table: tables.tripTable, create: trip.insertTrip, edit: trip.editTrip },
      { table: tables.groupTripTable, create: group.insertGroupTrip, edit: group.editGroupTrip },
      { table: tables.blogTable, create: blog.insertBlog, edit: blog.updateBlogByID },
    ],
    records, writes, invalidations,
  };
}

const details = { title: "Manali Family Holiday", sharingPrices: { 2: "12000" } };

test("all admin content supports custom slugs and title fallback with unique suffixes", async () => {
  const { kinds } = await actionsHarness();
  for (const kind of kinds) {
    const [custom] = await kind.create({ ...details, slug: "  MY--Holiday  " });
    assert.equal(custom.slug, "my-holiday");
    const [automatic] = await kind.create(details);
    assert.equal(automatic.slug, "manali-family-holiday");
    const [duplicateTitle] = await kind.create({ ...details, slug: "   " });
    assert.equal(duplicateTitle.slug, "manali-family-holiday-2");
    const [another] = await kind.create({ ...details, slug: "" });
    assert.equal(another.slug, "manali-family-holiday-3");
  }
});

test("edits preserve existing slugs, support customization and regenerate when cleared", async () => {
  const { kinds, records } = await actionsHarness();
  for (const kind of kinds) {
    // Existing legacy URLs must survive ordinary title/content edits.
    records.get(kind.table).push({ id: "legacy", slug: "-old-url" });
    let [row] = await kind.edit({ ...details, id: "legacy", title: "New title" });
    assert.equal(row.slug, "-old-url");
    [row] = await kind.edit({ ...details, id: "legacy", slug: "-old-url" });
    assert.equal(row.slug, "-old-url");
    [row] = await kind.edit({ ...details, id: "legacy", slug: "CUSTOM Tour" });
    assert.equal(row.slug, "custom-tour");
    [row] = await kind.edit({ ...details, id: "legacy", slug: "custom-tour" });
    assert.equal(row.slug, "custom-tour", "A record can retain its own slug");
    [row] = await kind.edit({ ...details, id: "legacy", slug: " " });
    assert.equal(row.slug, "manali-family-holiday");
  }
});

test("duplicate and invalid custom slugs are rejected without modifying records", async () => {
  const { kinds, writes } = await actionsHarness();
  for (const kind of kinds) {
    await kind.create({ ...details, slug: "taken" });
    const [other] = await kind.create({ ...details, slug: "other" });
    const count = writes.length;
    for (const slug of ["taken", " TAKEN ", "///", "---", 123]) {
      await assert.rejects(() => kind.create({ ...details, slug }), /slug/);
      await assert.rejects(() => kind.edit({ ...details, id: other.id, slug }), /slug/);
    }
    assert.equal(other.slug, "other");
    assert.equal(writes.length, count);
    await assert.rejects(() => kind.edit({ ...details, id: "missing", slug: "new" }), /not found/);
  }
});

test("blog slug changes update by ID and invalidate both public and admin URLs", async () => {
  const { kinds, invalidations } = await actionsHarness();
  const blog = kinds[2];
  const [row] = await blog.create({ ...details, slug: "old-blog" });
  invalidations.length = 0;
  await blog.edit({ ...details, id: row.id, slug: "new-blog" });
  for (const path of ["/blog/old-blog", "/blog/new-blog", "/admin/blogs/old-blog",
    "/admin/blogs/new-blog", "/admin/blogs", "/blog", "/", "/sitemap.xml"]) {
    assert(invalidations.some(([value]) => value === path), path);
  }
  // The old slug-only calling convention remains compatible with existing callers.
  const [saved] = await blog.edit({ ...details, slug: "new-blog" });
  assert.equal(saved.id, row.id);
});

test("slug mutations require admin authorization", async () => {
  const { kinds, writes } = await actionsHarness({ authorized: false });
  for (const kind of kinds) {
    await assert.rejects(() => kind.create(details), /Admin access required/);
    await assert.rejects(() => kind.edit({ ...details, id: "id" }), /Admin access required/);
  }
  assert.equal(writes.length, 0);
});
