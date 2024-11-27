import LatestBookings from "../../components/AdminDashboard/DashboardHome/LatestBookings";
import MonthlyBookingsChart from "../../components/AdminDashboard/DashboardHome/MonthlyBookings";
import MonthlyRevenueChart from "../../components/AdminDashboard/DashboardHome/MonthlyRevenue";

const DashboardHome = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <MonthlyRevenueChart />
        <MonthlyBookingsChart />
      </div>
      <LatestBookings />
    </div>
  );
};

export default DashboardHome;
