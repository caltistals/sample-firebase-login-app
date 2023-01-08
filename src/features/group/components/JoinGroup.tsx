import {
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
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
      <Container size={400} my={40}>
        <Card withBorder shadow="sm" radius="sm">
          <Stack>
            <Title order={2} align="center" color="cyan.9">
              グループに参加
            </Title>

            {groupData ? (
              <>
                <Stack>
                  <Text size="lg" weight={500}>
                    {groupData.groupName}
                  </Text>
                  <Group>
                    作成者:
                    <Avatar radius="xl" color={groupData.creator.avatarColor} />
                    <Text size="lg" weight={500}>
                      {groupData.creator.displayName}
                    </Text>
                  </Group>
                  <Button
                    color="cyan"
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
                </Stack>
                <Button
                  color="cyan"
                  variant="subtle"
                  onClick={() => {
                    setGroupData(null);
                  }}
                  fullWidth
                >
                  戻る
                </Button>
              </>
            ) : (
              <form
                onSubmit={form.onSubmit(async (values) => {
                  if (db && user && setUser) {
                    const group = await findGroup(
                      db as Firestore,
                      values.groupId
                    );
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
                  <Button type="submit" color="cyan" fullWidth>
                    参加
                  </Button>
                </Stack>
                <Divider my="sm" label="または" labelPosition="center" />
                <Button
                  color="cyan"
                  variant="subtle"
                  onClick={() => {
                    navigate("/group/create");
                  }}
                  fullWidth
                >
                  新しくグループを作成
                </Button>
              </form>
            )}
          </Stack>
        </Card>
      </Container>
    </>
  );
};

export default JoinGroup;
