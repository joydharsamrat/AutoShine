/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { TService } from "../../types";
import { FaTimes } from "react-icons/fa";

type AddServiceModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedServices: TService[];
  setSelectedServices: Dispatch<SetStateAction<TService[]>>;
};

export default function CompareService({
  isOpen,
  setIsOpen,
  selectedServices,
  setSelectedServices,
}: AddServiceModalProps) {
  const closeModal = () => {
    setSelectedServices([]);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black bg-opacity-20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-3xl rounded-xl bg-neutral-200 p-6">
            <div className="flex justify-end ">
              <Button onClick={closeModal}>
                <FaTimes />
              </Button>
            </div>
            <div className=" p-6 rounded-lg ">
              <h2 className="text-2xl font-bold text-center mb-6">
                Compare Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                {selectedServices.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white p-4 rounded-lg shadow-md border"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600">
                      <strong>Price:</strong> ${service.price}
                    </p>
                    <p className="text-gray-600">
                      <strong>Duration:</strong> {service.duration} mins
                    </p>
                    <p className="text-gray-600">
                      <strong>Description:</strong> {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
