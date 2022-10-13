import React from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Center,
  Group,
  Paper,
  Container,
  Title,
  PasswordInput,
  Button,
} from "@mantine/core";

const AuthForm = () => {
  return (
    <Container size={400} my={40}>
      <Title align="center" color="cyan.9">
        Welcome back
      </Title>
      <Paper p="xl" mx="auto" my="md" withBorder>
        <form>
          <TextInput
            withAsterisk
            label="メールアドレス"
            placeholder="xxx@example.com"
            required
          />
          <PasswordInput
            withAsterisk
            label="パスワード"
            placeholder="●●●●●●"
            mt="md"
          />
          <Button type="submit" color="cyan.6" mt="xl" fullWidth>
            ログイン
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthForm;
