import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function AdminPrivateRoute() {
  const [state, dispatch] = useContext(UserContext);

  if (state.user.status === true) {
    return <Navigate to="/listtransaksiadmin" />;
  }
  return <Outlet />;
}
