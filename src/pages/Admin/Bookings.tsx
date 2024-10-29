import { useEffect } from "react";
import { useGetAllBookingsQuery } from "../../redux/features/booking/booking.api";
import BookingCardSkeleton from "../../components/Shared/Loaders/Skeleton/BookingCardSkeleton";
import BookingCard from "../../components/AdminDashboard/bookingCard";
import { TBooking } from "../../types";

const Bookings = () => {
  const { data, isLoading } = useGetAllBookingsQuery(undefined);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Bookings</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <BookingCardSkeleton key={index} />
          ))
        ) : !data?.data?.length ? (
          <div>
            <p className="text-3xl font-semibold text-secondary-500">
              No bookings Found
            </p>
          </div>
        ) : (
          data.data.map((booking: TBooking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;
