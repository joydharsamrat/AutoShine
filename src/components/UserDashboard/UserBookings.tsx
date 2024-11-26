import { useAppSelector } from "../../redux/features/hooks";
import { TBooking } from "../../types";
import UpcomingBookingCard from "./UpcomingBookingCard";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const UserBookings = () => {
  const { pastBookings, upcomingBookings } = useAppSelector(
    (state) => state.bookings
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>
      <TabGroup>
        <TabList className="flex justify-center mb-6">
          <Tab
            className={({ selected }) =>
              `py-2 px-4 text-sm font-semibold rounded-s-lg flex-1 ${
                selected
                  ? "bg-primary-700 text-white"
                  : "bg-gray-200 text-primary-700 hover:bg-slate-100"
              }`
            }
          >
            Upcoming
          </Tab>
          <Tab
            className={({ selected }) =>
              `py-2 px-4 text-sm font-semibold rounded-e-lg flex-1 ${
                selected
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-primary-700 hover:bg-slate-100"
              }`
            }
          >
            Past
          </Tab>
        </TabList>

        <TabPanels>
          {/* Upcoming Bookings Tab */}
          <TabPanel>
            {upcomingBookings.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingBookings.map((booking: TBooking) => (
                  <UpcomingBookingCard key={booking._id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="text-red-500">
                <p>No upcoming bookings.</p>
              </div>
            )}
          </TabPanel>

          {/* Past Bookings Tab */}
          <TabPanel>
            {pastBookings.length ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse mb-4 bg-neutral-200 shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-primary-700 text-white ">
                      <th className="p-3 text-left whitespace-nowrap min-w-[150px]">
                        Service
                      </th>
                      <th className="p-3 text-left whitespace-nowrap min-w-[150px]">
                        Date
                      </th>
                      <th className="p-3 text-left whitespace-nowrap min-w-[150px]">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastBookings.map((booking: TBooking) => (
                      <tr key={booking._id}>
                        <td className="border-b p-3">{booking.service.name}</td>
                        <td className="border-b p-3">{booking.slot.date}</td>
                        <td className="border-b p-3">
                          {booking.slot.startTime}-{booking.slot.endTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-red-500">
                <p>No past bookings.</p>
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default UserBookings;
