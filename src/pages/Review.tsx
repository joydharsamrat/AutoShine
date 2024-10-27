import { useGetAllReviewsQuery } from "../redux/features/review/review.api";
import { TReview } from "../types";
import { motion } from "framer-motion";
import ReviewCard from "../components/Review/ReviewCard";
import ReviewCardSkeleton from "../components/Shared/Loaders/Skeleton/ReviewSkeleton";

const Review = () => {
  const { data, isLoading, isError } = useGetAllReviewsQuery({
    limit: 0,
  });

  if ((!isLoading && isError) || !data?.data?.length) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-primary-700">No reviews found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-700 text-center mb-8">
        Customer Reviews
      </h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ReviewCardSkeleton key={index} />
            ))
          : data.data.map((review: TReview, index: number) => (
              <ReviewCard key={index} review={review} index={index} />
            ))}
      </motion.div>
    </div>
  );
};

export default Review;
