import {
  Accordion,
  ActionIcon,
  Card,
  Center,
  Container,
  Group,
  Loader,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { DinnerPlan } from "./DinnerPlan";
import dayjs from "dayjs";
import useReadDinnerPlans from "../hooks/useReadDinnerPlans";
import { IconAlertCircle } from "@tabler/icons";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

export const DinnerPlans = () => {
  const { dinnerPlans, isLoading } = useReadDinnerPlans();
  const date = new Date();
  return (
    <>
      <Container fluid>
        <Card withBorder shadow="sm" radius="sm">
          <Card.Section withBorder inheritPadding py="xs" mb="xs">
            <Title order={3} color="dark.3" weight={700}>
              晩御飯の予定
            </Title>
            <Text color="dark.2">{dayjs(date).format("YYYY年MM月DD日")}</Text>
          </Card.Section>

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
                variant="contained"
              >
                {dinnerPlans.map((dinnerPlan) => (
                  <DinnerPlan
                    dinnerPlan={dinnerPlan}
                    key={dinnerPlan.user.id}
                  />
                ))}
              </Accordion>
            </div>
          ) : (
            <>
              {!isLoading && (
                <Group>
                  <ActionIcon variant="transparent">
                    <IconAlertCircle size={20} />
                  </ActionIcon>
                  <Text color="dark.2">予定が登録されていません</Text>
                </Group>
              )}
            </>
          )}
        </Card>
      </Container>
    </>
  );
};
