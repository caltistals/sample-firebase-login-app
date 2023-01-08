import { Accordion, Avatar, Badge, Group, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { DinnerPlanType } from "../types";

type AccordionProps = {
  avatarColor: string;
  username: string;
  badgeLabel: "必要" | "不要" | "遅め" | "未定";
  description?: string;
};

const getBadgeColor = (key: AccordionProps["badgeLabel"]) =>
  new Map<AccordionProps["badgeLabel"], string>([
    ["不要", "red"],
    ["必要", "green"],
    ["遅め", "orange"],
    ["未定", "gray"],
  ]).get(key);

const AccordionLabel: FC<AccordionProps> = ({
  avatarColor,
  badgeLabel,
  username,
}) => {
  const badgeColor = getBadgeColor(badgeLabel);
  return (
    <Group noWrap>
      <Avatar color={avatarColor} radius="xl" size="md" />
      <Text>{username}</Text>
      <Badge color={badgeColor} size="lg" radius="sm">
        {badgeLabel}
      </Badge>
    </Group>
  );
};

const AccordionPanel: FC<AccordionProps> = ({ description }) => {
  return (
    <Accordion.Panel>
      <Stack>
        <Text color="dark.2" size="sm">
          詳細
        </Text>
        <Text color={description ? "dark" : "dark.2"}>
          {description ? description : "詳細はありません"}
        </Text>
      </Stack>
    </Accordion.Panel>
  );
};

type DinnerPlanProps = {
  dinnerPlan: DinnerPlanType;
};

export const DinnerPlan: FC<DinnerPlanProps> = ({ dinnerPlan }) => {
  const { user, status, description } = dinnerPlan;
  return (
    <Accordion.Item value={user.id as string}>
      <Accordion.Control>
        <AccordionLabel
          avatarColor={user.avatarColor as string}
          username={user.displayName as string}
          badgeLabel={status}
          description={description}
        />
      </Accordion.Control>
      <AccordionPanel
        avatarColor={user.avatarColor as string}
        username={user.displayName as string}
        badgeLabel={status}
        description={description}
      />
    </Accordion.Item>
  );
};
