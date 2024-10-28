const ServiceCardSkeleton = () => {
  return (
    <div className="bg-neutral-200 p-4 rounded-lg shadow-md animate-pulse">
      <div className="h-6 bg-neutral-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-neutral-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-neutral-300 rounded w-1/2 mb-4"></div>
      <div className="h-5 bg-neutral-300 rounded w-1/3 mb-2"></div>
      <div className="h-5 bg-neutral-300 rounded w-1/4 mb-4"></div>
      <div className="h-7 bg-primary-700 rounded w-1/4"></div>
    </div>
  );
};

export default ServiceCardSkeleton;
