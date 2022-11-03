import { FC, PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router } from "react-router-dom";
import FirebaseApp from "./FirebaseApp";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <FirebaseApp>
        <Router>{children}</Router>
      </FirebaseApp>
    </MantineProvider>
  );
};
