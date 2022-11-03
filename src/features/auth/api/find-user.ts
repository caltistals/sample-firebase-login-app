import { collection, Firestore, getDoc, doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { UserType } from "../../users/types";

export const findUser = async (db: Firestore, firebaseUser: User) => {
  const id = firebaseUser.uid;

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
    theUser = { ...(userDoc.data() as UserType) };
  }
  return theUser;
};
