import Image from "next/image";

const galleryImages = [
  "https://ik.imagekit.io/roamfy/about-us/about-us-1_XCzYGM9El.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.51123_h6fa2eL0O.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.44_ODB7QewZn.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.25_Iev4yL247-.jpeg",

  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.264_0nfL77XBT.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.252_ZM82lMjLzm.jpeg",

  "https://ik.imagekit.io/roamfy/about-us/IMG_7455.jpg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-31%20at%2021.39.15.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-31%20at%2021.38.13.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-31%20at%2021.33.40.jpeg",
];

export default function TravellerGallery() {
  return (
    <section className="w-full px-4 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Memories from Our Journeys
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Glimpse into the unforgettable moments we've curated across college
            tours, corporate retreats, school excursions, and romantic getaways.
            Every photo tells a story of seamless planning and joyful travel.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3  gap-4">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className="relative w-full h-72 overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt={`Traveller experience ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
