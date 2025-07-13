import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    // <footer className="bg-cover relative bg-center text-white py-10 px-6">
    <div
      className=" w-full h-full relative min-h-96 pt-24 px-4 pb-4"
      style={{
        backgroundImage: "url('/footer-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <img
        src="/footer-top.png"
        className=" z-10 absolute top-0 left-0"
        alt=""
      />
      <div className=" text-white w-full top-20 left-0  !z-50">
        <div className=" w-full pb-6 max-w-7xl mx-auto flex justify-between gap-4 items-center">
          <Link href="/">
            <img
              src="/logo-white.png"
              className="h-12 md:h-16 w-auto"
              alt="logo"
            />
          </Link>
          <div className="flex justify-end gap-3 mt-6 mb-2">
            {[Instagram, Facebook].map((Icon, idx) => (
              <div
                key={idx}
                className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full border border-white text-sm hover:bg-white hover:text-black transition"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-6 md:gap-8 pb-10">
          <div className=" md:text-lg">
            <h3 className="font-semibold mb-3 md:mb-6 text-2xl">Address</h3>
            <p>123 Main Street</p>
            <p>New York, NY 10001</p>
          </div>

          <div className=" md:text-lg">
            <h3 className="font-semibold mb-3 md:mb-6 text-2xl">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/trip" className="hover:underline">
                  trip page
                </Link>
              </li>
              <li>
                <Link href="/add-review" className="hover:underline">
                  Add Review
                </Link>
              </li>
            </ul>
          </div>

          <div className=" md:text-lg">
            <Link href={"/contact-us"} className="font-semibold  text-2xl">
              Contact Us
            </Link>

            <p className=" mt-3 md:mt-6">+1 500 321 852 789</p>
            <p>+1 500 321 852 789</p>
          </div>

          <div className=" md:text-lg">
            <h3 className="font-semibold mb-3 md:mb-6 text-2xl">
              Utility Pages
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blogs
                </Link>
              </li>

              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:underline">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4 text-sm border-t border-gray-400 pt-4">
          Copyright © Roam Fy Planners
        </div>
      </div>
    </div>
  );
};

export default Footer;
