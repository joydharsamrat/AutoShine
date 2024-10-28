import { useState } from "react";
import ServiceManagement from "../components/AdminDashboard/ServiceManagement";
import SlotManagement from "../components/AdminDashboard/SlotManagement";
import UserManagement from "../components/AdminDashboard/UserManagement";
import Bookings from "../components/AdminDashboard/Bookings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return <Bookings />;
      case "services":
        return <ServiceManagement />;
      case "slots":
        return <SlotManagement />;
      case "users":
        return <UserManagement />;
      default:
        return <Bookings />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="p-4 bg-primary-700 text-white text-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>

      <div className="flex flex-col md:flex-row">
        <nav className="w-full md:w-1/4 bg-white shadow-md p-4 sm:min-h-screen">
          <ul className="space-y-4">
            <li>
              <button
                className={`w-full text-left p-2 rounded-lg ${
                  activeTab === "bookings"
                    ? "bg-primary-700 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("bookings")}
              >
                Bookings
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded-lg ${
                  activeTab === "services"
                    ? "bg-primary-700 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("services")}
              >
                Service Management
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded-lg ${
                  activeTab === "slots"
                    ? "bg-primary-700 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("slots")}
              >
                Slot Management
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded-lg ${
                  activeTab === "users"
                    ? "bg-primary-700 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("users")}
              >
                User Management
              </button>
            </li>
          </ul>
        </nav>

        {/* Content */}
        <main className="w-full md:w-3/4 p-4">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
