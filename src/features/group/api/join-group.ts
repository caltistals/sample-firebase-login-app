import { collection, doc, Firestore, setDoc } from "firebase/firestore";
import { writeUser } from "../../users/api/write-user";
import { UserType } from "../../users/types";
import { GroupType } from "../types";

export const joinGroup = async (
  db: Firestore,
  user: UserType,
  group: GroupType
) => {
  const newUser: UserType = { ...user, groupId: group.groupId };
  const newGroup = { ...group, users: [...group.users, newUser] };
  await setDoc(doc(collection(db, "group"), group.groupId), newGroup);
  await writeUser(db, newUser);
  return newUser;
};
