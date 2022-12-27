import { Navigate, Route, Routes } from "react-router-dom";
import GroupInformation from "../components/GroupInformation";

export const GroupInformationRoutes = () => {
  return (
    <Routes>
      <Route path="information" element={<GroupInformation />} />
      <Route path="*" element={<Navigate to="/app/group/information" />} />
    </Routes>
  );
};
