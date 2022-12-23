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
import { showNotification } from "@mantine/notifications";
import React, { useState } from "react";
import { FirebaseContext, UserContext } from "../../../contexts";
import { writeDinnerPlan } from "../api/write-dinner-plan";
import { useContext } from "react";
import { DinnerPlanType } from "../types";
import dayjs from "dayjs";
import "dayjs/locale/ja";

type Props = {
  opened: boolean;
  setOpened: React.Dispatch<boolean>;
  date: string;
};

type FormValue = {
  status: "必要" | "不要" | "遅め" | "未定";
  detail: string;
};

export const CreateDinnerPlanModal = ({ opened, setOpened, date }: Props) => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValue>({
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
        onClose={() => {
          setOpened(false);
          form.reset();
        }}
        title="晩御飯の予定を追加する"
      >
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form
          onSubmit={form.onSubmit(async (values) => {
            setIsLoading(true);
            try {
              if (user && db) {
                const newDinnerPlan: DinnerPlanType = {
                  status: values.status,
                  description: values.detail,
                  user: user,
                };
                await writeDinnerPlan(
                  db,
                  newDinnerPlan,
                  dayjs(date).format("YYYY-MM-DD")
                );
                setIsLoading(false);
                showNotification({
                  message: "作成に成功しました！",
                  color: "green",
                });
                setOpened(false);
              }
            } catch (error) {
              showNotification({
                message: "エラーが発生しました。",
                color: "red",
              });
              setIsLoading(false);
            }
          })}
        >
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
