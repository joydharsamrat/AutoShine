import { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion for animations
import { useAppSelector } from "../redux/features/hooks";
import { useGetUserByIdQuery } from "../redux/features/user/user.api";
import { getCurrentUser } from "../redux/features/auth/authSlice";
import EditUserInfoModal from "../components/UserDashboard/EditUserInfoModal";
import { FaRegEdit } from "react-icons/fa";

const Profile = () => {
  const user = useAppSelector(getCurrentUser);
  const { data: userData, isLoading: userLoading } = useGetUserByIdQuery(
    user?._id
  );

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-tr from-primary-700 to-secondary-700 p-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 lg:p-10 relative"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {userLoading ? "Loading..." : userData?.data.name || "User Name"}
          </h2>
          <p className="text-gray-500 text-sm">
            {userLoading ? "Fetching email..." : userData?.data.email}
          </p>
        </div>

        {/* Profile Info */}
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <span className="font-semibold text-gray-700">Phone:</span>
            <span className="text-gray-900">
              {userLoading ? "Loading..." : userData?.data.phone || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <span className="font-semibold text-gray-700">Address:</span>
            <span className="text-gray-900 text-right">
              {userLoading ? "Loading..." : userData?.data.address || "N/A"}
            </span>
          </div>
        </div>

        <div
          className="absolute top-5 right-5 text-xl cursor-pointer"
          onClick={handleEditToggle}
        >
          <FaRegEdit />
        </div>
      </motion.div>

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
