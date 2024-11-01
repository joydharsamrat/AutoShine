/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { useCreateServiceMutation } from "../../../redux/features/service/service.api";
import toast from "react-hot-toast";
import Form from "../../form/Form";
import InputField from "../../form/InputField";

type AddServiceModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddServiceModal({
  isOpen,
  setIsOpen,
}: AddServiceModalProps) {
  const [addService, { isLoading }] = useCreateServiceMutation();

  const handleAddService = async (data: Record<string, unknown>) => {
    const loadingToast = toast.loading("Adding service...");

    const updatedData = {
      ...data,
      price: parseFloat(data.price as any),
      duration: parseInt(data.duration as any, 10),
    };
    console.log(updatedData);
    try {
      const res = await addService(updatedData).unwrap();
      console.log(res);
      toast.success("Service added successfully!", { id: loadingToast });
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.data.message || "Failed to add service! Please try again.",
        { id: loadingToast }
      );
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
              Edit Service
            </DialogTitle>
            <Form onSubmit={handleAddService}>
              <div className="mt-4 space-y-4">
                <InputField
                  type="text"
                  name="name"
                  label="Name"
                  rules={{ required: "Name is required" }}
                />
                <InputField
                  type="text"
                  name="description"
                  label="Description"
                  rules={{ required: "Description is required" }}
                />
                <InputField
                  type="number"
                  name="price"
                  label="Price"
                  rules={{
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price must be a positive number",
                    },
                  }}
                />
                <InputField
                  type="number"
                  name="duration"
                  label="Duration (min)"
                  rules={{
                    required: "Duration is required",
                    min: {
                      value: 0,
                      message: "Duration must be a positive number",
                    },
                  }}
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  className="btn-secondary mr-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="btn-secondary"
                >
                  Add
                </Button>
              </div>
            </Form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
