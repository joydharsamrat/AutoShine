/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useAppSelector } from "../../redux/features/hooks";
import { motion } from "framer-motion";
import "animate.css";
import {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} from "../../redux/features/review/review.api";
import toast from "react-hot-toast";
import { TReview } from "../../types";
import ReviewCard from "../Review/ReviewCard";
import ReviewCardSkeleton from "../Shared/Loaders/Skeleton/ReviewSkeleton";
import { getCurrentUser, getToken } from "../../redux/features/auth/authSlice";

export default function ReviewSection() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const token = useAppSelector(getToken);
  const user = useAppSelector(getCurrentUser);
  const navigate = useNavigate();
  const [createReview] = useCreateReviewMutation();
  const { data, isLoading } = useGetAllReviewsQuery({
    limit: user && user.role === "admin" ? 3 : 2,
  });

  const handleSubmit = async () => {
    if (!feedback || rating === 0 || !token) return;
    const loadingToast = toast.loading("Loading...");

    try {
      await createReview({
        review: feedback,
        rating,
      }).unwrap();
      setFeedback("");
      setRating(0);
      toast.success("Thanks for your feedback!", { id: loadingToast });
    } catch (error: any) {
      console.log(error);
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
      className="mt-20 bg-white  max-w-7xl mx-auto px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">
        Share Your Experience
      </h2>

      <div className=" grid lg:grid-cols-3  sm:gap-5">
        {/* Form: Spans 1 Column */}
        {(!user || user?.role === "user") && (
          <motion.div
            className="col-span-3 md:col-span-1 "
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-neutral-200 p-5 rounded-lg shadow-xl relative">
              {!token && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-black bg-opacity-50 flex items-center justify-center animate__animated animate__fadeIn"
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
              <h3 className="font-semibold text-primary-700 mb-2">
                Leave A Review
              </h3>
              <textarea
                className="w-full p-2 mb-2 border rounded-md resize-none focus:outline-primary-500"
                placeholder="Write your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
              />
              <div className="flex space-x-1 mb-2">
                {Array.from({ length: 5 }, (_, index) => {
                  const starValue = index + 1;
                  return (
                    <motion.div
                      key={starValue}
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaStar
                        size={15}
                        className={`cursor-pointer ${
                          starValue <= (hover || rating)
                            ? "text-secondary-500"
                            : "text-neutral-500"
                        }`}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() =>
                          setRating(starValue === rating ? 0 : starValue)
                        }
                      />
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="btn-primary"
                  disabled={!token || !feedback || rating === 0}
                >
                  Post
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reviews: Spans 2 Columns */}
        <div
          className={`${
            user?.role === "admin" ? "col-span-3" : "col-span-2"
          } mt-5 sm:mt-0`}
        >
          <div
            className={`grid ${
              user?.role === "admin" ? "sm:grid-cols-3" : "sm:grid-cols-2"
            } gap-5`}
          >
            {isLoading
              ? Array.from({ length: 2 }).map((_, index) => (
                  <ReviewCardSkeleton key={index} />
                ))
              : data?.data?.map((review: TReview, index: number) => (
                  <ReviewCard key={index} review={review} index={index} />
                ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <h3 className="text-xs font-bold text-primary-700">
          Overall Rating: {data?.overallRating} / 5
        </h3>
        <motion.button
          onClick={() => navigate("/reviews")}
          className="btn-primary"
        >
          See All Reviews
        </motion.button>
      </div>
    </motion.section>
  );
}
