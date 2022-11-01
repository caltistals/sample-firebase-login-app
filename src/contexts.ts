import { Auth } from "firebase/auth";
import { createContext } from "react";
import { UserType } from "./services/models/user";
import { Firestore } from "firebase/firestore";

type FirebaseContextValue = {
  auth: Auth | null;
  db: Firestore | null;
};

export const FirebaseContext = createContext<FirebaseContextValue>({
  auth: null,
  db: null,
});

type UserContextValue = {
  user: UserType | null;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
});
