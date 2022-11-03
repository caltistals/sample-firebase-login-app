import { useRoutes } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts";
import { privateRoutes } from "./private";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const userContext = useContext(UserContext);

  const routes = userContext.user ? privateRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
