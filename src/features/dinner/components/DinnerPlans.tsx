import { Accordion, Text } from "@mantine/core";
import { Firestore } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext, UserContext } from "../../../contexts";
import { readDinnerPlans } from "../api/read-dinnerPlans";
import { DinnerPlanType } from "../types";
import { DinnerPlan } from "./DinnerPlan";

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

export const DinnerPlans = () => {
  const [dinnerPlans, setDinnerPlans] = useState<DinnerPlanType[] | null>(null);
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
      {dinnerPlans ? (
        <div>
          DinnerPlan
          <Accordion
            styles={{
              item: {
                // styles added to all items
                backgroundColor: "#fff",

                // styles added to expanded item
                "&[data-active]": {
                  backgroundColor: "#ffd803",
                },
              },
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#ffd803",
              },
            }}
            chevronPosition="right"
            variant="contained"
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
