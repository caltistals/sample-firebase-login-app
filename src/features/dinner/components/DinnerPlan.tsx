import { Accordion, Avatar, Badge, Group, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { DinnerPlanType } from "../types";

type AccordionProps = {
  avatarColor: string;
  username: string;
  badgeLabel: "必要" | "不要" | "遅め" | "未定";
  description?: string;
};
const AccordionLabel: FC<AccordionProps> = ({
  avatarColor,
  badgeLabel,
  username,
  description,
}) => {
  return (
    <Group noWrap>
      <Avatar color={avatarColor} radius="xl" size="md" />
      <Text>{username}</Text>
      <Badge color="green" size="lg" radius="sm">
        {badgeLabel}
      </Badge>
      {description && <Text>{description}</Text>}
    </Group>
  );
};

const AccordionPanel: FC<AccordionProps> = ({
  avatarColor,
  badgeLabel,
  username,
  description,
}) => {
  return (
    <Accordion.Panel>
      <Stack>
        <Group>
          <Avatar color={avatarColor} radius="xl" size="md" />
          <Text>{username}</Text>
        </Group>
        <Badge color="green" size="lg" radius="sm">
          {badgeLabel}
        </Badge>
        {description && <Text>{description}</Text>}
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
