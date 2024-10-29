/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetGroupedSlotsByServiceQuery,
  useToggleSlotStatusMutation,
} from "../../redux/features/slot/slot.api";
import AddSlotModal from "../../components/AdminDashboard/SlotManagement/AddSlotModal";
import { TSlot } from "../../types";
import toast from "react-hot-toast";

const SlotManagement = () => {
  const { data, isLoading } = useGetGroupedSlotsByServiceQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggleSlotStatus] = useToggleSlotStatusMutation();

  const handleToggleSlotStatus = async (id: string, status: string) => {
    const loadingToast = toast.loading("Updating...");

    let updatedStatus = "";

    if (status === "available") {
      updatedStatus = "cancelled";
    } else if (status === "cancelled") {
      updatedStatus = "available";
    } else {
      return;
    }

    try {
      await toggleSlotStatus({
        id,
        status: updatedStatus,
      }).unwrap();
      toast.success("Status updated", { id: loadingToast });
    } catch (error: any) {
      toast.error(error.data.message || "failed to update status! try again.", {
        id: loadingToast,
      });
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Slot Management</h2>

      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-700 text-white px-4 py-2 rounded"
        >
          Add Slot
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          {data.data.map(
            (service: {
              serviceId: string;
              serviceName: string;
              slots: TSlot[];
            }) => (
              <div key={service.serviceId} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {service.serviceName}
                </h3>
                <table className="w-full border-collapse mb-4">
                  <thead>
                    <tr>
                      <th className="border p-2 min-w-[120px]">Date</th>
                      <th className="border p-2 min-w-[120px]">Time</th>
                      <th className="border p-2 min-w-[120px]">Status</th>
                      <th className="border p-2 min-w-[200px]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.slots.map((slot) => (
                      <tr key={slot._id}>
                        <td className="border p-2 min-w-[120px]">
                          {slot.date}
                        </td>
                        <td className="border p-2 min-w-[120px]">
                          {slot.startTime} - {slot.endTime}
                        </td>
                        <td
                          className={`border p-2 min-w-[120px] font-semibold ${
                            slot.isBooked === "booked"
                              ? "text-primary-500"
                              : slot.isBooked === "available"
                              ? "text-green-600"
                              : slot.isBooked === "cancelled"
                              ? "text-secondary-500"
                              : ""
                          }`}
                        >
                          {slot.isBooked}
                        </td>
                        <td className="border p-2 min-w-[200px] text-center">
                          {slot.isBooked !== "booked" && (
                            <button
                              onClick={() =>
                                handleToggleSlotStatus(slot._id, slot.isBooked)
                              }
                              className={`${
                                slot.isBooked === "available"
                                  ? "btn-secondary"
                                  : slot.isBooked === "cancelled"
                                  ? "btn-primary"
                                  : ""
                              } `}
                            >
                              Toggle Status
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      )}

      {/* Add Slot Modal */}
      <AddSlotModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default SlotManagement;
