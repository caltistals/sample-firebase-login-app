import { UserType } from "../../users/types";

export type DinnerPlanType = {
  date?: string;
  status: "必要" | "不要" | "遅め" | "未定";
  description?: string;
  user: UserType;
};
