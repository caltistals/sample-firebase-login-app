import { Button, Paper, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const CreateGroup = () => {
  const form = useForm({
    initialValues: {
      groupName: "",
    },
    validate: {
      groupName: (value) =>
        value.length <= 1 && value.length > 10
          ? "グループ名は1-10文字で設定してください"
          : null,
    },
  });
  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        新しくグループを作成する
      </Text>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values.groupName);
        })}
      >
        <Stack>
          <TextInput
            label="グループ名"
            placeholder="グループ名を入力"
            {...form.getInputProps("groupId")}
          />
        </Stack>
        <Button type="submit" fullWidth>
          グループを作成
        </Button>
      </form>
      <Text size="lg" weight={500}>
        または
      </Text>
      <Button color="cyan.3" onClick={() => {}} fullWidth>
        既存のグループに参加
      </Button>
    </Paper>
  );
};

export default CreateGroup;
