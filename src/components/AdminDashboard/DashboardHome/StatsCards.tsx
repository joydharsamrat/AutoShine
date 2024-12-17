import { useGetStatsQuery } from "../../../redux/features/dashboard/dashboard.api";
import { TStats } from "../../../types";

const StatsCards = () => {
  const { data, isLoading } = useGetStatsQuery(undefined);
  const stats: TStats = data?.data || {};
  const { totalBookings, totalRevenue, activeServices, upcomingBookings } =
    stats;

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "Total Bookings",
            "Total Revenue",
            "Active Services",
            "Upcoming Bookings",
          ].map((title, index) => (
            <div key={index} className="p-4 bg-white shadow rounded-md">
              <h3 className="text-lg font-semibold text-primary-700">
                {title}
              </h3>
              <p className="text-2xl font-bold text-gray-800">...</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-semibold text-primary-700">
              Total Bookings
            </h3>
            <p className="text-2xl font-bold text-gray-800">{totalBookings}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-semibold text-primary-700">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold text-gray-800">${totalRevenue}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-semibold text-primary-700">
              Active Services
            </h3>
            <p className="text-2xl font-bold text-gray-800">{activeServices}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-semibold text-primary-700">
              Upcoming Bookings
            </h3>
            <p className="text-2xl font-bold text-gray-800">
              {upcomingBookings}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCards;
