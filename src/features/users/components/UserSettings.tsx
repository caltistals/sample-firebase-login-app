import { useContext, useState } from "react";
import {
  ColorPicker,
  Avatar,
  Container,
  Title,
  Paper,
  TextInput,
  Stack,
  Button,
  Text,
  Group,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FirebaseContext, UserContext } from "../../../contexts";
import { useForm } from "@mantine/form";
import { writeUser } from "../api/write-user";
import { Firestore } from "firebase/firestore";

const UserSettings = () => {
  const colorMap = {
    "#e03131": "red.7",
    "#9775fa": "violet.4",
    "#4dabf7": "blue4",
    "#38d9a9": "teal.4",
    "#a9e34b": "lime.4",
    "#ffd43b": "yellow.4",
    "#fd7e14": "orange.6",
  };
  const [colorValue, onChange] = useState<keyof typeof colorMap>("#e03131");
  const navigate = useNavigate();
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const form = useForm({
    initialValues: {
      username: "",
    },
    validate: {
      username: (value) =>
        value.length < 1 || value.length > 10
          ? "1-10文字で設定してください"
          : null,
    },
  });

  return (
    <Container size={400} my={40}>
      <Paper p="xl" mx="auto" my="lg" withBorder>
        <Title order={2} align="center" color="cyan.5" mb="lg">
          プロフィールを設定
        </Title>
        <form
          onSubmit={form.onSubmit(async (values) => {
            await writeUser(db as Firestore, {
              ...user,
              displayName: values.username,
              avatarColor: colorMap[colorValue],
            });
            navigate("/group/join");
          })}
        >
          <Stack>
            <Text size="md" weight={700}>
              ユーザー名を設定
            </Text>
            <TextInput
              withAsterisk
              label="ユーザー名"
              placeholder="1-10文字"
              {...form.getInputProps("username")}
            />
            <Text size="md" weight={700}>
              アバターの色を設定
            </Text>
            <Group position="center">
              <Avatar
                color={colorMap[colorValue]}
                radius="xl"
                variant="filled"
              />
            </Group>

            <ColorPicker
              fullWidth
              format="hex"
              value={colorValue}
              onChange={onChange as any}
              withPicker={false}
              swatches={[...Object.keys(colorMap)]}
            />
            <Button type="submit" color="cyan.6" mt="xl">
              次へ
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default UserSettings;
