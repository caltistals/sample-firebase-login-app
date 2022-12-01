import { Accordion, Center, Container, Group, Text } from "@mantine/core";
import { Firestore } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext, UserContext } from "../../../contexts";
import { readDinnerPlans } from "../api/read-dinnerPlans";
import { DinnerPlanType } from "../types";
import { DinnerPlan } from "./DinnerPlan";
import "dayjs/locale/ja";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";

const DINNERPLANS: DinnerPlanType[] = [
  {
    status: "不要",
    description: "外食します",
    user: {
      id: "11112341",
      displayName: "aaaaaa",
      avatarColor: "green.3",
    },
  },
  {
    status: "遅め",
    description: "仕事で遅れます",
    user: {
      id: "111123423",
      displayName: "abcde",
      avatarColor: "blue.3",
    },
  },
  {
    status: "必要",
    description: "",
    user: {
      id: "1112321",
      displayName: "oooook",
      avatarColor: "red.3",
    },
  },
];

export const DinnerPlansWithCalendar = () => {
  const [dinnerPlans, setDinnerPlans] = useState<DinnerPlanType[] | null>(null);
  const [date, setDate] = useState(new Date());
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    setDinnerPlans(DINNERPLANS);
    if (user && user.groupId) {
      readDinnerPlans(db as Firestore, user.groupId, "2022-11-27");
    }
  }, []);

  return (
    <>
      <Center mb="xl">
        <Calendar
          firstDayOfWeek="sunday"
          value={date}
          onChange={setDate}
          locale="ja"
        />
      </Center>
      <Text size="xl" weight={700}>
        {dayjs(date).format("YYYY年MM月DD日")}の予定
      </Text>

      {dinnerPlans ? (
        <div>
          <Accordion
            styles={{
              item: {
                // styles added to all items
                backgroundColor: "#fff",

                // // styles added to expanded item
                // "&[data-active]": {
                //   backgroundColor: "#ffd803",
                // },
              },
            }}
            chevronPosition="right"
          >
            {dinnerPlans.map((dinnerPlan) => (
              <DinnerPlan dinnerPlan={dinnerPlan} key={dinnerPlan.user.id} />
            ))}
          </Accordion>
        </div>
      ) : (
        <Text>登録されている予定はありません</Text>
      )}
    </>
  );
};
