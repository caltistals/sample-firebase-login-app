import { AuthRoutes } from "../features/auth/routes/AuthRoutes";

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];
