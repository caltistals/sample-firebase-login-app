import { Timestamp } from "firebase/firestore";
import { UserType } from "../../users/types/index";

export type GroupType = {
  groupId: string;
  groupName: string;
  users?: UserType[];
  createdAt: Timestamp;
};
