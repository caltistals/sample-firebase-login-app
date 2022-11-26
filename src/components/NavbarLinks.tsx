import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import {
  IconCalendarEvent,
  IconHome,
  IconTruck,
  IconUser,
} from "@tabler/icons";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

type NavbarLinkProps = {
  icon: ReactNode;
  color: string;
  label: string;
  href: string;
};

export const NavbarLink: FC<NavbarLinkProps> = ({
  icon,
  color,
  label,
  href,
}) => {
  return (
    <Link to={href}>
      <UnstyledButton
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.black,
          "&:hover": {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>
          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};

const linkData = [
  {
    icon: <IconHome size={16} />,
    color: "blue",
    label: "ホーム",
    href: "/app",
  },
  {
    icon: <IconCalendarEvent size={16} />,
    color: "orange",
    label: "晩御飯の予定管理",
    href: "/app/dinner",
  },
  {
    icon: <IconTruck size={16} />,
    color: "teal",
    label: "荷物の管理",
    href: "/app/parcel",
  },
  {
    icon: <IconUser size={16} />,
    color: "violet",
    label: "ユーザー",
    href: "/app/user",
  },
];

export const NavbarLinks = () => {
  return (
    <div>
      {linkData.map((link) => (
        <NavbarLink {...link} key={link.label} />
      ))}
    </div>
  );
};
