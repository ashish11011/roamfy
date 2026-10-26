function normalizeSlug(value) {
  return value.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function resolveSlug({ title, slug, currentSlug, isTaken }) {
  // Preserve existing URLs, including older slug formats, unless edited.
  if (currentSlug && (slug === undefined || slug === currentSlug)) {
    return currentSlug;
  }
  if (slug != null && typeof slug !== "string") {
    throw new Error("Enter a valid slug.");
  }
  const custom = Boolean(slug?.trim());
  const base = normalizeSlug(custom ? slug : title || "");
  if (!base) {
    throw new Error("Use letters or numbers in the slug or title.");
  }
  if (custom) {
    if (await isTaken(base)) {
      throw new Error("This slug is already in use. Choose another slug.");
    }
    return base;
  }
  let candidate = base;
  let suffix = 2;
  while (await isTaken(candidate)) {
    candidate = `${base}-${suffix++}`;
  }
  return candidate;
}
