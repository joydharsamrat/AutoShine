import { useEffect, useState } from "react";
import {
  useGetSlotsForServiceQuery,
  useToggleSlotStatusMutation,
} from "../../redux/features/slot/slot.api";
import AddSlotModal from "../../components/AdminDashboard/SlotManagement/AddSlotModal";
import { TSlot } from "../../types";
import toast from "react-hot-toast";
import { useGetAllServicesQuery } from "../../redux/features/service/service.api";
import Loader from "../../components/Shared/Loaders/Loader";

const SlotManagement = () => {
  const { data: services, isLoading: isServicesLoading } =
    useGetAllServicesQuery({});
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const { data: slotsData, isLoading: isSlotsLoading } =
    useGetSlotsForServiceQuery(
      { serviceId: selectedService },
      { skip: !selectedService }
    );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggleSlotStatus] = useToggleSlotStatusMutation();

  useEffect(() => {
    if (services?.data?.length && !selectedService) {
      setSelectedService(services.data[0]._id);
    }
  }, [services, selectedService]);

  const handleToggleSlotStatus = async (id: string, status: string) => {
    const loadingToast = toast.loading("Updating...");
    const updatedStatus = status === "available" ? "cancelled" : "available";

    try {
      await toggleSlotStatus({ id, status: updatedStatus }).unwrap();
      toast.success("Status updated", { id: loadingToast });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message || "Failed to update status! Try again.", {
        id: loadingToast,
      });
    }
  };

  //  group and sort slots by date
  const groupSlotsByDate = (slots: TSlot[]) => {
    const grouped = slots.reduce((acc: Record<string, TSlot[]>, slot) => {
      acc[slot.date] = acc[slot.date] || [];
      acc[slot.date].push(slot);
      return acc;
    }, {});

    return Object.entries(grouped).sort(
      ([dateA], [dateB]) =>
        new Date(dateA).getTime() - new Date(dateB).getTime()
    );
  };

  const groupedSlots = slotsData?.data ? groupSlotsByDate(slotsData.data) : [];

  return (
    <div className=" p-4">
      <div className="bg-white p-4 rounded-md shadow-md ">
        <h2 className="text-xl font-bold mb-4 ">Slot Management</h2>

        {/* Add Slot Button */}
        <div className="mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-700 text-white px-4 py-2 rounded"
          >
            Add Slot
          </button>
        </div>

        {/* Service Selection */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium">
            Select Service:
          </label>
          {isServicesLoading ? (
            <div className="mt-1 border p-3">
              <div className="h-8 bg-neutral-300 rounded animate-glow"></div>
            </div>
          ) : (
            <select
              id="service"
              className="border rounded p-3 mt-1 w-full"
              value={selectedService || ""}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option selected disabled>
                -- Select a Service --
              </option>
              {services?.data.map((service: { _id: string; name: string }) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className=" mt-5">
        {isSlotsLoading || isServicesLoading ? (
          <Loader />
        ) : groupedSlots.length > 0 ? (
          groupedSlots.map(([date, slots]) => (
            <div key={date}>
              <h3 className="text-xl font-semibold my-3 ">{date}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse mb-4 bg-white shadow-md rounded-lg ">
                  <thead>
                    <tr className="bg-primary-700 text-white">
                      <th className="p-3 text-left whitespace-nowrap min-w-[150px]">
                        Time
                      </th>
                      <th className="p-3 text-left whitespace-nowrap min-w-[150px]">
                        Status
                      </th>
                      <th className="p-3 text-left whitespace-nowrap min-w-[200px]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((slot) => (
                      <tr key={slot._id} className="border-b">
                        <td className="p-3">{`${slot.startTime} - ${slot.endTime}`}</td>
                        <td
                          className={`p-3 font-semibold ${
                            slot.isBooked === "booked"
                              ? "text-primary-500"
                              : slot.isBooked === "available"
                              ? "text-green-600"
                              : "text-secondary-500"
                          }`}
                        >
                          {slot.isBooked}
                        </td>
                        <td className="p-3">
                          {slot.isBooked !== "booked" && (
                            <button
                              onClick={() =>
                                handleToggleSlotStatus(slot._id, slot.isBooked)
                              }
                              className={`${
                                slot.isBooked === "available"
                                  ? "btn-secondary"
                                  : "btn-primary"
                              }`}
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
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No slots available.</p>
        )}
      </div>

      {/* Add Slot Modal */}
      <AddSlotModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default SlotManagement;
