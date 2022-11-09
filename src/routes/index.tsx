import { useRoutes } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts";
import { privateRoutes } from "./private";
import { publicRoutes } from "./public";
import { profileUndefinedRoutes } from "./profileUndefined";
import { groupUndefinedRoutes } from "./groupUndefined";

export const AppRoutes = () => {
  const { user } = useContext(UserContext);

  let routes = user ? privateRoutes : publicRoutes;
  if (!user?.displayName) {
    routes = profileUndefinedRoutes;
  } else if (!user?.groupId) {
    routes = groupUndefinedRoutes;
  }

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
