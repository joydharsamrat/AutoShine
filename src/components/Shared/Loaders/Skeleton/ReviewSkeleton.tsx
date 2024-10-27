const ReviewCardSkeleton = () => {
  return (
    <div className="bg-neutral-200 p-4 rounded-md shadow-md flex-1 flex flex-col justify-between">
      <div className="flex-1">
        <div className="h-6 bg-gray-300 rounded mt-2 w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-300 rounded mt-2 w-1/2 animate-pulse" />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse" />
        </div>
        <div className="flex items-end gap-1">
          <div className="h-5 w-5 bg-gray-300 rounded animate-pulse" />
          <div className="h-5 w-5 bg-gray-300 rounded animate-pulse" />
          <div className="h-5 w-5 bg-gray-300 rounded animate-pulse" />
          <div className="h-5 w-5 bg-gray-300 rounded animate-pulse" />
          <div className="h-5 w-5 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;
