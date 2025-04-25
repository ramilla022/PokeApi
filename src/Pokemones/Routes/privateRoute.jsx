import { Navigate } from "react-router-dom";
import { useAuth } from "../../Auth/authContext";


const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;