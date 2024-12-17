import LatestBookings from "../../components/AdminDashboard/DashboardHome/LatestBookings";
import MonthlyBookingsChart from "../../components/AdminDashboard/DashboardHome/MonthlyBookings";
import MonthlyRevenueChart from "../../components/AdminDashboard/DashboardHome/MonthlyRevenue";
import StatsCards from "../../components/AdminDashboard/DashboardHome/StatsCards";

const DashboardHome = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Cards Section */}
      <StatsCards />
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <MonthlyRevenueChart />
        <MonthlyBookingsChart />
      </div>

      {/* Latest Bookings Table */}
      <LatestBookings />
    </div>
  );
};

export default DashboardHome;
