import { Route, Routes } from "react-router-dom";
import UserSettings from "../components/UserSettings";

export const SetProfileRoutes = () => {
  return (
    <Routes>
      <Route path="settings" element={<UserSettings />} />
    </Routes>
  );
};
