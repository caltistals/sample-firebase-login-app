import {
  Avatar,
  Container,
  Title,
  Stack,
  Button,
  Text,
  Group,
  Card,
} from "@mantine/core";

import useLogout from "../../auth/hooks/useLogout";

const UserProfile = () => {
  const { user, handleLogout } = useLogout();

  return (
    <Container size={400} my={40}>
      <Title order={2} align="center" color="cyan.5" mb="lg">
        ユーザー情報
      </Title>
      <Stack>
        {user && user.avatarColor && user.displayName ? (
          <>
            <Card>
              <Stack>
                <Group position="center">
                  <Avatar
                    color={user.avatarColor}
                    radius="xl"
                    variant="filled"
                  />
                </Group>
                <Group position="center">
                  <Text size="xl">{user.displayName}</Text>
                </Group>
              </Stack>
            </Card>
          </>
        ) : null}
        <Button
          type="submit"
          color="red"
          mt="xl"
          variant="outline"
          onClick={handleLogout}
        >
          ログアウト
        </Button>
      </Stack>
    </Container>
  );
};

export default UserProfile;
