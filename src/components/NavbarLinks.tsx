import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import {
  IconCalendarEvent,
  IconHome,
  IconTruck,
  IconUser,
  IconUsers,
} from "@tabler/icons";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

type NavbarLinkProps = {
  icon: ReactNode;
  color: string;
  label: string;
  href: string;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavbarLinksProps = {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarLink: FC<NavbarLinkProps> = ({
  icon,
  color,
  label,
  href,
  setOpened,
}) => {
  return (
    <Link to={href} style={{ textDecoration: "none" }}>
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
        onClick={() => setOpened(false)}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>
          <Text size="md">{label}</Text>
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
    label: "晩御飯の予定",
    href: "/app/dinner",
  },
  // {
  //   icon: <IconTruck size={16} />,
  //   color: "teal",
  //   label: "荷物",
  //   href: "/app/parcel",
  // },
  {
    icon: <IconUsers size={16} />,
    color: "green",
    label: "グループ情報",
    href: "/app/group/information",
  },
  {
    icon: <IconUser size={16} />,
    color: "violet",
    label: "ユーザー情報",
    href: "/app/user",
  },
];

export const NavbarLinks = ({ setOpened }: NavbarLinksProps) => {
  return (
    <div>
      {linkData.map((link) => (
        <NavbarLink {...link} key={link.label} setOpened={setOpened} />
      ))}
    </div>
  );
};
