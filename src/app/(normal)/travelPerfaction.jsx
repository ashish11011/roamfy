import { cn } from "@/lib/utils";

export function TravelPerfection() {
  const contentSections = [
    {
      title: "Tell us what you want to do",
      description:
        "Share your travel goals — from meetings and conferences to off-site retreats. We’ll tailor the perfect business travel plan to suit your needs.",
    },
    {
      title: "Share your travel preference",
      description:
        "Let us know your preferred airlines, hotel types, budget limits, and travel policies. We align every booking to match your company’s standards.",
    },
    {
      title: "We’ll give you recommendations",
      description:
        "Based on your preferences, we’ll suggest optimized travel options that balance comfort, cost, and convenience — all in real-time.",
    },
  ];

  return (
    <div className=" bg-emerald-50 w-full px-4">
      <div className=" mx-auto max-w-7xl py-20">
        <h3 className=" text-lg text-emerald-600 italic mb-3 font-medium text-center">
          Three steps for a perfect trip
        </h3>
        <h2 className=" text-center text-3xl md:text-4xl font-medium ">
          Find Travel Perfection
        </h2>
        <p className=" text-center mx-auto max-w-3xl mt-4 text-gray-400">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
          nemo nihil et sint dolore earum at quidem, quam placeat incidunt
          consequatur eius recusandae iste i
        </p>

        <div className=" w-full  mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:px-6">
          <TravelPerfectionCard
            title={contentSections[0].title}
            description={contentSections[0].description}
          >
            <div
              className=" w-24 md:w-32 mx-auto  h-24 md:h-32 bg-red-100 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              }}
            >
              <img
                src={`/feature-1.svg`}
                className=" size-12 md:size-16 object-contain"
                alt="Feature Icon"
              />
            </div>
          </TravelPerfectionCard>
          <TravelPerfectionCard
            title={contentSections[1].title}
            description={contentSections[1].description}
          >
            <div
              className=" w-24 md:w-32 mx-auto  h-24 md:h-32 bg-blue-100 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              }}
            >
              <img
                src={`/feature-2.svg`}
                className=" size-12 md:size-16 object-contain"
                alt="Feature Icon"
              />
            </div>
          </TravelPerfectionCard>
          <TravelPerfectionCard
            title={contentSections[2].title}
            description={contentSections[2].description}
            className=" "
          >
            <div
              className=" h-24 w-24 md:w-32 mx-auto md:h-32 bg-emerald-100 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              }}
            >
              <img
                src={`/feature-3.svg`}
                className=" size-16 md:size-20 object-contain"
                alt="Feature Icon"
              />
            </div>
          </TravelPerfectionCard>
        </div>
      </div>
    </div>
  );
}

function TravelPerfectionCard({ children, title, description, className }) {
  return (
    <div
      className={cn(
        " bg-white shadow-md rounded-xl px-2 md:px-6 py-4 md:py-12",
        className
      )}
    >
      {children}
      <h3 className=" mt-4 md:mt-6 text-center text-lg md:text-2xl font-semibold">
        {title}
      </h3>
      <p className=" mt-2 text-sm md:mt-4 text-gray-400  text-center ">
        {description}
      </p>
    </div>
  );
}
