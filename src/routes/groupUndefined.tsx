import { Navigate } from "react-router-dom";
import { SetGroupRoutes } from "../features/group/routes/SetGroupRoutes";
export const groupUndefinedRoutes = [
  {
    path: "/group/*",
    element: <SetGroupRoutes />,
  },
  {
    path: "*",
    element: <Navigate to="group/join" />,
  },
];
