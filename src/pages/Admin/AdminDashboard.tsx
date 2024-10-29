// AdminLayout.tsx
import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-200">
      <header className="p-4 bg-primary-700 text-white text-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>

      <div className="flex flex-col md:flex-row">
        <nav className="w-full md:w-1/4 bg-white  p-4 md:pl-4 md:pr-0 md:min-h-screen">
          <ul className="space-y-4">
            <li>
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
            <li>
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
            <li>
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
            <li>
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
        </nav>

        <main className="w-full md:w-3/4 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
