import { collection, Firestore, getDoc, doc, setDoc } from "firebase/firestore";
import { writeUser } from "../../users/api/write-user";
import { UserType } from "../../users/types";
import { GroupType } from "../types/index";

export const findGroup = async (db: Firestore, groupId: string) => {
  let group: GroupType | null = null;
  const groupDoc = await getDoc(doc(collection(db, "group"), groupId));
  if (groupDoc.exists()) {
    group = groupDoc.data() as GroupType;
  }
  return group;
};
