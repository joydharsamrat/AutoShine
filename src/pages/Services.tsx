import { useEffect, useState } from "react";
import { useGetAllServicesQuery } from "../redux/features/service/service.api";
import { TService } from "../types";
import Sort from "../components/Service/Sort";

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

  if (isLoading) {
    return <div>Loading services...</div>;
  }

  if (isError) {
    console.log(error);
    return <div>Error fetching services</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-700 text-center mb-8">
        Our Car Wash Services
      </h1>

      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        <input
          type="text"
          placeholder="Search services..."
          className="p-2 border rounded-md mb-4 md:mb-0 md:w-1/3 h-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          <div className="h-screen w-full">
            <p className="text-3xl text-secondary-500 font-semibold">
              😭 No data found !
            </p>
          </div>
        ) : (
          servicesData.data.map((service: TService) => (
            <div
              key={service._id}
              className="bg-neutral-200 p-4 rounded-lg shadow-md"
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
              <p className="text-sm text-neutral-500">
                Duration: {service.duration} minutes
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
