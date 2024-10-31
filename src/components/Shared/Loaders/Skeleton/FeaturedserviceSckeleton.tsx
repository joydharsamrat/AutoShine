const FeaturedServiceSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-200 rounded-lg shadow-md p-6 text-center animate-pulse">
      <div className="h-6 w-32 bg-neutral-300 rounded mb-2"></div>
      <div className="h-4 w-56 bg-neutral-300 rounded mb-4"></div>
      <div className="flex mb-2 gap-5">
        <div className="h-4 w-20 bg-neutral-300 rounded"></div>
        <div className="h-4 w-24 bg-neutral-300 rounded"></div>
      </div>
      <div className="h-10 w-28 bg-neutral-300 rounded"></div>
    </div>
  );
};

export default FeaturedServiceSkeleton;
