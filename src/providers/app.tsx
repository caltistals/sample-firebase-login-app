import { FC, PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router } from "react-router-dom";
import FirebaseApp from "./FirebaseApp";
import { NotificationsProvider } from "@mantine/notifications";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <FirebaseApp>
          <Router>{children}</Router>
        </FirebaseApp>
      </NotificationsProvider>
    </MantineProvider>
  );
};
