export const SHARING_OPTIONS = [
  { key: "2", label: "2-sharing" },
  { key: "3", label: "3-sharing" },
  { key: "4", label: "4-sharing" },
];

function isValidPrice(value) {
  if (typeof value !== "string" && typeof value !== "number") return false;
  const amount = String(value).trim();
  return /^\d+(?:\.\d{1,2})?$/.test(amount)
    && Number(amount) > 0
    && Number(amount) <= Number.MAX_SAFE_INTEGER / 100;
}

export function normalizeTripPricing({ isGroupTour = false, price = "", sharingPrices = {} }) {
  if (typeof isGroupTour !== "boolean") {
    throw new Error("Choose a valid package type.");
  }
  if (!isGroupTour) {
    return { isGroupTour: false, price: String(price ?? ""), sharingPrices: {} };
  }
  if (!sharingPrices || typeof sharingPrices !== "object" || Array.isArray(sharingPrices)) {
    throw new Error("Choose at least one sharing option and enter its price.");
  }
  const keys = Object.keys(sharingPrices);
  if (!keys.length || keys.some(key => !SHARING_OPTIONS.some(option => option.key === key))) {
    throw new Error("Choose from 2-sharing, 3-sharing, or 4-sharing.");
  }
  const normalizedPrices = {};
  for (const { key, label } of SHARING_OPTIONS) {
    if (!Object.hasOwn(sharingPrices, key)) continue;
    if (!isValidPrice(sharingPrices[key])) {
      throw new Error(`Enter a positive price with up to two decimal places for ${label}.`);
    }
    normalizedPrices[key] = Number(sharingPrices[key]).toFixed(2);
  }
  return { isGroupTour: true, price: null, sharingPrices: normalizedPrices };
}

export function getSharingOptions(sharingPrices) {
  return SHARING_OPTIONS
    .filter(({ key }) => isValidPrice(sharingPrices?.[key]))
    .map(option => ({ ...option, price: sharingPrices[option.key] }));
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 2,
  }).format(Number(price));
}
