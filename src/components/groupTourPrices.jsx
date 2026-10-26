import { formatPrice, getSharingOptions } from "@/helper/groupTourPricing";

export function GroupTourPrices({ sharingPrices, compact = false }) {
  const options = getSharingOptions(sharingPrices);
  if (!options.length) return null;
  return (
    <div
      className={`sharing-prices ${compact ? "sharing-prices-compact" : ""}`}
    >
      {!compact && (
        <h2 className="text-xl font-medium mb-2 tracking-tight">
          Choose your sharing option
        </h2>
      )}
      <p>Price per person</p>
      <dl>
        {options.map(({ key, label, price }) => (
          <div key={key} className="sharing-price-option">
            <dt>{label}</dt>
            <dd>{formatPrice(price)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
