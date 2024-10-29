/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetUsersQuery,
  useMakeAdminMutation,
} from "../../redux/features/user/user.api";
import { useGetBookingsForUserQuery } from "../../redux/features/booking/booking.api";
import toast from "react-hot-toast";
import { TBooking, TUser } from "../../types";

const UserManagement = () => {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery(undefined);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  // fetch bookings only when a user is selected
  const { data: bookings, isLoading: bookingsLoading } =
    useGetBookingsForUserQuery(selectedUser ? selectedUser._id : undefined, {
      skip: !selectedUser,
    });

  const [makeAdmin] = useMakeAdminMutation();

  const handleMakeAdmin = async (id: string) => {
    const loadingToast = toast.loading("Updating role...");
    try {
      await makeAdmin(id).unwrap();
      toast.success("User role updated successfully!", { id: loadingToast });
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.data.message || "Failed to update user role! Please try again.",
        { id: loadingToast }
      );
    }
  };

  const handleViewBookings = (user: TUser) => {
    if (user._id === selectedUser?._id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {/* User List Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">User List</h3>
        {usersLoading ? (
          <p>Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th className="border p-2 text-sm sm:text-base min-w-[200px]">
                    Name
                  </th>
                  <th className="border p-2 text-sm sm:text-base min-w-[200px]">
                    Email
                  </th>
                  <th className="border p-2 text-sm sm:text-base min-w-[100px]">
                    Role
                  </th>
                  <th className="border p-2 text-sm sm:text-base min-w-[300px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.data.map((user: TUser) => (
                  <tr key={user._id}>
                    <td className="border p-2 text-sm sm:text-base min-w-[200px]">
                      {user.name}
                    </td>
                    <td className="border p-2 text-sm sm:text-base min-w-[200px]">
                      {user.email}
                    </td>
                    <td className="border p-2 text-sm sm:text-base min-w-[100px]">
                      {user.role}
                    </td>
                    <td className="border p-2 flex space-x-2 text-sm sm:text-base min-w-[300px]">
                      <button
                        disabled={user.role === "admin"}
                        onClick={() => handleViewBookings(user)}
                        className={`${
                          user.role === "user" ? "btn-primary" : "btn-neutral "
                        } `}
                      >
                        View Bookings
                      </button>
                      {user.role === "user" && (
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          className="btn-secondary"
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Bookings Section */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-2">User Bookings</h3>
        {selectedUser ? (
          bookingsLoading ? (
            <p>Loading bookings...</p>
          ) : bookings && bookings.data.length > 0 ? (
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th className="border p-2 text-sm sm:text-base min-w-[200px]">
                    Service
                  </th>
                  <th className="border p-2 text-sm sm:text-base min-w-[200px]">
                    Date
                  </th>
                  <th className="border p-2 text-sm sm:text-base min-w-[200px]">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings?.data.map((booking: TBooking) => (
                  <tr key={booking._id}>
                    <td className="border p-2 text-sm sm:text-base min-w-[200px]">
                      {booking.service.name}
                    </td>
                    <td className="border p-2 text-sm sm:text-base min-w-[200px]">
                      {booking.slot.date}
                    </td>
                    <td className="border p-2 text-sm sm:text-base min-w-[200px]">
                      {booking.slot.startTime} - {booking.slot.endTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-red-500">
              No bookings found for {selectedUser?.name}.
            </p>
          )
        ) : (
          <p>Select a user to view their bookings.</p>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
