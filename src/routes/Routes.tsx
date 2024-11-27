import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/Layouts/MainLayout";
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
import UserRoute from "../components/Layouts/UserRoute";
import SignUp from "../pages/Auth/SignUp";
import Login from "../pages/Auth/Login";
import ServicesPage from "../pages/Service/Services";
import ServiceDetailsPage from "../pages/Service/ServiceDetails";
import Booking from "../pages/Service/Booking";
import ForgetPass from "../pages/Auth/ForgetPassword";
import ResetPass from "../pages/Auth/ResetPassword";
import UserBookings from "../pages/User/UserBookings";
import AuthRoute from "../components/Layouts/AuthRoute";
import Profile from "../pages/Profile";
import DashboardHome from "../pages/Admin/DashboardHome";

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
        element: <ServicesPage />,
      },
      {
        path: "/services/:id",
        element: <ServiceDetailsPage />,
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
          { index: true, element: <DashboardHome /> },
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
      {
        path: "/user/booking",
        element: (
          <UserRoute>
            <UserBookings />
          </UserRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthRoute>
            <Profile />
          </AuthRoute>
        ),
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
    path: "/forget-password",
    element: <ForgetPass />,
  },
  {
    path: "/reset-password",
    element: <ResetPass />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
