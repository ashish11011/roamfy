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
      <body className={` scroll-smooth ${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
