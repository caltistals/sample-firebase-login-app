import { Route, Routes } from "react-router-dom";
import UserProfile from "../components/UserProfile";

export const UserProfileRoutes = () => (
  <Routes>
    <Route path="" element={<UserProfile />} />
  </Routes>
);
