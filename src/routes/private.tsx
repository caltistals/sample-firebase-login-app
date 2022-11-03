import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts";
import UserSettings from "../features/users/components/UserSettings";

const App = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      private route
      <p>your name is "{user?.displayName}"</p>
      <Outlet />
    </div>
  );
};

export const privateRoutes = [
  {
    path: "app",
    element: <App />,
    children: [
      { path: "", element: null },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="app" />,
  },
];
