import { useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { showNotification } from "@mantine/notifications";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleClick = async () => {
    signOut(auth)
      .then(() => {
        navigate("/auth/login");
      })
      .catch(() => {
        showNotification({
          message: "ログアウトに失敗しました",
          color: "red",
        });
      });
  };

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
          onClick={handleClick}
        >
          ログアウト
        </Button>
      </Stack>
    </Container>
  );
};

export default UserProfile;
