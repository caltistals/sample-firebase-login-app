import { FC, useEffect, useState } from "react";

import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase-config";
import { UserType } from "../features/users/types";
import { findUser } from "../features/auth/api/find-user";
import { FirebaseContext, UserContext } from "../contexts";

const FirebaseApp: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const theUser = await findUser(db, firebaseUser);
        setUser(theUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth, db }}>
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default FirebaseApp;
