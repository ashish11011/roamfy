import Heading from "@/components/heading";
import { cn } from "@/lib/utils";

export function TravelPlan({ itinary }) {
  return (
    <div className=" space-y-3">
      <Heading>Itinerary</Heading>
      <p className=" text-gray-600">{itinary.description}</p>
      <div className=" space-y-2 pt-4">
        {itinary.itinary.map((item, idx) => {
          const isLast = idx === itinary.itinary.length - 1;
          return (
            <TripCard
              isLast={isLast}
              key={idx}
              item={{ day: idx + 1, content: item }}
            />
          );
        })}
      </div>
    </div>
  );
}

function TripCard({ item, isLast }) {
  return (
    <div className="flex gap-6  ">
      <div className="flex flex-col items-center shrink-0 w-10 min-h-full ">
        <div className="rounded-full bg-neutral-600 font-semibold text-white flex items-center justify-center aspect-square w-8">
          {item.day}
        </div>

        {!isLast && (
          <div className="flex-1 border-l-[2px] border-dashed border-neutral-600 mt-1"></div>
        )}
      </div>
      <p className={cn("text-gray-600 text-sm pb-6", isLast && "pb-0")}>
        {item.content}
      </p>
    </div>
  );
}
