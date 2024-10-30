import { useNavigate } from "react-router-dom";
import { TService } from "../../types";

interface ServiceCardProps {
  service: TService;
  onSelect: (service: TService) => void;
  isSelected: boolean;
}

const ServiceCard = ({ service, onSelect, isSelected }: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      key={service._id}
      className={`flex flex-col justify-between bg-neutral-200 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${
        isSelected ? "border-2 border-primary-500" : ""
      }`}
    >
      <h2 className="text-xl font-semibold text-primary-700 mb-2">
        {service.name}
      </h2>

      <p className="text-sm text-neutral-700 mb-2">{service.description}</p>
      <p className="text-lg font-bold text-primary-700">
        Price: ${service.price}
      </p>
      <p className="text-sm text-neutral-500 mb-4">
        Duration: {service.duration} minutes
      </p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(`/services/${service._id}`)}
          className="btn-primary"
        >
          View Details
        </button>
        <label className="btn-primary" htmlFor={service._id}>
          Select
        </label>
        <input
          checked={isSelected}
          id={service._id}
          type="checkbox"
          onChange={() => onSelect(service)}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ServiceCard;
