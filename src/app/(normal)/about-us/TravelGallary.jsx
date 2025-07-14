import Image from "next/image";

const galleryImages = [
  "https://ik.imagekit.io/roamfy/about-us/about-us-1_XCzYGM9El.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.5011_3V-k2Fzua.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.51123_h6fa2eL0O.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.50_rLSTRW-TH.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.52121_Kew3zVGS8d.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.51121_52UZj0Arw.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.52112_fPKACxe15.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-071-14%20at%2008.25.52112_3LV2pGisg.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.531111_YGLX-BtrNs.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.51112_pNSQn3Xgv.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.501111_mJH1H_G5k.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.49111_WnsFdXYcG.jpeg",
  //   "https://ik.imagekit.io/roamfy/about-us/about-us-2_gV3b140vZV.png",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.44_ODB7QewZn.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.25_Iev4yL247-.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.4612_zfuJpkjpN0.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.4711_Wf-4MzgVoE.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.264_0nfL77XBT.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.252_ZM82lMjLzm.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.450_RnM2NOTmB.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.45_V3JTkMpXeW.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.49_p5tQW3eORy.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.49123_t4Q7qbxQKH.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.4811_3bL2R31P7r.jpeg",
  "https://ik.imagekit.io/roamfy/about-us/WhatsApp%20Image%202025-07-14%20at%2008.25.47_3kAp61Vxd.jpeg",
];

export default function TravellerGallery() {
  return (
    <section className="w-full px-4 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Real Moments from Our Travellers
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover the joy, excitement, and unforgettable memories created by
            those who explored the world with us. Here's a glimpse into their
            adventures!
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className="relative w-full h-60 overflow-hidden rounded-xl"
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
