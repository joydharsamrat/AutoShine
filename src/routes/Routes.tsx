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
