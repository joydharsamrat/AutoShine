import { useEffect, useState } from "react";
import { useGetAllServicesQuery } from "../redux/features/service/service.api";
import { TService } from "../types";
import Sort from "../components/Service/Sort";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "animate.css";

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

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="text-center text-primary-700 animate__animated animate__fadeIn">
        Loading services...
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <div className="text-center text-red-500 animate__animated animate__fadeIn">
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
        {!servicesData?.data.length ? (
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
            <motion.div
              key={service._id}
              className="bg-neutral-200 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate__animated animate__fadeInUp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * Math.random(), duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-primary-700 mb-2">
                {service.name}
              </h2>
              <p className="text-sm text-neutral-700 mb-2">
                {service.description}
              </p>
              <p className="text-lg font-bold text-primary-700">
                Price: ${service.price}
              </p>
              <p className="text-sm text-neutral-500 mb-4">
                Duration: {service.duration} minutes
              </p>
              <button
                onClick={() => navigate(`/services/${service._id}`)}
                className="bg-primary-700 text-white px-4 py-2 rounded-md transition-transform duration-300 transform hover:scale-105"
              >
                View Details
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
