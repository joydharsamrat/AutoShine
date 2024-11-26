import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Nav";
import Footer from "../Shared/Footer";
import ScrollToTopButton from "../Shared/ScrollToTopButton";
import BookingProvider from "../Providers/BookingProvider";

const MainLayout = () => {
  return (
    <BookingProvider>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </BookingProvider>
  );
};

export default MainLayout;
