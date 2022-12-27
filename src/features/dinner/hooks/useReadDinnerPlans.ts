import { Firestore } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext, UserContext } from "../../../contexts";
import { readDinnerPlans } from "../api/read-dinner-plans";
import { DinnerPlanType } from "../types";
import "dayjs/locale/ja";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";

const useReadDinnerPlans = () => {
  const [dinnerPlans, setDinnerPlans] = useState<DinnerPlanType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (user && user.groupId) {
        try {
          const data = await readDinnerPlans(
            db as Firestore,
            user.groupId,
            dayjs(date).format("YYYY-MM-DD")
          );
          if (data?.length) setDinnerPlans(data);
          else setDinnerPlans(null);
        } catch (error) {
          showNotification({
            message: "予定の取得に失敗しました",
            color: "red",
          });
          setDinnerPlans(null);
        }
      }
      setIsLoading(false);
    })();
  }, [date]);

  return { dinnerPlans, isLoading, opened, setOpened, date, setDate };
};

export default useReadDinnerPlans;
