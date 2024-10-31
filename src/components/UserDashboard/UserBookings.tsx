import { useAppSelector } from "../../redux/features/hooks";
import { TBooking } from "../../types";
import UpcomingBookingCard from "./UpcomingBookingCard";

const UserBookings = () => {
  const { pastBookings, upcomingBookings } = useAppSelector(
    (state) => state.bookings
  );

  return (
    <div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
        {upcomingBookings.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingBookings?.map((booking: TBooking) => (
              <UpcomingBookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="text-red-500">
            <p>No upcoming bookings.</p>
          </div>
        )}

        <h2 className="text-xl font-bold mt-6">Past Bookings</h2>
        <table className="min-w-full mt-4">
          <thead>
            <tr>
              <th className="border p-2">Service</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {pastBookings?.map((booking: TBooking) => (
              <tr key={booking._id}>
                <td className="border p-2">{booking.service.name}</td>
                <td className="border p-2">{booking.slot.date}</td>
                <td className="border p-2">
                  {booking.slot.startTime}-{booking.slot.endTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBookings;
