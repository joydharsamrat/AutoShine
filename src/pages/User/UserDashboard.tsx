import { useState } from "react";
import { useGetUserByIdQuery } from "../../redux/features/user/user.api";
import { useAppSelector } from "../../redux/features/hooks";
import UserBookings from "../../components/UserDashboard/UserBookings";
import EditUserInfoModal from "../../components/UserDashboard/EditUserInfoModal";
import { getCurrentUser } from "../../redux/features/auth/authSlice";

const UserDashboard = () => {
  const user = useAppSelector(getCurrentUser);

  const { data: userData, isLoading: userLoading } = useGetUserByIdQuery(
    user?._id
  );

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6">
      {/* User Info Sidebar */}
      <div className="w-full lg:w-1/4 p-4 lg:p-6 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden mb-6 lg:mb-0">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          User Profile
        </h2>
        {userLoading ? (
          <p className="text-gray-500">Loading user info...</p>
        ) : (
          <div className="space-y-4">
            <div>
              <span className="font-semibold text-gray-700">Name:</span>
              <div className="p-2 shadow-inner bg-neutral-200">
                <span className="text-gray-900 text-sm font-semibold truncate">
                  {userData?.data.name}
                </span>
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Email:</span>
              <div className="p-2 shadow-inner bg-neutral-200">
                <span className="text-gray-900 text-sm font-semibold truncate">
                  {userData?.data.email}
                </span>
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Phone:</span>
              <div className="p-2 shadow-inner bg-neutral-200">
                <span className="text-gray-900 text-sm font-semibold truncate">
                  {userData?.data.phone}
                </span>
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Address:</span>
              <div className="p-2 shadow-inner bg-neutral-200">
                <span className="text-gray-900 text-sm font-semibold break-words">
                  {userData?.data.address}
                </span>
              </div>
            </div>

            <button
              onClick={handleEditToggle}
              className="w-full lg:w-auto btn-primary mt-4"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Bookings Section */}
      <div className="w-full lg:w-3/4 p-4 lg:p-6 max-w-7xl mx-auto">
        <UserBookings />
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

export default UserDashboard;
