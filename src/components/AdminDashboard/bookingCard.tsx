import { TBooking } from "../../types";

const BookingCard = ({ booking }: { booking: TBooking }) => {
  return (
    <div
      key={booking._id}
      className="bg-white p-6 rounded-lg shadow-lg border border-neutral-200 transform  transition-transform duration-300 ease-in-out"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-primary-700">
          {booking.service.name}
        </h3>
      </div>

      <div className="bg-neutral-50 text-neutral-700 p-4 rounded-md shadow-inner mb-4 ">
        <p className="text-sm mb-2">
          <strong>Date:</strong> {booking.slot.date}
        </p>
        <p className="text-sm ">
          <strong>Time:</strong>{" "}
          {`${booking.slot.startTime} - ${booking.slot.endTime}`}
        </p>
      </div>

      <div className="bg-neutral-50 text-neutral-700 p-4 rounded-md shadow-inner">
        <p className="text-sm  mb-2">
          <strong>Customer:</strong> {booking.customer.name}
        </p>
        <p className="text-sm ">
          <strong>Email:</strong> {booking.customer.email}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
