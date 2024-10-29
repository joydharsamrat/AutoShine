import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/Layouts/MainLayout";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import Booking from "../pages/Booking";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Review from "../pages/Review";
import Success from "../pages/Success";
import Failed from "../pages/Failed";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminRoute from "../components/Layouts/AdminRoute";
import UserManagement from "../pages/Admin/UserManagement";
import SlotManagement from "../pages/Admin/SlotManagement";
import ServiceManagement from "../pages/Admin/ServiceManagement";
import Bookings from "../pages/Admin/Bookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/home",
        element: <App />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/booking/:id",
        element: <Booking />,
      },
      {
        path: "/booking/success",
        element: <Success />,
      },
      {
        path: "/booking/failed",
        element: <Failed />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/reviews",
        element: <Review />,
      },
      {
        path: "/admin/dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <Bookings /> },
          { path: "bookings", element: <Bookings /> },
          {
            path: "services",
            element: <ServiceManagement />,
          },
          {
            path: "slots",
            element: <SlotManagement />,
          },
          {
            path: "users",
            element: <UserManagement />,
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
