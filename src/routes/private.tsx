import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "../components/Layout";
import { UserContext } from "../contexts";
import { DinnerPlan } from "../features/dinner/components/DinnerPlan";
import { DinnerPlans } from "../features/dinner/components/DinnerPlans";
import { DinnerPlansWithCalendar } from "../features/dinner/components/DinnerPlansWithCalendar";
import { DinnerRoutes } from "../features/dinner/routes/DinnerRoutes";
import { GroupInformationRoutes } from "../features/group/routes/GroupInformationRoute";
import UserSettings from "../features/users/components/UserSettings";
import { UserProfileRoutes } from "../features/users/routes/UserProfileRoutes";

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <Layout>
      <div>
        <Outlet />
      </div>
    </Layout>
  );
};

const Home = () => {
  return <DinnerPlans />;
};

export const privateRoutes = [
  {
    path: "app",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "dinner/*", element: <DinnerRoutes /> },
      { path: "user/*", element: <UserProfileRoutes /> },
      { path: "group/*", element: <GroupInformationRoutes /> },
      { path: "*", element: <Navigate to="" /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="app" />,
  },
];
