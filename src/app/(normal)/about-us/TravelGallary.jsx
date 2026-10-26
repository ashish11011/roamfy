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
    <section className="site-section bg-cream">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <span className="site-eyebrow">The moments in between</span>
            <h2 className="site-title">This is what memories look like.</h2>
            <p>
              A glimpse of our journeys, the people we meet, and the stories we
              bring home.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((src, index) => (
            <div
              className={`relative overflow-hidden rounded-[24px] ${index % 3 === 1 ? "h-56 md:h-96" : "h-56 md:h-80"}`}
              key={src}
            >
              <Image
                src={src}
                alt={`A memory from a Roamify trip, photo ${index + 1}`}
                fill
                // sizes="(max-width: 767px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
