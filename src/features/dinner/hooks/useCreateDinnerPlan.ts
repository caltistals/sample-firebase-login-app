import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React, { useState } from "react";
import { FirebaseContext, UserContext } from "../../../contexts";
import { writeDinnerPlan } from "../api/write-dinner-plan";
import { useContext } from "react";
import { DinnerPlanType } from "../types";
import dayjs from "dayjs";
import "dayjs/locale/ja";

type FormValue = {
  status: "必要" | "不要" | "遅め" | "未定";
  detail: string;
};

const useCreateDinnerPlan = (
  setOpened: React.Dispatch<boolean>,
  date: string
) => {
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

  const handleSubmit = form.onSubmit(async (values: FormValue) => {
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
  });

  const handleClose = () => {
    setOpened(false);
    form.reset();
  };

  return { isLoading, form, handleSubmit, handleClose };
};

export default useCreateDinnerPlan;
