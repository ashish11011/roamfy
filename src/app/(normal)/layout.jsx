import { Navbar } from "@/components/NavBar";
import Footer from "@/conponents/Footer";

const layout = ({ children }) => {
  return (
    <div className=" w-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
