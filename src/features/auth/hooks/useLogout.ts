import { showNotification } from "@mantine/notifications";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts";
import { auth } from "../../../firebase-config";

const useLogout = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        navigate("/auth/login");
      })
      .catch(() => {
        showNotification({
          message: "ログアウトに失敗しました",
          color: "red",
        });
      });
  };

  return { user, handleLogout };
};

export default useLogout;
