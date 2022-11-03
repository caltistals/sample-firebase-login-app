import { Navigate } from "react-router-dom";
import { SetProfileRoutes } from "../features/users/routes/SetProfileRoutes";
export const profileUndefinedRoutes = [
  {
    path: "/user/profile/*",
    element: <SetProfileRoutes />,
  },
  {
    path: "*",
    element: <Navigate to="user/profile/settings" />,
  },
];
