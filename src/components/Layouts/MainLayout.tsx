import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Nav";
import Footer from "../Shared/Footer";
import ScrollToTopButton from "../Shared/ScrollToTopButton";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
