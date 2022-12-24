import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  SegmentedControl,
  Text,
  Textarea,
} from "@mantine/core";

import React from "react";

import dayjs from "dayjs";
import "dayjs/locale/ja";
import useCreateDinnerPlan from "../hooks/useCreateDinnerPlan";

type Props = {
  opened: boolean;
  setOpened: React.Dispatch<boolean>;
  date: string;
};

export const CreateDinnerPlanModal = ({ opened, setOpened, date }: Props) => {
  const { isLoading, form, handleSubmit, handleClose } = useCreateDinnerPlan(
    setOpened,
    date
  );
  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title="晩御飯の予定を追加する"
      >
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form onSubmit={handleSubmit}>
          <Text mb={20}>日付：{dayjs(date).format("YYYY年MM月DD日")}</Text>
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
