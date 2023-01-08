import {
  Button,
  Card,
  Container,
  Divider,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
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
    <Container size={400} my={40}>
      <Card withBorder shadow="sm" radius="sm">
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
            <Title order={2} align="center" color="cyan.9">
              グループを作成
            </Title>
            <TextInput
              label="グループ名"
              placeholder="グループ名を入力"
              {...form.getInputProps("groupName")}
            />
            <Button type="submit" color="cyan" fullWidth>
              グループを作成
            </Button>
          </Stack>
        </form>
        <Divider my="sm" label="または" labelPosition="center" />
        <Button
          color="cyan"
          variant="subtle"
          onClick={() => {
            navigate("/group/join");
          }}
          fullWidth
        >
          既存のグループに参加
        </Button>
      </Card>
    </Container>
  );
};

export default CreateGroup;
