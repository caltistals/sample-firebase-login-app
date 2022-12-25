import {
  TextInput,
  Paper,
  Container,
  Title,
  PasswordInput,
  Button,
  Divider,
} from "@mantine/core";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const { form, handleLogin, navigateToRegister } = useLogin();

  return (
    <Container size={400} my={40}>
      <Title align="center" color="cyan.9">
        ログイン
      </Title>
      <Paper p="xl" mx="auto" my="lg" withBorder>
        <form onSubmit={handleLogin}>
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
            onClick={navigateToRegister}
          >
            新規登録
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
