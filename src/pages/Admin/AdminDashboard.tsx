import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Icons for burger and close menu

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-200">
      {/* Header */}
      <header className="p-4 bg-primary-700 text-white flex justify-between md:justify-center items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        {/* Burger Icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>
      </header>

      <div className="flex flex-col md:flex-row items-stretch">
        {/* Sidebar */}
        <nav
          className={`fixed md:static top-32 md:top-0 left-0 z-40 w-64 bg-white shadow-md md:shadow-none h-full transform transition-transform duration-300  md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 md:pl-4 md:pr-0 md:min-h-screen">
            <ul className="space-y-4">
              <li onClick={toggleSidebar}>
                <NavLink
                  to="/admin/dashboard/bookings"
                  className={({ isActive }) =>
                    `block w-full text-left p-2 rounded-lg md:rounded-l-lg md:rounded-r-none ${
                      isActive
                        ? "bg-neutral-200 text-primary-700 font-bold"
                        : "hover:bg-gray-200"
                    }`
                  }
                >
                  Bookings
                </NavLink>
              </li>
              <li onClick={toggleSidebar}>
                <NavLink
                  to="/admin/dashboard/services"
                  className={({ isActive }) =>
                    `block w-full text-left p-2 rounded-lg md:rounded-l-lg md:rounded-r-none ${
                      isActive
                        ? "bg-neutral-200 text-primary-700 font-bold"
                        : "hover:bg-gray-200"
                    }`
                  }
                >
                  Service Management
                </NavLink>
              </li>
              <li onClick={toggleSidebar}>
                <NavLink
                  to="/admin/dashboard/slots"
                  className={({ isActive }) =>
                    `block w-full text-left p-2 rounded-lg md:rounded-l-lg md:rounded-r-none ${
                      isActive
                        ? "bg-neutral-200 text-primary-700 font-bold"
                        : "hover:bg-gray-200"
                    }`
                  }
                >
                  Slot Management
                </NavLink>
              </li>
              <li onClick={toggleSidebar}>
                <NavLink
                  to="/admin/dashboard/users"
                  className={({ isActive }) =>
                    `block w-full text-left p-2 rounded-lg md:rounded-l-lg md:rounded-r-none ${
                      isActive
                        ? "bg-neutral-200 text-primary-700 font-bold"
                        : "hover:bg-gray-200"
                    }`
                  }
                >
                  User Management
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="w-full md:w-3/4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
