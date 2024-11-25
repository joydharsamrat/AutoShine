/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FieldValues } from "react-hook-form";
import { useGetSlotByIdQuery } from "../../redux/features/slot/slot.api";
import {
  useCreateBookingMutation,
  useInitiatePaymentMutation,
} from "../../redux/features/booking/booking.api";
import Loader from "../../components/Shared/Loaders/Loader";
import BackButton from "../../components/Shared/BackButton";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";

const Booking = () => {
  const { id } = useParams();
  const { data: slotData, isLoading } = useGetSlotByIdQuery(id);
  const [bookSlot] = useCreateBookingMutation();
  const [initiatePayment] = useInitiatePaymentMutation();

  const handleBooking = async (data: FieldValues) => {
    const loadingToast = toast.loading("Booking...");
    const { userName, userEmail, userPhone } = data;

    if (isBooked !== "available") {
      toast.error("This slot is not available!");
      return;
    }

    const bookingPayload = {
      serviceId: service._id,
      slotId: _id,
    };

    const paymentData = {
      amount: service.price,
      tran_id: `${_id}${Math.random()}`,
      cus_name: userName,
      cus_email: userEmail,
      cus_phone: userPhone,
    };
    console.log(paymentData);
    try {
      await bookSlot(bookingPayload).unwrap();

      const res = await initiatePayment(paymentData).unwrap();

      if (res.data.result === "true") {
        window.location.href = res.data.payment_url;
      }
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
              className="text-2xl font-semibold text-primary-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Selected Service
            </motion.h2>
            <hr className="my-2" />
            {service && (
              <div>
                <h3 className="text-xl font-bold text-secondary-700">
                  {service.name}
                </h3>
                <p className="text-neutral-600">{service.description}</p>
                <p className="  font-semibold">Price: ${service.price}</p>
                {slotData && (
                  <div className="mt-4">
                    <p className="font-semibold text-primary-600 text-secondary-700">
                      Selected Time Slot:
                    </p>
                    <p className="text-neutral-700 text-sm">
                      Date: {`${date}`}
                    </p>
                    <p className="text-neutral-700 text-sm">
                      Time: {`${startTime} - ${endTime}`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side: User Information Form */}
          <div className="w-1/2 p-6 ml-4 bg-white rounded-lg shadow-md">
            <motion.h2
              className="text-2xl font-semibold text-primary-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              User Information
            </motion.h2>
            <hr className="my-2" />
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
              <InputField
                type="tel"
                name="userPhone"
                label="Phone Number"
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{11}$/,
                    message: "Invalid phone number. It should be 11 digits.",
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
