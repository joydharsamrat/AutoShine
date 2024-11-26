import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useGetAllBookingsQuery } from "../../redux/features/booking/booking.api";
import BookingCardSkeleton from "../../components/Shared/Loaders/Skeleton/BookingCardSkeleton";
import BookingCard from "../../components/AdminDashboard/bookingCard";
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
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <BookingCardSkeleton key={index} />
                    ))
                  ) : bookings.length === 0 ? (
                    <div className="col-span-full text-center">
                      <p className="text-lg font-medium text-gray-500">
                        {emptyMessage}
                      </p>
                    </div>
                  ) : (
                    bookings.map((booking: TBooking) => (
                      <BookingCard key={booking._id} booking={booking} />
                    ))
                  )}
                </div>
              </section>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Bookings;
