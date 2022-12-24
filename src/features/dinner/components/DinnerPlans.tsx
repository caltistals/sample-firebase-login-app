import { Accordion, Center, Loader, Text } from "@mantine/core";
import { DinnerPlan } from "./DinnerPlan";
import dayjs from "dayjs";
import useReadDinnerPlans from "../hooks/useReadDinnerPlans";

export const DinnerPlans = () => {
  const { dinnerPlans, isLoading } = useReadDinnerPlans();
  const date = new Date();
  return (
    <>
      <Text size="xl" mb="md" weight={700}>
        {dayjs(date).format("YYYY年MM月DD日")}の予定
      </Text>
      {isLoading && (
        <Center>
          <Loader />
        </Center>
      )}
      {!isLoading && dinnerPlans ? (
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
