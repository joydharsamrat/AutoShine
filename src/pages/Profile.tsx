import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../redux/features/hooks";
import { useGetUserByIdQuery } from "../redux/features/user/user.api";
import { getCurrentUser } from "../redux/features/auth/authSlice";
import EditUserInfoModal from "../components/UserDashboard/EditUserInfoModal";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import UpcomingBookingCard from "../components/UserDashboard/UpcomingBookingCard";

const Profile = () => {
  const user = useAppSelector(getCurrentUser);
  const { data: userData, isLoading: userLoading } = useGetUserByIdQuery(
    user?._id
  );
  const { pastBookings, upcomingBookings } = useAppSelector(
    (state) => state.bookings
  );

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const recentPastBookings = pastBookings.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* User Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="bg-white  rounded-lg p-6 relative"
        >
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              {userLoading ? "Loading..." : userData?.data.name || "User Name"}
            </h2>
            <p className="text-gray-500">{userData?.data.email || "N/A"}</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between border-b pb-4">
              <span className="font-semibold text-gray-700">Phone:</span>
              <span className="text-gray-900">
                {userData?.data.phone || "N/A"}
              </span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="font-semibold text-gray-700">Address:</span>
              <span className="text-gray-900 break-words text-end">
                {userData?.data.address || "N/A"}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/profile/change-password"
              className="text-primary-700 text-sm underline"
            >
              Change Password
            </Link>
          </div>

          <div
            className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={handleEditToggle}
          >
            <FaRegEdit />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="bg-white  rounded-lg p-6"
        >
          {/* Upcoming Booking */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Upcoming Booking
            </h3>
            {upcomingBookings?.length > 0 ? (
              <UpcomingBookingCard
                key={upcomingBookings[0]._id}
                booking={upcomingBookings[0]}
              />
            ) : (
              <p className="text-gray-500">No upcoming bookings.</p>
            )}
          </div>

          {/* Recent Past Bookings */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Past Bookings
            </h3>
            {recentPastBookings?.length > 0 ? (
              <ul className="space-y-4">
                {recentPastBookings.map((booking) => (
                  <li key={booking._id} className="p-4  rounded-md shadow">
                    <p className="text-gray-700 flex justify-between">
                      <strong>Date:</strong> {booking.slot.date}
                    </p>
                    <p className="text-gray-700 flex justify-between">
                      <strong>Service:</strong> {booking.service.name}
                    </p>
                    <p className="text-gray-700 flex justify-between">
                      <strong>Price:</strong> ${booking.service.price}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No past bookings available.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Edit User Modal */}
      <EditUserInfoModal
        isOpen={isEditing}
        setIsOpen={setIsEditing}
        userData={{
          name: userData?.data.name || "",
          email: userData?.data.email || "",
          phone: userData?.data.phone || "",
          address: userData?.data.address || "",
        }}
      />
    </div>
  );
};

export default Profile;
