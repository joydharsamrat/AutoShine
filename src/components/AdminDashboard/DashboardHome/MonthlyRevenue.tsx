import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetMonthlyRevenueQuery } from "../../../redux/features/dashboard/dashboard.api";
import { TMonthlyRevenue } from "../../../types";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyRevenueChart = () => {
  const { data, isLoading } = useGetMonthlyRevenueQuery(undefined);

  if (isLoading) {
    return (
      <div className="animate-pulse p-4 bg-gray-200 rounded-md h-60 flex justify-center items-center">
        <div className="bg-gray-300 w-3/4 h-8 rounded-md"></div>
      </div>
    );
  }

  const monthlyData: TMonthlyRevenue[] = data.data;

  // Prepare the data for the chart
  const chartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Revenue ($)",
        data: monthlyData.map((item) => item.totalRevenue),
        backgroundColor: "#4f8aad",
        borderColor: "#184e77",
        borderWidth: 1,
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
        text: "Monthly Revenue",
      },
    },
  };

  return (
    <div className="bg-white p-2 rounded-xl shadow-xl">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default MonthlyRevenueChart;
