/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import Form from "../form/Form";
import InputField from "../form/InputField";
import { useUpdateUserInfoMutation } from "../../redux/features/user/user.api";

type EditUserInfoModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userData: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
};

export default function EditUserInfoModal({
  isOpen,
  setIsOpen,
  userData,
}: EditUserInfoModalProps) {
  const [updateUser] = useUpdateUserInfoMutation();

  const handleEditUser = async (data: Record<string, unknown>) => {
    const loadingToast = toast.loading("Updating ...");
    try {
      const res = await updateUser(data).unwrap();
      console.log(res);
      toast.success("User information updated successfully!", {
        id: loadingToast,
      });
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.data.message ||
          "Failed to update user information! Please try again.",
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
              Edit User Information
            </DialogTitle>
            <Form onSubmit={handleEditUser}>
              <div className="mt-4 space-y-4">
                <InputField
                  type="text"
                  name="name"
                  label="Name"
                  defaultValue={userData.name}
                  rules={{ required: "Name is required" }}
                />
                <InputField
                  type="email"
                  name="email"
                  label="Email"
                  defaultValue={userData.email}
                  rules={{ required: "Email is required" }}
                />
                <InputField
                  type="text"
                  name="phone"
                  label="Phone"
                  defaultValue={userData.phone}
                  rules={{ required: "Phone is required" }}
                />
                <InputField
                  type="text"
                  name="address"
                  label="Address"
                  defaultValue={userData.address}
                  rules={{ required: "Address is required" }}
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
                  Save Changes
                </Button>
              </div>
            </Form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
