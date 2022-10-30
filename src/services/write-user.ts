import { collection, Firestore, getDoc, doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { UserType } from "./models/user";

const writeUser = async (db: Firestore, firebaseUser: User) => {
  const id = firebaseUser.uid;
  let displayName: string | null = null;

  let theUser: UserType | null = null;
  const userDoc = await getDoc(doc(collection(db, "users"), id));
  if (!userDoc.exists) {
    const user: UserType = {
      id: id,
      displayName: "test",
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
