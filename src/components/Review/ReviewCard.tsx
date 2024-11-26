import { FaQuoteLeft, FaStar, FaTimes } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState } from "react";
import { TReview } from "../../types";
import { formatDate } from "../../utils/fomatDate";

type ReviewCardProps = {
  review: TReview;
  index?: number;
};

const ReviewCard = ({ review, index = 0 }: ReviewCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maxCharacters = 200;

  const truncatedReview =
    review.review.length > maxCharacters
      ? `${review.review.slice(0, maxCharacters)}...`
      : review.review;

  return (
    <>
      {/* Review Card */}
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
            {truncatedReview}
            {review.review.length > maxCharacters && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-primary-500 hover:underline ml-2"
              >
                Read More
              </button>
            )}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <IoPersonCircleSharp className="text-5xl text-primary-700" />
            <div>
              <p className="text-primary-700 text-sm font-semibold">
                {review.user.name}
              </p>
              <p className="text-[10px]">
                {formatDate(new Date(review.createdAt))}
              </p>
            </div>
          </div>

          <div className="flex items-end gap-1">
            {Array.from({ length: review.rating }, (_, index) => (
              <FaStar key={index} size={12} className="text-secondary-500" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg relative">
            <button
              className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-700"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes />
            </button>
            <h3 className="text-lg font-bold text-primary-700 mb-4">
              Full Review
            </h3>
            <p className="text-neutral-700">{review.review}</p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <IoPersonCircleSharp className="text-5xl text-primary-700" />
                <div>
                  <p className="text-primary-700 text-sm font-semibold">
                    {review.user.name}
                  </p>
                  <p className="text-[10px]">
                    {formatDate(new Date(review.createdAt))}
                  </p>
                </div>
              </div>

              <div className="flex items-end gap-1">
                {Array.from({ length: review.rating }, (_, index) => (
                  <FaStar
                    key={index}
                    size={12}
                    className="text-secondary-500"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
