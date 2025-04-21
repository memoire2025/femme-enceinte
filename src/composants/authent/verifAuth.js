import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("accessToken-femme-enceinte");

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;