import {
  Avatar,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Firestore } from "firebase/firestore";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext, UserContext } from "../../../contexts";
import { UserType } from "../../users/types";
import { findGroup } from "../api/find-group";
import { joinGroup } from "../api/join-group";
import { GroupType } from "../types";

const JoinGroup = () => {
  const [groupData, setGroupData] = useState<GroupType | null>(null);
  const { user, setUser } = useContext(UserContext);
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      groupId: "",
    },
    validate: {
      groupId: (value) =>
        value.length <= 0 ? "グループIDを入力してください" : null,
    },
  });
  return (
    <>
      {!groupData ? (
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={500}>
            グループに参加する
          </Text>
          <form
            onSubmit={form.onSubmit(async (values) => {
              if (db && user && setUser) {
                const group = await findGroup(db as Firestore, values.groupId);
                // todo:該当するグループが無かった際にトーストを表示させるように
                setGroupData(group);
              }
            })}
          >
            <Stack>
              <TextInput
                label="グループID"
                placeholder="グループIDを入力"
                {...form.getInputProps("groupId")}
              />
            </Stack>
            <Button type="submit" fullWidth>
              参加
            </Button>
          </form>
          <Text size="lg" weight={500}>
            または
          </Text>
          <Button
            color="cyan.3"
            onClick={() => {
              navigate("/group/create");
            }}
            fullWidth
          >
            新しくグループを作成
          </Button>
        </Paper>
      ) : (
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={500}>
            グループに参加する
          </Text>
          <Text size="lg" weight={500}>
            {groupData.groupName}
          </Text>
          <Group>
            作成者:
            <Avatar color={groupData.creator.avatarColor} />
            <Text size="lg" weight={500}>
              {groupData.creator.displayName}
            </Text>
          </Group>
          <Button
            color="cyan.3"
            onClick={async () => {
              if (db && user && setUser) {
                const newUser = await joinGroup(
                  db as Firestore,
                  user as UserType,
                  groupData
                );
                setUser(newUser);
                navigate("/app");
              }
            }}
            fullWidth
          >
            参加
          </Button>
        </Paper>
      )}
    </>
  );
};

export default JoinGroup;
