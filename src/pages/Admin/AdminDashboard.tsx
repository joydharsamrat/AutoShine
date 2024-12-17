import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineSchedule,
  AiOutlineMail,
  AiOutlineTool,
} from "react-icons/ai"; // Icons for menu options
import { MdOutlineDashboard } from "react-icons/md";
import { useAppDispatch } from "../../redux/features/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col bg-neutral-200">
      {/* Header */}
      <header className="p-4 bg-primary-700 text-white ">
        <div className="flex justify-between  items-center max-w-7xl mx-auto">
          <NavLink to="/" className="flex-shrink-0 flex  items-end">
            <img
              src="/logo.png"
              className="h-7 w-7 sm:h-10 sm:w-10 mr-2"
              alt="Logo"
            />
            <h1 className="logo sm:text-3xl">AutoShine</h1>
          </NavLink>
          <h1 className="hidden md:block text-2xl font-bold">
            Admin Dashboard
          </h1>
          {/* Burger Icon */}

          <button onClick={() => dispatch(logout())} className="btn-secondary">
            Logout
          </button>

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
        </div>
      </header>

      <div className="flex flex-col md:flex-row items-stretch max-w-7xl w-full mx-auto relative ">
        {/* Sidebar */}
        <div>
          <nav
            className={`absolute md:sticky top-0 bottom-0 md:top-4 left-0 z-40 w-64 bg-white md:shadow-md md:h-fit md:mt-4 md:mb-4 md:rounded-md transform transition-transform duration-300 md:translate-x-0 md:bg-primary-700 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 md:h-full text-sm">
              <ul className="space-y-4">
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard"
                    className="flex items-center w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-300"
                  >
                    <MdOutlineDashboard className="mr-2 text-primary-700" />{" "}
                    Dashboard
                  </NavLink>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/bookings"
                    className="flex items-center w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-300"
                  >
                    <AiOutlineBook className="mr-2 text-primary-700" /> Bookings
                  </NavLink>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/services"
                    className="flex items-center w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-300"
                  >
                    <AiOutlineTool className="mr-2 text-primary-700" /> Service
                    Management
                  </NavLink>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/slots"
                    className="flex items-center w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-300"
                  >
                    <AiOutlineSchedule className="mr-2 text-primary-700" /> Slot
                    Management
                  </NavLink>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/users"
                    className="flex items-center w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-300"
                  >
                    <AiOutlineUser className="mr-2 text-primary-700" /> User
                    Management
                  </NavLink>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/newsletter/subscribers"
                    className="flex items-center w-full text-left p-2 rounded-lg bg-neutral-100 hover:bg-neutral-300"
                  >
                    <AiOutlineMail className="mr-2 text-primary-700" />{" "}
                    Newsletter Subscribers
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="w-full mx-auto min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
