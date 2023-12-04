import { useAuth } from "../context/auth.context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, onlyBiz = false }) => {
  const { user } = useAuth();
  if (!user || (user && onlyBiz && !user.isBusiness)) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};
export default ProtectedRoute;
