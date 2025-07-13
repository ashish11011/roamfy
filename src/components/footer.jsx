import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-50 pt-12 pb-8 text-green-900">
      {/* Logo and social */}
      <div className="flex flex-col items-center mb-8 space-y-4">
        <img src="/your-logo.png" alt="Capture A Trip" className="h-14 w-14" />
        <div className="flex space-x-4 text-xl">
          <Twitter className="hover:text-green-700 cursor-pointer" />
          <Facebook className="hover:text-green-700 cursor-pointer" />
          <Instagram className="hover:text-green-700 cursor-pointer" />
          <Linkedin className="hover:text-green-700 cursor-pointer" />
          {/* <Whatsapp className="hover:text-green-700 cursor-pointer" /> */}
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 text-sm">
        {/* About */}
        <div>
          <h3 className="font-semibold mb-4">About Us</h3>
          <p className="text-justify leading-relaxed">
            Step into a world of adventure with Capture A Trip, where every
            journey is an opportunity to connect, explore, and discover. For
            over 6 years, we&apos;ve been curating unforgettable travel
            experiences that bring people together and fulfill their
            wanderlust...
          </p>
          <a
            href="/about"
            className="text-green-700 underline mt-2 inline-block"
          >
            View More
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/blogs" className="hover:underline">
                Blogs
              </a>
            </li>
            <li>
              <a href="/disclaimer" className="hover:underline">
                Disclaimer
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/cancellation-policy" className="hover:underline">
                Cancellation Policy
              </a>
            </li>
            <li>
              <a href="/terms-conditions" className="hover:underline">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/linktree" className="hover:underline">
                Linktree
              </a>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-semibold mb-4">Address</h3>
          <div className="space-y-4 text-sm">
            <div>
              <strong>Capture a Trip India Pvt Ltd – Delhi</strong>
              <br />
              1473-G NN-1/9619, Bramh Gali, West Rohtash Nagar, Shahdara, New
              Delhi - 110032
              <br />
              Mobile: +91-8287636079 / 8076760552
            </div>

            <div>
              <strong>Capture a Trip India Pvt Ltd – Faridabad</strong>
              <br />
              Office No 304, 3rd floor, SRS Tower, Sector-31, Near Mewla
              Maharajpur Metro Station, Faridabad, Haryana 121003, India
              <br />
              Mobile: +91-8287636079
            </div>

            <div>
              <strong>Capture a Trip India Pvt Ltd – Gurgaon</strong>
              <br />
              Plot no-376, Udyog Vihar Phase 2, Opposite WeWork, Gurgaon,
              Haryana 122016, India
              <br />
              Mobile: +91-8287636079
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
