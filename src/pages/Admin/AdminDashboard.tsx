import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Icons for burger and close menu

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col bg-neutral-200">
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

      <div className="flex flex-col md:flex-row items-stretch max-w-7xl w-full mx-auto relative ">
        {/* Sidebar */}
        <div>
          <nav
            className={`absolute md:sticky top-0 bottom-0 md:top-4 left-0 z-40 w-64 bg-white md:shadow-md md:h-fit md:mt-4 md:mb-4 md:rounded-md transform transition-transform duration-300 md:translate-x-0 md:bg-primary-700 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 md:h-full">
              <ul className="space-y-4">
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard"
                    className="block w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-300"
                  >
                    Home
                  </NavLink>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/bookings"
                    className="block w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-300"
                  >
                    Bookings
                  </NavLink>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/services"
                    className="block w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-300"
                  >
                    Service Management
                  </NavLink>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/slots"
                    className="block w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-300"
                  >
                    Slot Management
                  </NavLink>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/users"
                    className="block w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-300"
                  >
                    User Management
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="w-full mx-auto md:min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
