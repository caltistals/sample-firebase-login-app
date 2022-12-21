import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  SegmentedControl,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";

type Props = {
  opened: boolean;
  setOpened: React.Dispatch<boolean>;
  date: string;
};

export const CreateDinnerPlanModal = ({ opened, setOpened, date }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      status: "必要",
      detail: "",
    },
    validate: {
      detail: (value) =>
        value.length > 140 ? "140文字以内で入力してください" : null,
    },
  });
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="晩御飯の予定を追加する"
      >
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form
          onSubmit={form.onSubmit((values) => {
            setIsLoading(true);
            console.log(values);
            setIsLoading(false);
            setOpened(false);
          })}
        >
          <Text mb={20}>日付：{date}</Text>
          <SegmentedControl
            data={[
              { label: "必要", value: "必要" },
              { label: "不要", value: "不要" },
              { label: "遅め", value: "遅め" },
              { label: "未定", value: "未定" },
            ]}
            mb={20}
            {...form.getInputProps("status")}
          />
          <Textarea
            label="詳細"
            placeholder="詳細を入力（任意）"
            mb={20}
            {...form.getInputProps("detail")}
          />
          <Group position="right">
            <Button type="submit">予定を追加</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};
