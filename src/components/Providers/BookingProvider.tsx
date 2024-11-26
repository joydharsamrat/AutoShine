import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { getCurrentUser, getToken } from "../../redux/features/auth/authSlice";
import { useGetMyBookingsQuery } from "../../redux/features/booking/booking.api";
import { useLocation } from "react-router-dom";
import { setBookings } from "../../redux/features/booking/bookingSlice";

const BookingProvider = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(getToken);
  const user = useAppSelector(getCurrentUser);
  const { data: bookings, isLoading } = useGetMyBookingsQuery(undefined, {
    skip: !token || user?.role === "admin",
  });
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top on location change
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (bookings) {
      dispatch(
        setBookings({
          upcomingBookings: bookings.upcoming,
          pastBookings: bookings.past,
        })
      );
    }
  }, [bookings, dispatch, isLoading]);

  return <div>{children}</div>;
};

export default BookingProvider;
