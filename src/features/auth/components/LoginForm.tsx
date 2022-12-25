import {
  TextInput,
  Paper,
  Container,
  Title,
  PasswordInput,
  Button,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../../contexts";

const LoginForm = () => {
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

  return (
    <Container size={400} my={40}>
      <Title align="center" color="cyan.9">
        ログイン
      </Title>
      <Paper p="xl" mx="auto" my="lg" withBorder>
        <form
          onSubmit={form.onSubmit(async (values) => {
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
          })}
        >
          <TextInput
            withAsterisk
            label="メールアドレス"
            placeholder="xxx@example.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            withAsterisk
            label="パスワード"
            placeholder="●●●●●●"
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button type="submit" color="cyan" mt="xl" fullWidth>
            ログイン
          </Button>
          <Divider my="sm" label="または" labelPosition="center" />
          <Button
            variant="subtle"
            color="cyan"
            fullWidth
            onClick={() => navigate("/auth/register")}
          >
            新規登録
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
