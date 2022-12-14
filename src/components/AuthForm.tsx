import {
  TextInput,
  Paper,
  Container,
  Title,
  PasswordInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const AuthForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : "正しいメールアドレスを入力してください",
      password: (value) =>
        value.length < 6 ? "6文字以上のパスワードを入力してください" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "パスワードが一致していません" : null,
    },
  });

  return (
    <Container size={400} my={40}>
      <Title align="center" color="cyan.9">
        新規登録
      </Title>
      <Paper p="xl" mx="auto" my="lg" withBorder>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
          <PasswordInput
            withAsterisk
            label="パスワードの確認"
            placeholder="●●●●●●"
            mt="md"
            {...form.getInputProps("confirmPassword")}
          />
          <Button type="submit" color="cyan.6" mt="xl" fullWidth>
            新規登録
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthForm;
