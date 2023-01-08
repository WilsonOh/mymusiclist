import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ redirect, children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate replace to={redirect} />;
};

export default ProtectedRoute;
