import { useNavigate } from "react-router-dom";
import { TService } from "../../types";

const ServiceCard = ({ service }: { service: TService }) => {
  const navigate = useNavigate();

  return (
    <div
      key={service._id}
      className="flex flex-col justify-between bg-neutral-200 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 "
    >
      <div>
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
      </div>
      <button
        onClick={() => navigate(`/services/${service._id}`)}
        className="btn-primary"
      >
        View Details
      </button>
    </div>
  );
};

export default ServiceCard;
