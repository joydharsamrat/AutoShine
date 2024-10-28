import { TiTick } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const transactionId = params.get("transactionId");
  const navigate = useNavigate();
  console.log(transactionId);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-primary-700 to-secondary-700">
      <div className="flex flex-col justify-center items-center gap-5 bg-white shadow-md rounded-lg p-8 text-center max-w-lg ">
        <h1 className="text-3xl font-bold text-green-600 ">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 ">
          Thank you for your booking! Your payment has been processed
          successfully.
        </p>
        <div className="bg-green-600 p-2 inline-block rounded-full">
          <TiTick className="text-white text-5xl" />
        </div>

        {transactionId && (
          <div className="bg-gray-100 p-4 rounded-md ">
            <h2 className="text-xl font-semibold text-gray-700">
              Transaction ID
            </h2>
            <p className="text-gray-800">{transactionId}</p>
          </div>
        )}
        <button className="btn-primary" onClick={() => navigate("/")}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Success;
