import { Geist, Geist_Mono, Inter, Playfair } from "next/font/google";
import "./globals.css";

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
      </body>
    </html>
  );
}
