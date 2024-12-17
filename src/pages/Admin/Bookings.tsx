import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useGetAllBookingsQuery } from "../../redux/features/booking/booking.api";
import { TBooking } from "../../types";
import Loader from "../../components/Shared/Loaders/Loader";

const Bookings = () => {
  const { data, isLoading } = useGetAllBookingsQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  const upcomingBookings = data?.upcoming || [];
  const pastBookings = data?.past || [];

  const categories = [
    {
      name: "Upcoming",
      bookings: upcomingBookings,
      emptyMessage: "No upcoming bookings found.",
    },
    {
      name: "Past",
      bookings: pastBookings,
      emptyMessage: "No past bookings found.",
    },
  ];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <TabGroup>
        {/* Tab List */}
        <TabList className="flex mb-8 justify-center">
          {categories.map(({ name }, index) => (
            <Tab
              key={name}
              className={({ selected }) =>
                `py-2 px-4 text-sm font-semibold flex-1 ${
                  index === 0
                    ? "rounded-s-lg"
                    : index === categories.length - 1
                    ? "rounded-e-lg"
                    : ""
                } ${
                  selected
                    ? "bg-primary-500 text-white hover:bg-primary-900"
                    : "bg-white text-primary-700 hover:bg-slate-100"
                }`
              }
            >
              {name}
            </Tab>
          ))}
        </TabList>

        {/* Tab Panels */}
        <TabPanels>
          {categories.map(({ name, bookings, emptyMessage }) => (
            <TabPanel key={name}>
              <section>
                <h3 className="text-2xl font-semibold mb-4 text-primary-700 text-center">
                  {name} Bookings
                </h3>
                {bookings.length === 0 ? (
                  <div className="text-center">
                    <p className="text-lg font-medium text-gray-500">
                      {emptyMessage}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-md">
                      <thead>
                        <tr className="bg-primary-700 text-white">
                          <th className="p-2 text-sm sm:text-base text-left min-w-[150px]">
                            Booking ID
                          </th>
                          <th className="p-2 text-sm sm:text-base text-left min-w-[150px]">
                            Customer Name
                          </th>
                          <th className="p-2 text-sm sm:text-base text-left min-w-[150px]">
                            Service
                          </th>
                          <th className="p-2 text-sm sm:text-base text-left min-w-[150px]">
                            Slot
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking: TBooking) => (
                          <tr key={booking._id}>
                            <td className="border-b p-2 text-sm sm:text-base">
                              {booking._id}
                            </td>
                            <td className="border-b p-2 text-sm sm:text-base">
                              {booking.customer.name}
                            </td>
                            <td className="border-b p-2 text-sm sm:text-base">
                              {booking.service.name}
                            </td>
                            <td className="border-b p-2 text-sm sm:text-base">
                              {booking.slot.date} <br /> (
                              {booking.slot.startTime} - {booking.slot.endTime})
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Bookings;
