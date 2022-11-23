import { Accordion, Avatar, Badge, Group, Text } from "@mantine/core";
import { FC } from "react";

type AccordionLabelProps = {
  avatarColor: string;
  badgeLabel: "必要" | "不要" | "遅め" | "未定";
  description: string;
};
const AccordionLabel: FC<AccordionLabelProps> = ({
  avatarColor,
  badgeLabel,
  description,
}) => {
  return (
    <Group noWrap>
      <Avatar color={avatarColor} radius="xl" size="sm" />
      <Badge>{badgeLabel}</Badge>
      {description && <Text>{description}</Text>}
    </Group>
  );
};

export const DinnerPlan: FC<AccordionLabelProps> = ({
  avatarColor,
  badgeLabel,
  description,
}) => {
  return (
    <div>
      DinnerPlan
      <Accordion chevronPosition="right" variant="contained">
        <Accordion.Item value="1">
          <Accordion.Control>
            <AccordionLabel
              avatarColor={avatarColor}
              badgeLabel={badgeLabel}
              description={description}
            />
          </Accordion.Control>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
