import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Nav";
import Footer from "../Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
