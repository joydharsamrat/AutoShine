/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";
import { useUnsubscribeMutation } from "../../redux/features/newsletter/newsletter.api";
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "animate.css";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [unsubscribe, { isError, isSuccess, isLoading }] =
    useUnsubscribeMutation();

  const handleUnsubscribe = async () => {
    if (!token) return;
    try {
      await unsubscribe(token).unwrap();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="unsubscribe-page flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full animate__animated animate__fadeIn">
        {isLoading ? (
          <div className="text-center animate__animated animate__pulse animate__infinite">
            <FaSpinner className="animate-spin text-blue-500 text-4xl mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700">
              Processing your request...
            </p>
          </div>
        ) : isSuccess ? (
          <div className="text-center animate__animated animate__fadeInUp">
            <FaCheckCircle className="text-green-600 text-5xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Unsubscribed Successfully!
            </h1>
            <p className="text-gray-600">
              You’ve been successfully removed from our newsletter. We’re sorry
              to see you go!
            </p>
          </div>
        ) : isError ? (
          <div className="text-center animate__animated animate__shakeX">
            <FaExclamationCircle className="text-red-600 text-5xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Error Unsubscribing
            </h1>
            <p className="text-gray-600">
              We couldn’t process your request. Please try again later.
            </p>
          </div>
        ) : (
          <div className="text-center animate__animated animate__fadeIn">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Unsubscribe
            </h1>
            <p className="text-gray-600 mb-6">
              Are you sure you want to unsubscribe from our newsletter? You
              won’t receive any further updates or offers from us.
            </p>
            <button
              onClick={handleUnsubscribe}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none transition duration-300 animate__animated animate__pulse animate__infinite"
            >
              Confirm Unsubscribe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
