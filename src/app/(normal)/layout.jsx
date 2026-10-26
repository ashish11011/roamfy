import { Navbar } from "@/components/NavBar";
import Footer from "@/conponents/Footer";

const layout = ({ children }) => {
  return (
    <div className="public-site">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] site-button"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
