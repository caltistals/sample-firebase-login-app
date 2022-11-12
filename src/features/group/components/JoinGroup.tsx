import { Button, Paper, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

const JoinGroup = () => {
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
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        グループに参加する
      </Text>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values.groupId);
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
  );
};

export default JoinGroup;
