import Heading from "@/components/heading";

export function TravelPlan({ itinary }) {
  return (
    <div>
      <span className="site-eyebrow">The journey, day by day</span>
      <Heading>Your itinerary</Heading>
      {itinary.description && (
        <p className="text-sub mt-3">{itinary.description}</p>
      )}
      <div className="mt-4">
        {itinary.itinary?.map((content, index) => (
          <div className="itinerary-day !items-center flex gap-2" key={index}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{content}</h3>
              {/* <p className="whitespace-pre-line">{content}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
