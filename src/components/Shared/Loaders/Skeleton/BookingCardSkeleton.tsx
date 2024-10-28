const BookingCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white p-4 rounded-lg shadow-md border border-neutral-300">
      <div className="h-6 bg-neutral-300 rounded w-3/4 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-neutral-300 rounded w-1/2"></div>
        <div className="h-4 bg-neutral-300 rounded w-2/3"></div>
        <div className="h-4 bg-neutral-300 rounded w-3/4"></div>
        <div className="h-4 bg-neutral-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default BookingCardSkeleton;
