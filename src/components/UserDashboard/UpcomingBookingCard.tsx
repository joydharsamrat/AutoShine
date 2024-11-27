// UpcomingBookingCard.tsx
import { TBooking } from "../../types";
import { CountdownTimer } from "./CountdownTimer";

const UpcomingBookingCard = ({ booking }: { booking: TBooking }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {/* Countdown Timer */}
      <div className="text-center mb-2 bg-primary-700 p-2 rounded-md shadow-inner">
        <CountdownTimer
          targetDate={booking.slot.date}
          targetTime={booking.slot.startTime}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">
        {booking.service.name}
      </h3>
      <p className="text-gray-600 text-center text-sm">
        {booking.service.description}
      </p>

      <div className="mt-3 text-xs text-gray-700 flex gap-2 items-center justify-between">
        <p>
          <span>Date:</span> {booking.slot.date}
        </p>
        <p>
          <span>Time:</span> {booking.slot.startTime} - {booking.slot.endTime}
        </p>
      </div>
    </div>
  );
};

export default UpcomingBookingCard;
