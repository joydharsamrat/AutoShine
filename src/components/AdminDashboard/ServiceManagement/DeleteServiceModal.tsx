/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDeleteServiceMutation } from "../../../redux/features/service/service.api";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

type deleteModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  name: string;
};

export default function DeleteServiceModal({
  isOpen,
  setIsOpen,
  id,
  name,
}: deleteModalProps) {
  const [deleteService] = useDeleteServiceMutation();
  const handleDeleteService = async () => {
    const loadingToast = toast.loading("Deleting service...");
    try {
      await deleteService(id).unwrap();
      toast.success("Service deleted", { id: loadingToast });
      setIsOpen(false);
    } catch (error: any) {
      toast.error(
        error.data.message || "failed to delete service! try again.",
        { id: loadingToast }
      );
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black bg-opacity-20">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-primary-700 p-5"
            >
              <DialogTitle
                as="h3"
                className="text-xl font-medium text-center text-white"
              >
                Delete {name}
              </DialogTitle>
              <div className="mt-4 flex justify-around items-center">
                <Button
                  className="btn-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="btn-secondary" onClick={handleDeleteService}>
                  delete
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
