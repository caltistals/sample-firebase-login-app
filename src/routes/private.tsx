import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts";
import UserSettings from "../features/user/components/UserSettings";

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

const Test = () => {
  return <div>test</div>;
};

export const privateRoutes = [
  {
    path: "app",
    element: <App />,
    children: [
      { path: "", element: <UserSettings /> },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="app" />,
  },
];
