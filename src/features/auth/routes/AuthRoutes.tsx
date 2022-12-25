import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<RegisterForm />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
