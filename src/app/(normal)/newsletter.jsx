export function SubscribeNewsletter() {
  return (
    <div className="w-full max-w-7xl py-12 mx-auto px-4">
      <div
        className="  rounded-2xl flex items-center justify-center px-4  h-96"
        style={{
          backgroundImage: "url('./newsletter.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className=" -translate-y-12 xl:translate-x-24 flex flex-col items-center">
          <p className=" text-white  text-center font-bold max-w-lg w-full text-3xl md:text-4xl ">
            Subscribe newsletter $ get company news.
          </p>
          <div className=" bg-white py-1 px-1 justify-between w-full max-w-sm flex gap-2 rounded mt-6">
            <input
              type="text"
              placeholder="Enter your email"
              className=" pl-6 outline-none w-[60%]"
            />
            <button className=" bg-[#FF6B35] text-white py-3 px-6 rounded-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
