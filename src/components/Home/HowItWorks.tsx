import { FaRegCalendarAlt, FaRegCreditCard } from "react-icons/fa";
import { BiSolidCarWash } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <div className="mt-20 max-w-7xl mx-auto px-5">
      <h2 className="text-center text-3xl font-bold text-primary-700">
        How It Works
      </h2>
      <p className="text-center text-lg my-5 text-neutral-700">
        Follow these simple steps to book and enjoy your car washing service.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center gap-12">
        {/* Step 1: Book a Service */}
        <div className="bg-neutral-200 p-5 rounded-lg shadow-lg">
          <div className="flex items-center justify-center gap-4">
            <p className="text-5xl text-secondary-500">
              <FaRegCalendarAlt />
            </p>
            <h3 className="text-2xl font-bold text-primary-700">
              Book a Service
            </h3>
          </div>
          <p className="mt-4 text-neutral-600">
            Choose your preferred service and slot to schedule your car washing
            service.
          </p>
        </div>

        {/* Step 2: Make a Payment */}
        <div className="bg-neutral-200 p-5 rounded-lg shadow-lg">
          <div className="flex items-center justify-center gap-4">
            <p className="text-5xl text-secondary-500">
              <FaRegCreditCard />
            </p>
            <h3 className="text-2xl font-bold text-primary-700">
              Make a Payment
            </h3>
          </div>
          <p className="mt-4 text-neutral-600">
            Pay securely online using a card or mobile banking as per your
            convenience.
          </p>
        </div>

        {/* Step 3: Get Your Car Cleaned */}
        <div className="bg-neutral-200 p-5 rounded-lg shadow-lg">
          <div className="flex items-center justify-center gap-4">
            <p className="text-5xl text-secondary-500">
              <BiSolidCarWash />
            </p>
            <h3 className="text-2xl font-bold text-primary-700">
              Enjoy the Service
            </h3>
          </div>
          <p className="mt-4 text-neutral-600">
            Bring your vehicle at booked slot and relax while our team gives
            your car the shine it deserves!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
