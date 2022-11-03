import { Route, Routes } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<RegisterForm />} />
    </Routes>
  );
};
