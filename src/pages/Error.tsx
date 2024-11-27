import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600">Something Went Wrong</h1>

      <a href="/" className="btn-primary mt-5">
        Back to Home
      </a>
    </div>
  );
};

export default ErrorPage;
