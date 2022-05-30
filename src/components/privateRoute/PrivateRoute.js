import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import User from "../user/User";

const PrivateRoute = () => {
  const location = useLocation();
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  return <User {...location.state} />;
};

export default PrivateRoute;
