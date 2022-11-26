import { Accordion, Text } from "@mantine/core";
import { useState } from "react";
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

                //styles added to expanded item
                // "&[data-active]": {
                //   backgroundColor: "#fff",
                // },
              },
            }}
            chevronPosition="right"
            variant="contained"
          >
            {dinnerPlans.map((dinnerPlan) => (
              <DinnerPlan dinnerPlan={dinnerPlan} />
            ))}
          </Accordion>
        </div>
      ) : (
        <Text>登録されている予定はありません</Text>
      )}
    </>
  );
};
