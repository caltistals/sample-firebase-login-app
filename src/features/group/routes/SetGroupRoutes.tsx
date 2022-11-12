import { Route, Routes } from "react-router-dom";
import JoinGroup from "../components/JoinGroup";

export const SetGroupRoutes = () => {
  return (
    <Routes>
      <Route path="join" element={<JoinGroup />} />
      <Route path="create" element={null} />
    </Routes>
  );
};
