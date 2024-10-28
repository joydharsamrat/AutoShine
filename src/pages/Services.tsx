import { useEffect, useState } from "react";
import { useGetAllServicesQuery } from "../redux/features/service/service.api";
import { TService } from "../types";
import Sort from "../components/Service/Sort";
import { motion } from "framer-motion";
import "animate.css";
import ServiceCard from "../components/Service/ServiceCard";
import ServiceCardSkeleton from "../components/Shared/Loaders/Skeleton/ServiceSkeleton";

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [sort, setSort] = useState("price");
  const [sortLabel, setSortLabel] = useState("Price Low To High");

  const {
    data: servicesData,
    isLoading,
    isError,
    error,
  } = useGetAllServicesQuery({
    searchTerm: debouncedSearchTerm,
    sort,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  if (isError) {
    console.log(error);
    return (
      <div className="text-center text-3xl font-semibold min-h screen text-red-500 p-20">
        Error fetching services
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate__animated animate__fadeIn">
      <h1 className="text-3xl font-bold text-primary-700 text-center mb-8">
        Our Car Wash Services
      </h1>

      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        <motion.input
          type="text"
          placeholder="Search services..."
          className="p-2 border rounded-md mb-4 md:mb-0 md:w-1/3 h-10 focus:border-primary-700 transition duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        <Sort
          sortOrder={sort}
          setSortOrder={setSort}
          setSortLabel={setSortLabel}
          sortLabel={sortLabel}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ServiceCardSkeleton key={index} />
          ))
        ) : !servicesData?.data.length ? (
          <motion.div
            className="h-screen w-full flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-3xl text-secondary-500 font-semibold">
              😭 No data found!
            </p>
          </motion.div>
        ) : (
          servicesData.data.map((service: TService) => (
            <ServiceCard key={service._id} service={service} />
          ))
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
