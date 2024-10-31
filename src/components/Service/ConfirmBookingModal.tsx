import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { TSlot } from "../../types";
import { FaTimes } from "react-icons/fa";
import { formatDate } from "../../utils/fomatDate";
import { useNavigate } from "react-router-dom";

type AddServiceModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedSlot: TSlot;
  selectedDate: Date;
  setSelectedSlot: Dispatch<SetStateAction<TSlot | null>>;
};

export default function ConfirmBookingModal({
  isOpen,
  setIsOpen,
  selectedSlot,
  selectedDate,
  setSelectedSlot,
}: AddServiceModalProps) {
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    setSelectedSlot(null);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-20"
      onClose={closeModal}
    >
      <div
        className="fixed inset-0 w-screen bg-black bg-opacity-70"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md transform rounded-lg bg-white p-6 shadow-lg transition-all">
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="mt-4 p-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-primary-800 mb-2">
              Confirm Your Booking
            </h3>
            <p className="text-lg font-medium text-neutral-800">
              {selectedSlot.service.name}
            </p>
            <p className="text-neutral-600 mt-2">
              {formatDate(selectedDate)} at {selectedSlot.startTime} -{" "}
              {selectedSlot.endTime}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => navigate(`/booking/${selectedSlot._id}`)}
              className="btn-primary"
            >
              Confirm Booking
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
