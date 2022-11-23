import { Accordion, Avatar, Badge, Group, Stack, Text } from "@mantine/core";
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
      <Avatar color={avatarColor} radius="xl" size="md" />
      <Badge color="green" size="lg" radius="sm">
        {badgeLabel}
      </Badge>
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
        <Accordion.Item value="1">
          <Accordion.Control>
            <AccordionLabel
              avatarColor={avatarColor}
              badgeLabel={badgeLabel}
              description={description}
            />
          </Accordion.Control>
          <Accordion.Panel>
            <Stack>
              <Avatar color={avatarColor} radius="xl" size="md" />
              <Badge color="green" size="lg" radius="sm">
                {badgeLabel}
              </Badge>
              {description && <Text>{description}</Text>}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
