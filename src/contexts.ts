import { Auth } from "firebase/auth";
import { createContext } from "react";
import { UserType } from "./features/users/types";
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
  setUser: ((user: UserType) => void) | null;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: null,
});
