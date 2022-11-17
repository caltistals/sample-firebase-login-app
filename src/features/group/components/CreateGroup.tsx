import { Button, Paper, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Firestore } from "firebase/firestore";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext, UserContext } from "../../../contexts";
import { UserType } from "../../users/types";
import { createGroup } from "../api/create-group";

const CreateGroup = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { db } = useContext(FirebaseContext);
  const form = useForm({
    initialValues: {
      groupName: "",
    },
    validate: {
      groupName: (value) =>
        value.length < 2 || value.length > 10
          ? "グループ名は2-10文字で設定してください"
          : null,
    },
  });
  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        新しくグループを作成する
      </Text>
      <form
        onSubmit={form.onSubmit(async (values) => {
          if (db && user && setUser) {
            const newUser = await createGroup(
              db as Firestore,
              user as UserType,
              values.groupName
            );
            setUser(newUser);
          }
          navigate("/app");
        })}
      >
        <Stack>
          <TextInput
            label="グループ名"
            placeholder="グループ名を入力"
            {...form.getInputProps("groupName")}
          />
        </Stack>
        <Button type="submit" fullWidth>
          グループを作成
        </Button>
      </form>
      <Text size="lg" weight={500}>
        または
      </Text>
      <Button
        color="cyan.3"
        onClick={() => {
          navigate("/group/join");
        }}
        fullWidth
      >
        既存のグループに参加
      </Button>
    </Paper>
  );
};

export default CreateGroup;
