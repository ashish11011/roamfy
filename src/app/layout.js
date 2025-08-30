import { Geist, Geist_Mono, Inter, Playfair } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Roam Fy",
  description: "Find your Perfect Adventure",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* google search console for www.rishabbatra@gmail.com */}
        <meta
          name="google-site-verification"
          content="xV0cksNtd80df7kxg1RIRkz0k6lqVtxYEI4HVKA6xfU"
        />
      </head>
      <body className={` scroll-smooth ${inter.className} antialiased`}>
        {children}
        <Link
          target="_blank"
          href={"https://api.whatsapp.com/send?phone=918239002370"}
        >
          <div className=" bg-gray-200 hover:scale-125 duration-200 cursor-pointer rounded-full fixed bottom-12 right-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
              <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
            </svg>
          </div>
        </Link>
      </body>
    </html>
  );
}
