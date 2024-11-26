/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useMakeAdminMutation,
} from "../../redux/features/user/user.api";
import { useGetBookingsForUserQuery } from "../../redux/features/booking/booking.api";
import toast from "react-hot-toast";
import { TBooking, TUser } from "../../types";
import Loader from "../../components/Shared/Loaders/Loader";

const UserManagement = () => {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery(undefined);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  // fetch bookings only when a user is selected
  const { data: bookings, isLoading: bookingsLoading } =
    useGetBookingsForUserQuery(selectedUser ? selectedUser._id : undefined, {
      skip: !selectedUser,
    });

  const [makeAdmin] = useMakeAdminMutation();

  useEffect(() => {
    console.log("Users:", users);
    console.log("Bookings for selected user:", bookings);
  }, [users, bookings]);

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
    <div>
      <div className="p-4  mb-5">
        <h2 className="text-xl font-bold mb-4">User Management</h2>

        {/* User List Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">User List</h3>
          {usersLoading ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-md">
                <thead>
                  <tr className="bg-primary-700 text-white ">
                    <th className=" p-2 text-sm sm:text-base min-w-[200px] text-left whitespace-nowrap">
                      Name
                    </th>
                    <th className=" p-2 text-sm sm:text-base min-w-[200px] text-left whitespace-nowrap">
                      Email
                    </th>
                    <th className=" p-2 text-sm sm:text-base min-w-[100px ] text-left whitespace-nowrap">
                      Role
                    </th>
                    <th className=" p-2 text-sm sm:text-base min-w-[300px] text-left whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.data.map((user: TUser) => (
                    <tr key={user._id}>
                      <td className="border-b p-2 text-sm sm:text-base min-w-[200px]">
                        {user.name}
                      </td>
                      <td className="border-b p-2 text-sm sm:text-base min-w-[200px]">
                        {user.email}
                      </td>
                      <td className="border-b p-2 text-sm sm:text-base min-w-[100px]">
                        {user.role}
                      </td>
                      <td className="border-b p-2 flex space-x-2 text-sm sm:text-base min-w-[300px]">
                        <button
                          disabled={user.role === "admin"}
                          onClick={() => handleViewBookings(user)}
                          className={`${
                            user.role === "user"
                              ? "btn-primary"
                              : "btn-neutral "
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
      </div>

      {/* User Bookings Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">User Bookings</h3>
        {selectedUser ? (
          bookingsLoading ? (
            <Loader />
          ) : bookings && bookings.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-4 bg-white shadow-md rounded-md">
                <thead>
                  <tr className="bg-primary-700 text-white ">
                    <th className="p-2 text-sm sm:text-base min-w-[200px] text-left whitespace-nowrap ">
                      Service
                    </th>
                    <th className="p-2 text-sm sm:text-base min-w-[200px] text-left whitespace-nowrap">
                      Date
                    </th>
                    <th className="p-2 text-sm sm:text-base min-w-[200px] text-left whitespace-nowrap">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.data.map((booking: TBooking) => (
                    <tr key={booking._id}>
                      <td className="border-b p-2 text-sm sm:text-base min-w-[200px] font-semibold">
                        {booking.service.name}
                      </td>
                      <td className="border-b p-2 text-sm sm:text-base min-w-[200px]">
                        {booking.slot.date}
                      </td>
                      <td className="border-b p-2 text-sm sm:text-base min-w-[200px]">
                        {booking.slot.startTime} - {booking.slot.endTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
