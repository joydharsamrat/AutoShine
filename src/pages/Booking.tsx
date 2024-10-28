/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useCreateBookingMutation } from "../redux/features/booking/booking.api";
import { useGetSlotByIdQuery } from "../redux/features/service/service.api";
import Loader from "../components/Shared/Loaders/Loader";
import { useAppSelector } from "../redux/features/hooks";
import toast from "react-hot-toast";
import { FieldValues } from "react-hook-form";
import Form from "../components/form/Form";
import InputField from "../components/form/InputField";
import BackButton from "../components/Shared/BackButton";

const Booking = () => {
  const { id } = useParams();
  const userId = useAppSelector((state) => state.auth.user?._id);
  const { data: slotData, isLoading } = useGetSlotByIdQuery(id);
  const [bookSlot] = useCreateBookingMutation();

  const handleBooking = async (data: FieldValues) => {
    const loadingToast = toast.loading("Booking...");
    const { userName, userEmail } = data;

    if (isBooked !== "available") {
      toast.error("This slot is not available!");
      return;
    }

    const bookingPayload = {
      serviceId: service._id,
      slotId: _id,
      userName,
      userEmail,
      userId,
    };

    try {
      const res = await bookSlot(bookingPayload).unwrap();
      toast.success("Slot booked successfully", { id: loadingToast });
      console.log(res);
      // window.location.href = "https://your-aamarpay-url.com";
    } catch (error: any) {
      toast.error(
        `${error?.data?.message}` || "Booking failed! Please try again",
        {
          id: loadingToast,
        }
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const { _id, date, startTime, endTime, isBooked, service } = slotData.data;

  return (
    <div className="py-20 bg-gradient-to-tr from-primary-700 to-secondary-700">
      <div className="max-w-7xl mx-auto">
        <div className="px-10">
          <BackButton color={true} />
        </div>
        <h1 className="text-3xl font-bold text-center text-white">
          Book A Slot
        </h1>
        <div className="max-w-4xl mx-auto px-4 py-8 flex">
          {/* Left Side: Selected Service Details */}
          <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <motion.h2
              className="text-2xl font-semibold text-primary-700 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Selected Service
            </motion.h2>
            {service && (
              <div>
                <h3 className="text-lg font-bold text-secondary-700">
                  {service.name}
                </h3>
                <p className="text-neutral-600">{service.description}</p>
                {slotData && (
                  <div className="mt-4">
                    <p className="font-semibold text-primary-600">
                      Selected Time Slot:
                    </p>
                    <p className="text-neutral-700">{`${date}: ${startTime} - ${endTime}`}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side: User Information Form */}
          <div className="w-1/2 p-6 ml-4 bg-white rounded-lg shadow-md">
            <motion.h2
              className="text-2xl font-semibold text-primary-700 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              User Information
            </motion.h2>
            <Form onSubmit={handleBooking}>
              <InputField
                type="text"
                name="userName"
                label="Name"
                rules={{ required: "Name is required" }}
              />
              <InputField
                type="email"
                name="userEmail"
                label="Email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
              />
              <div className="mb-2">
                <label className="block mb-1 text-sm font-semibold ">
                  Time
                </label>
                <input
                  type="text"
                  value={`${startTime}-${endTime}`}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary-700 text-white rounded hover:bg-primary-600 transition duration-300"
              >
                Pay Now
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
