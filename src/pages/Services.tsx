import { useEffect, useState } from "react";
import { useGetAllServicesQuery } from "../redux/features/service/service.api";
import { TService } from "../types";
import Sort from "../components/Service/Sort";
import { motion } from "framer-motion";
import ServiceCard from "../components/Service/ServiceCard";
import ServiceCardSkeleton from "../components/Shared/Loaders/Skeleton/ServiceSkeleton";
import CompareService from "../components/Service/CompareModal";

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [sort, setSort] = useState("price");
  const [sortLabel, setSortLabel] = useState("Price Low To High");
  const [selectedServices, setSelectedServices] = useState<TService[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: servicesData,
    isLoading,
    isError,
    error,
  } = useGetAllServicesQuery({
    searchTerm: debouncedSearchTerm,
    sort,
  });

  const handleServiceSelect = (service: TService) => {
    setSelectedServices((prev) =>
      prev.some((selected) => selected._id === service._id)
        ? prev.filter((selected) => selected._id !== service._id)
        : [...prev, service]
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  if (isError) {
    console.log(error);
    return <div>Error fetching services</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-700 text-center mb-8">
        Our Car Wash Services
      </h1>
      <div className="mb-5 flex items-center justify-between">
        <div className="">
          <motion.input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services..."
            className="p-2 border rounded-md mb-4 w-full md:w-1/3"
          />
          <Sort
            sortOrder={sort}
            setSortOrder={setSort}
            setSortLabel={setSortLabel}
            sortLabel={sortLabel}
          />
        </div>
        {selectedServices.length >= 2 && (
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="btn-primary"
          >
            Compare
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))
          : servicesData.data.map((service: TService) => (
              <ServiceCard
                key={service._id}
                service={service}
                onSelect={handleServiceSelect}
                isSelected={selectedServices.some((s) => s._id === service._id)}
              />
            ))}
      </div>

      {selectedServices.length >= 2 && isModalOpen && (
        <CompareService
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />
      )}
    </div>
  );
};

export default ServicesPage;
