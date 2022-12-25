import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../../contexts";

const useLogin = () => {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : "正しいメールアドレスを入力してください",
      password: (value) =>
        value.length < 1 ? "パスワードを入力してください" : null,
    },
  });

  const handleLogin = form.onSubmit(async (values) => {
    try {
      await signInWithEmailAndPassword(
        auth as Auth,
        values.email,
        values.password
      );
      navigate("/app");
    } catch (error) {
      showNotification({
        message: "メールアドレスまたはパスワードが正しくありません",
        color: "red",
      });
    }
  });

  const navigateToRegister = () => navigate("/auth/register");

  return { form, handleLogin, navigateToRegister };
};

export default useLogin;
