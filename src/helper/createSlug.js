export function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace all non-alphanumeric characters with "-"
    .replace(/^-+|-+$/g, "") // Trim leading/trailing "-"
    .replace(/-+/g, "-"); // Replace multiple "-" with single "-"
}
