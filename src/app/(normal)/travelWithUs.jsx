export function TravelWithUs() {
  const data = [
    {
      icon: "./plane.svg",
      title: "500+ Destinations",
      desc: "Etiam porta sem malesuada magna",
    },
    {
      icon: "./clock-1.svg",
      title: "Best Price Guarantee",
      desc: "Etiam porta sem malesuada magna",
    },
    {
      icon: "./tree.svg",
      title: "Top Notch Support",
      desc: "Etiam porta sem malesuada magna",
    },
  ];

  return (
    <div className=" bg-[#FD4C5C] text-white px-6 pt-12 pb-16 md:px-8 ">
      <div className=" w-full mx-auto max-w-7xl flex flex-col gap-6">
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-4 mt-4">
          {data.map((item) => {
            return <TravelCard key={item.title} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
}

function TravelCard({ icon, title, desc }) {
  return (
    <div className=" flex items-center md:justify-center gap-4 w-full">
      <img src={icon} />
      <div className=" flex flex-col gap-1">
        <p className=" text-xl font-medium">{title}</p>
        <p className=" text-gray-200">{desc}</p>
      </div>
    </div>
  );
}
