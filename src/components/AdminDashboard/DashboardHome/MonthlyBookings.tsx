import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetMonthlyBookingsQuery } from "../../../redux/features/dashboard/dashboard.api";
import { TMonthlyBooking } from "../../../types";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyBookingsChart = () => {
  const { data, isLoading } = useGetMonthlyBookingsQuery(undefined);

  if (isLoading) {
    return (
      <div className="animate-pulse p-4 bg-gray-200 rounded-md h-60 flex justify-center items-center">
        <div className="bg-gray-300 w-3/4 h-8 rounded-md"></div>
      </div>
    );
  }

  const monthlyData: TMonthlyBooking[] = data.data;

  const chartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Bookings",
        data: monthlyData.map((item) => item.totalBookings),
        borderColor: " #ba181b",
        backgroundColor: " #e97374",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Bookings",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-2 rounded-xl shadow-xl">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MonthlyBookingsChart;
