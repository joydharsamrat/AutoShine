/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useAppSelector } from "../../redux/features/hooks";
import { motion } from "framer-motion";
import "animate.css";
import {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} from "../../redux/features/review/review.api";
import toast from "react-hot-toast";
import { IoPersonCircleSharp } from "react-icons/io5";
import { CgFormatSlash } from "react-icons/cg";
import { TbSlash } from "react-icons/tb";
import { RxSlash } from "react-icons/rx";
import { TReview } from "../../types";

export default function ReviewSection() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const userData = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [createReview] = useCreateReviewMutation();
  const { data } = useGetAllReviewsQuery({ limit: 2 });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!feedback || rating === 0) return;
    const loadingToast = toast.loading("Loading...");
    try {
      await createReview({
        user: userData.user?._id,
        review: feedback,
        rating,
      }).unwrap();
      setIsSubmitted(true);
      setFeedback("");
      setRating(0);
      toast.success("Thanks for your feedback!", { id: loadingToast });
    } catch (error: any) {
      toast.error(
        error.message ||
          error.data.message ||
          "Review failed. Please try again.",
        { id: loadingToast }
      );
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: "/#review-section" } });
  };

  return (
    <motion.section
      id="review-section"
      className="py-12 bg-white relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {!userData?.token && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center animate__animated animate__fadeIn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleLoginRedirect}
            className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-6 py-3 rounded-md shadow-lg hover:bg-primary-600"
          >
            Login to leave a review
          </button>
        </motion.div>
      )}

      <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">
        Share Your Experience
      </h2>

      <div className="max-w-7xl mx-auto">
        {!isSubmitted ? (
          <motion.div
            className="bg-neutral-200 p-6 rounded-lg shadow-xl max-w-4xl mx-auto"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl text-primary-700 mb-4">Leave A Review</h3>
            <textarea
              className="w-full  p-4 mb-4 border rounded-md resize-none focus:outline-primary-500"
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />

            <div className="flex space-x-2 mb-4">
              {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;
                return (
                  <motion.div
                    key={starValue}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaStar
                      size={24}
                      className={`cursor-pointer ${
                        starValue <= (hover || rating)
                          ? "text-secondary-500"
                          : "text-neutral-500"
                      }`}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(starValue)}
                    />
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={handleSubmit}
              className="btn-primary"
              disabled={!userData?.token || !feedback || rating === 0}
            >
              Submit Review
            </button>
          </motion.div>
        ) : (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-primary-700 mb-4 uppercase flex items-center">
              Overall Rating: {data?.overallRating}
              <RxSlash /> 5
            </h3>
            <div className="sm:flex sm:gap-5">
              {data?.data?.map((review: TReview, index: number) => (
                <motion.div
                  key={index}
                  className="bg-neutral-200 p-4 rounded-md shadow-md flex-1 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <div className="flex-1">
                    <p className="mt-2 text-neutral-700 text-sm ">
                      <span className="inline-block mr-2 text-5xl opacity-30 animate-pulse">
                        <FaQuoteLeft />
                      </span>
                      {review.review}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <IoPersonCircleSharp className="text-5xl text-primary-700" />
                      <p className=" text-primary-700 text-sm font-semibold">
                        {review.user.name}
                      </p>
                    </div>

                    <div className="flex items-end gap-1 ">
                      {Array.from({ length: review.rating }, (_, index) => (
                        <FaStar
                          key={index}
                          size={12}
                          className="text-secondary-500"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={() => navigate("/reviews")}
              className="mt-6 btn-primary"
            >
              See All Reviews
            </motion.button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
