import { Route, Routes } from "react-router-dom";
import { DinnerPlansWithCalendar } from "../components/DinnerPlansWithCalendar";

export const DinnerRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<DinnerPlansWithCalendar />} />
    </Routes>
  );
};
