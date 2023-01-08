import { Accordion, ActionIcon, Center, Loader, Text } from "@mantine/core";
import { DinnerPlan } from "./DinnerPlan";
import "dayjs/locale/ja";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { IconPlus } from "@tabler/icons";
import { CreateDinnerPlanModal } from "./CreateDinnerPlanModal";
import useReadDinnerPlans from "../hooks/useReadDinnerPlans";

export const DinnerPlansWithCalendar = () => {
  const { dinnerPlans, isLoading, opened, setOpened, date, setDate } =
    useReadDinnerPlans();

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
      <>
            {isLoading && <LoadingSkeleton quantity={2} />}
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
      <CreateDinnerPlanModal
        opened={opened}
        setOpened={setOpened}
        date={dayjs(date).format("YYYY-MM-DD")}
      />
      <ActionIcon
        style={{
          position: "fixed",
          width: "60px",
          height: "60px",
          bottom: "40px",
          right: "40px",
        }}
        radius="xl"
        variant="filled"
        onClick={() => setOpened(true)}
        color="cyan"
      >
        <IconPlus size={30} />
      </ActionIcon>
    </>
  );
};
