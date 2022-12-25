import { Navigate } from "react-router-dom";
import { AuthRoutes } from "../features/auth/routes/AuthRoutes";

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" />,
  },
];
