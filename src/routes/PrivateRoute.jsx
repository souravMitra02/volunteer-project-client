import { use } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext/AuthContext";


const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center h-[50vh]">
  <span className="loading loading-spinner loading-lg text-primary"></span>
</div>
;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
