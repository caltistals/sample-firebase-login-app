import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "../components/Layout";
import { UserContext } from "../contexts";
import UserSettings from "../features/users/components/UserSettings";

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <Layout>
      <div>
        private route
        <p>your name is "{user?.displayName}"</p>
        <p>this group's id is{user?.groupId}</p>
        <Outlet />
      </div>
    </Layout>
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
