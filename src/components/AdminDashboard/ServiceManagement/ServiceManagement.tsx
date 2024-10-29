import { FaTrashAlt } from "react-icons/fa";
import { useGetAllServicesQuery } from "../../../redux/features/service/service.api";
import { TService } from "../../../types";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import DeleteServiceModal from "./DeleteServiceModal";
// import EditServiceModal from "./EditServiceModal";

const ServiceManagement = () => {
  const { data, isLoading } = useGetAllServicesQuery({
    searchTerm: "",
    sort: "-createdAt",
  });

  // State for the delete and edit modals
  const [serviceToDelete, setServiceToDelete] = useState<TService | null>(null);
  // const [serviceToEdit, setServiceToEdit] = useState<TService | null>(null);

  const openDeleteModal = (service: TService) => setServiceToDelete(service);
  const closeDeleteModal = () => setServiceToDelete(null);

  // const openEditModal = (service: TService) => setServiceToEdit(service);
  // const closeEditModal = () => setServiceToEdit(null);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Service Management</h2>
      <button className="bg-primary-700 text-white px-4 py-2 rounded-lg mb-4">
        Add Service
      </button>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-neutral-200">
              <th className="p-3 text-left whitespace-nowrap">Service Name</th>
              <th className="p-3 text-left whitespace-nowrap">Price</th>
              <th className="p-3 text-left whitespace-nowrap">Duration</th>
              <th className="p-3 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-b animate-pulse">
                    <td className="p-3">
                      <div className="h-4 bg-neutral-300 rounded w-3/4"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-neutral-300 rounded w-1/2"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-neutral-300 rounded w-1/3"></div>
                    </td>
                    <td className="p-3 flex space-x-2">
                      <div className="h-6 bg-neutral-300 rounded w-10"></div>
                      <div className="h-6 bg-neutral-300 rounded w-10"></div>
                    </td>
                  </tr>
                ))
              : data?.data?.map((service: TService) => (
                  <tr key={service._id} className="border-b">
                    <td className="p-3">{service.name}</td>
                    <td className="p-3">${service.price}</td>
                    <td className="p-3">{service.duration} min</td>
                    <td className="p-3 flex space-x-4">
                      <button
                        className="text-primary-500"
                        // onClick={() => openEditModal(service)}
                      >
                        <BiEdit />
                      </button>
                      <button
                        onClick={() => openDeleteModal(service)}
                        className="text-red-500"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {serviceToDelete && (
        <DeleteServiceModal
          id={serviceToDelete._id}
          name={serviceToDelete.name}
          isOpen={!!serviceToDelete}
          setIsOpen={closeDeleteModal}
        />
      )}

      {/* Edit Modal */}
      {/* {serviceToEdit && (
        <EditServiceModal
          service={serviceToEdit}
          isOpen={!!serviceToEdit}
          setIsOpen={closeEditModal}
        />
      )} */}
    </div>
  );
};

export default ServiceManagement;
