const assert = require("node:assert/strict");
const { test } = require("node:test");
const { loadSource } = require("./helpers/load-source.cjs");

function descendants(node) {
  if (!node || typeof node !== "object") return [];
  return [node, ...[node.props?.children].flat(Infinity).flatMap(descendants)];
}

async function editorHarness(data, { fail = false } = {}) {
  const states = [], calls = [], routes = [];
  let cursor = 0;
  const stub = () => null;
  const extension = { configure: () => ({}) };
  const save = action => async details => {
    calls.push({ action, details });
    if (fail) throw new Error("This slug is already in use. Choose another slug.");
    return [{ ...details, id: details.id || "new-blog", slug: details.slug || "from-title" }];
  };
  const mocks = {
    react: {
      useState: initial => {
        const index = cursor++;
        if (!(index in states)) states[index] = initial;
        return [states[index], next => { states[index] = next; }];
      },
      useEffect: stub,
    },
    "next/navigation": { useRouter: () => ({ replace: url => routes.push(url), refresh: stub }) },
    "@tiptap/react": { useEditor: () => ({
      isActive: () => false, getHTML: () => "<p>Blog content</p>", commands: { clearContent: stub },
    }), EditorContent: stub },
    "./inputImage": stub,
    "./inputTagList": stub,
    "sonner": { toast: stub },
    "@/components/ui/toggle": { Toggle: stub },
    "@/components/ui/button": { Button: stub },
    "@/conponents/input": stub,
    "@/conponents/textArea": stub,
    "@/conponents/admin/selectBlogCategories": { SelectBlogCategories: stub },
    "@/conponents/admin/datePicker": stub,
    "@/components/ui/sonner": { Toaster: stub },
    "./SelectUser": { SelectUser: stub },
    "@/const/blogConst": { blogUser: [] },
    "@/components/bannerImage": { UploadImage: stub },
    lib: { insertBlog: save("create"), updateBlogByID: save("edit") },
  };
  for (const name of ["starter-kit", "extension-youtube", "extension-table", "extension-table-row",
    "extension-table-header", "extension-table-cell", "extension-underline", "extension-link", "extension-text-align"]) {
    mocks[`@tiptap/${name}`] = extension;
  }
  const { default: Editor } = await loadSource("src/conponents/Editro.jsx", mocks);
  const render = () => { cursor = 0; return descendants(Editor({ data })); };
  const saveForm = async () => {
    await render().find(node => node.props?.children === "Save").props.onClick();
  };
  return { render, saveForm, calls, routes };
}

test("blog editor submits edited slugs with the stable record ID and opens the saved URL", async () => {
  const { render, saveForm, calls, routes } = await editorHarness({ id: "blog-id", slug: "old-blog" });
  const input = render().find(node => node.props?.title === "Slug (optional)");
  assert.equal(input.props.value, "old-blog");
  input.props.onChange({ target: { value: "new-blog" } });
  await saveForm();
  assert.equal(calls[0].action, "edit");
  assert.equal(calls[0].details.id, "blog-id");
  assert.equal(calls[0].details.slug, "new-blog");
  assert.deepEqual(routes, ["/admin/blogs/new-blog"]);
});

test("new blog editor sends blank slugs for automatic generation and resets custom slugs after save", async () => {
  const { render, saveForm, calls } = await editorHarness();
  await saveForm();
  assert.equal(calls[0].action, "create");
  assert.equal(calls[0].details.slug, "");
  render().find(node => node.props?.title === "Slug (optional)")
    .props.onChange({ target: { value: "custom-blog" } });
  await saveForm();
  assert.equal(calls[1].details.slug, "custom-blog");
  assert.equal(render().find(node => node.props?.title === "Slug (optional)").props.value, "");
});

test("blog editor displays save errors and allows retrying without losing the slug", async () => {
  const { render, saveForm, routes } = await editorHarness({ id: "id", slug: "taken" }, { fail: true });
  await saveForm();
  const nodes = render();
  assert.match(nodes.find(node => node.props?.role === "alert").props.children, /already in use/);
  assert.equal(nodes.find(node => node.props?.children === "Save").props.disabled, false);
  assert.equal(nodes.find(node => node.props?.title === "Slug (optional)").props.value, "taken");
  assert.equal(routes.length, 0);
});
