import {
  Avatar,
  Container,
  Title,
  Stack,
  Text,
  Group,
  Card,
  Center,
  Loader,
  Divider,
  CopyButton,
  ActionIcon,
  Skeleton,
} from "@mantine/core";
import { IconClipboard, IconClipboardCheck } from "@tabler/icons";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import useGroupInformation from "../hooks/useGroupInformation";

const GroupInformation = () => {
  const { groupData, isLoading } = useGroupInformation();

  return (
    <Container size={500}>
      <Card withBorder shadow="sm" radius="sm">
        <Title order={2} align="center" color="dark.3">
          グループ情報
        </Title>
        <Stack>
          {isLoading && <LoadingSkeleton quantity={2} my={40} />}
          {groupData ? (
            <>
              <Card>
                <Divider my="md" label="グループ名" color="gray" />
                <Text size="xl">{groupData.groupName}</Text>
                <Divider my="md" label="所属ユーザー" color="gray" />
                <Stack>
                  {groupData.users.map((user) => {
                    if (user.displayName && user.displayName) {
                      return (
                        <Group>
                          <Avatar
                            color={user.avatarColor}
                            radius="xl"
                            variant="filled"
                          />
                          <Text size="lg">{user.displayName}</Text>
                        </Group>
                      );
                    } else return null;
                  })}
                </Stack>
                <Divider my="md" label="グループID" color="gray" />
                <Group>
                  <Text size="lg">{groupData.groupId}</Text>
                  <CopyButton value={groupData.groupId}>
                    {({ copied, copy }) => (
                      <ActionIcon
                        size={26}
                        onClick={copy}
                        color={copied ? "lime" : "cyan"}
                      >
                        {copied ? <IconClipboardCheck /> : <IconClipboard />}
                      </ActionIcon>
                    )}
                  </CopyButton>
                </Group>
              </Card>
            </>
          ) : null}
        </Stack>
      </Card>
    </Container>
  );
};

export default GroupInformation;
