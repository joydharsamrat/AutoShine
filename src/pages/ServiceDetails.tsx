import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "animate.css";
import { useGetServiceByIdQuery } from "../redux/features/service/service.api";
import { formatDate } from "../utils/fomatDate";
import { TSlot } from "../types";
import BackButton from "../components/Shared/BackButton";
import { useGetSlotsForServiceQuery } from "../redux/features/slot/slot.api";
import Loader from "../components/Shared/Loaders/Loader";
import ConfirmBookingModal from "../components/Service/ConfirmBookingModal";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TSlot | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { data: serviceData, isLoading: serviceLoading } =
    useGetServiceByIdQuery(id);
  const { data: slotsData, isLoading: slotsLoading } =
    useGetSlotsForServiceQuery({
      serviceId: id,
      date: formatDate(selectedDate),
    });

  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate]);

  if (serviceLoading || slotsLoading) {
    return <Loader />;
  }

  if (!serviceData.data) {
    return (
      <div className="text-center text-red-500 animate__animated animate__fadeIn">
        Service not found!
      </div>
    );
  }

  const sortedSlots = slotsData?.data
    ? slotsData.data
        .slice()
        .sort((a: TSlot, b: TSlot) => a.startTime.localeCompare(b.startTime))
    : [];

  const { name, description, price, duration } = serviceData.data;

  const handleSlotClick = (slot: TSlot) => {
    if (selectedSlot?._id === slot._id) {
      setSelectedSlot(null);
      setIsOpen(false);
    } else if (slot.isBooked === "available") {
      setSelectedSlot(slot);
      setIsOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-10 py-5">
        <BackButton />
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8 animate__animated animate__fadeIn">
        <motion.h1
          className="text-3xl font-bold text-primary-700 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {name}
        </motion.h1>
        <motion.div
          className="bg-neutral-200 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-neutral-700 mb-4">{description}</p>
          <p className="text-xl font-bold text-primary-700 mb-2">
            Price: ${price}
          </p>
          <p className="text-sm text-neutral-500">
            Duration: {duration} minutes
          </p>
        </motion.div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-primary-700 mb-4">
            Select a Date
          </h2>
          <Calendar
            minDate={new Date()}
            value={selectedDate}
            onChange={(value) => {
              if (value instanceof Date) {
                setSelectedDate(value);
              }
            }}
            className="bg-neutral-100 p-4 rounded-lg shadow-md"
          />
          ;
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-primary-700 mb-4">
            Time Slots
          </h2>
          {sortedSlots && sortedSlots.length === 0 ? (
            <p className="text-red-500">No slots available for this date.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedSlots?.map((slot: TSlot) => (
                <motion.button
                  key={slot._id}
                  className={`p-2 rounded-md ${
                    slot.isBooked === "booked"
                      ? "bg-neutral-300 "
                      : selectedSlot?._id === slot._id
                      ? "bg-primary-700 text-white"
                      : "bg-primary-100 hover:bg-primary-700 hover:text-white"
                  } transition duration-300`}
                  onClick={() => handleSlotClick(slot)}
                  disabled={slot.isBooked === "booked"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * Math.random() }}
                >
                  {`${slot.startTime} - ${slot.endTime} `}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {selectedSlot && isOpen && (
          <ConfirmBookingModal
            isOpen={isOpen}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            setIsOpen={setIsOpen}
            setSelectedSlot={setSelectedSlot}
          />
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
