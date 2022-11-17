import { collection, Firestore, getDoc, doc, setDoc } from "firebase/firestore";
import { UserType } from "../types";

export const writeUser = async (db: Firestore, newUser: UserType) => {
  const id = newUser.id;

  let theUser: UserType | null = null;
  const userDoc = await getDoc(doc(collection(db, "users"), id));
  if (!userDoc.exists()) {
    const user: UserType = {
      id: id,
    };
    await setDoc(userDoc.ref, {
      ...user,
    });
    theUser = { ...user };
  } else {
    await setDoc(userDoc.ref, {
      ...newUser,
    });
    theUser = { ...newUser };
  }
  return theUser;
};
