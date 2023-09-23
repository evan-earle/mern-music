import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoutes() {
  const { auth } = useAuth();
  if (auth === undefined) {
    return "loading...";
  }

  return auth === true ? <Outlet></Outlet> : <Navigate to="/auth"></Navigate>;
}

export default PrivateRoutes;
