import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Nav";
import Footer from "../Shared/Footer";
import ScrollToTopButton from "../Shared/ScrollToTopButton";
import { useGetMyBookingsQuery } from "../../redux/features/booking/booking.api";
import { useEffect } from "react";
import { TBooking } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { setBookings } from "../../redux/features/booking/bookingSlice";
import { getToken } from "../../redux/features/auth/authSlice";

const MainLayout = () => {
  const token = useAppSelector(getToken);
  const { data: bookings, isLoading } = useGetMyBookingsQuery(undefined, {
    skip: !token,
  });
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top on location change
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const now = new Date();
    const upcoming: TBooking[] = [];
    const past: TBooking[] = [];
    if (!isLoading && bookings?.data?.length) {
      bookings.data?.forEach((booking: TBooking) => {
        const bookingDateTime = new Date(
          `${booking.slot.date}T${booking.slot.startTime}`
        );

        if (bookingDateTime > now) {
          upcoming.push(booking);
        } else {
          past.push(booking);
        }
      });

      upcoming.sort((a, b) => {
        const dateTimeA = new Date(`${a.slot.date}T${a.slot.startTime}`);
        const dateTimeB = new Date(`${b.slot.date}T${b.slot.startTime}`);
        return dateTimeA.getTime() - dateTimeB.getTime();
      });

      dispatch(setBookings({ upcomingBookings: upcoming, pastBookings: past }));
    }
  }, [bookings, dispatch, isLoading]);

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
