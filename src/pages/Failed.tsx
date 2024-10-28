import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Failed = () => {
  const navigate = useNavigate();
  return (
    <div className="flex  items-center  justify-center min-h-screen bg-gradient-to-tr from-primary-700 to-secondary-700">
      <div className="flex flex-col justify-center items-center gap-5 bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 ">Payment Failed</h1>
        <p className="text-lg text-gray-700 ">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
        <div className="bg-red-600 p-2 inline-block rounded-full">
          <FaTimes className="text-white text-5xl" />
        </div>
        <p className="text-gray-500 mb-4">
          If the problem persists, please contact our support team.
        </p>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Failed;
