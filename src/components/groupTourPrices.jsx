import { formatPrice, getSharingOptions } from "@/helper/groupTourPricing";

export function GroupTourPrices({ sharingPrices, compact = false }) {
  const options = getSharingOptions(sharingPrices);
  if (!options.length) return null;

  return (
    <div className={compact ? "mt-3" : "w-full"}>
      {!compact && <h2 className="text-2xl font-semibold mb-2 text-gray-700">Sharing prices</h2>}
      <p className={compact ? "text-sm text-white/90 mb-2" : "text-sm text-gray-600 mb-3"}>
        Price per person
      </p>
      <dl className={compact ? "space-y-1" : "flex flex-wrap gap-3"}>
        {options.map(({ key, label, price }) => (
          <div
            key={key}
            className={compact
              ? "flex justify-between items-center gap-3 text-sm"
              : "rounded-lg border border-green-200 bg-green-50 px-4 py-3"}
          >
            <dt className={compact ? "text-white/90" : "text-gray-600 text-sm"}>{label}</dt>
            <dd className={compact ? "font-semibold" : "text-xl font-semibold text-primary mt-1"}>
              {formatPrice(price)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
