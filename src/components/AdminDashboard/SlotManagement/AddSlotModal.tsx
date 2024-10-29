/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import Form from "../../form/Form";
import InputField from "../../form/InputField";
import { Controller } from "react-hook-form";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  useCreateSlotsMutation,
  useGetAllServicesQuery,
} from "../../../redux/features/service/service.api";
import SelectField from "../../form/SelectField";
import { TService } from "../../../types";

type AddSlotModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddSlotModal({ isOpen, setIsOpen }: AddSlotModalProps) {
  const [createSlots] = useCreateSlotsMutation();
  const { data: services, isLoading: servicesLoading } = useGetAllServicesQuery(
    { searchParams: "", limit: 0 }
  );

  const handleAddSlot = async (data: Record<string, unknown>) => {
    const loadingToast = toast.loading("Adding slot...");
    const formattedData = {
      ...data,
      date: new Date(data.date as string).toLocaleDateString("en-CA"),
    };
    try {
      const res = await createSlots(formattedData).unwrap();
      toast.success("Slot added successfully!", { id: loadingToast });
      console.log(res);
      setIsOpen(false);
    } catch (error: any) {
      toast.error(
        error.data?.message || "Failed to add slot! Please try again.",
        { id: loadingToast }
      );
      console.log(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black bg-opacity-20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-neutral-200 p-6">
            <DialogTitle
              as="h3"
              className="text-xl font-medium text-center text-neutral-800"
            >
              Add Slot
            </DialogTitle>
            <Form onSubmit={handleAddSlot}>
              <div className="mt-4 space-y-4">
                {/* Service Selector */}
                <SelectField
                  name="service"
                  label="Service"
                  options={
                    servicesLoading
                      ? []
                      : services?.data.map((service: TService) => ({
                          value: service._id,
                          label: service.name,
                        })) || []
                  }
                  rules={{ required: "Service is required" }}
                />

                {/* Date Picker */}
                <Controller
                  name="date"
                  rules={{ required: "Date is required" }}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <div className="my-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <Calendar
                        minDate={new Date()}
                        onChange={onChange}
                        value={value || new Date()}
                        className="border rounded-md p-2"
                      />
                    </div>
                  )}
                />

                {/* Start Time */}
                <InputField
                  type="time"
                  name="startTime"
                  label="Start Time"
                  rules={{ required: "Start time is required" }}
                  defaultValue=""
                />

                {/* End Time */}
                <InputField
                  type="time"
                  name="endTime"
                  label="End Time"
                  rules={{ required: "End time is required" }}
                  defaultValue=""
                />
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  className="btn-secondary mr-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary">
                  Add Slot
                </Button>
              </div>
            </Form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
