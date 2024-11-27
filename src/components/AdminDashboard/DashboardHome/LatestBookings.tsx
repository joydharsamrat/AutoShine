import { useGetLatestBookingsQuery } from "../../../redux/features/dashboard/dashboard.api";
import { TBooking } from "../../../types";
import Loader from "../../Shared/Loaders/Loader";

const LatestBookings = () => {
  const { data, isLoading } = useGetLatestBookingsQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  const bookings = data?.data || [];

  return (
    <div className="bg-white mt-12 p-4 rounded-xl">
      <h3 className="text-xl font-semibold text-center mb-5">
        Latest Bookings
      </h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-primary-700 text-white text-left">
              <th className="p-3 min-w-[150px] whitespace-nowrap">
                Customer Name
              </th>
              <th className="p-3 min-w-[150px] whitespace-nowrap">Service</th>
              <th className="p-3 min-w-[150px] whitespace-nowrap">Date</th>
              <th className="p-3 min-w-[150px] whitespace-nowrap">Time</th>
              <th className="p-3 min-w-[150px] whitespace-nowrap">Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking: TBooking) => (
              <tr key={booking.customer.email} className="hover:bg-gray-100">
                <td className="p-3 border-b">{booking.customer.name}</td>
                <td className="p-3 border-b">{booking.service.name}</td>
                <td className="p-3 border-b">{booking.slot.date}</td>
                <td className="p-3 border-b">
                  {booking.slot.startTime} - {booking.slot.endTime}
                </td>
                <td className="p-3 border-b">${booking.service.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestBookings;
