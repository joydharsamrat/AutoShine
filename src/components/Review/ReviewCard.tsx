import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { TReview } from "../../types";

type ReviewCardProps = {
  review: TReview;
  index?: number; // Optional index for animations
};

const ReviewCard = ({ review, index = 0 }: ReviewCardProps) => {
  return (
    <motion.div
      className="bg-neutral-200 p-4 rounded-md shadow-md flex-1 flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * index, duration: 0.5 }}
    >
      <div className="flex-1">
        <p className="mt-2 text-neutral-700 text-sm">
          <span className="inline-block mr-2 text-5xl opacity-30 animate-pulse">
            <FaQuoteLeft />
          </span>
          {review.review}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <IoPersonCircleSharp className="text-5xl text-primary-700" />
          <p className="text-primary-700 text-sm font-semibold">
            {review.user.name}
          </p>
        </div>

        <div className="flex items-end gap-1">
          {Array.from({ length: review.rating }, (_, index) => (
            <FaStar key={index} size={12} className="text-secondary-500" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
