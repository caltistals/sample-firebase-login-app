import { collection, Firestore, getDoc, doc, setDoc } from "firebase/firestore";
import { writeUser } from "../../users/api/write-user";
import { UserType } from "../../users/types";
import { GroupType } from "../types/index";

export const createGroup = async (
  db: Firestore,
  user: UserType,
  groupName: string
) => {
  const id = user.id;
  const newGroupRef = doc(collection(db, "group"));
  const newGroup: GroupType = {
    groupId: newGroupRef.id,
    groupName: groupName,
    users: [user],
    creator: user,
  };
  await setDoc(newGroupRef, newGroup);
  const newUser: UserType = { ...user, groupId: newGroupRef.id };
  await writeUser(db, newUser);
  return newUser;
};
