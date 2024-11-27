import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/features/hooks";
import { getToken } from "../../redux/features/auth/authSlice";

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAppSelector(getToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthRoute;
