import { doc, Firestore, setDoc } from "firebase/firestore";
import { DinnerPlanType } from "../types";

export const writeDinnerPlan = async (
  db: Firestore,
  dinnerPlan: DinnerPlanType,
  date: string
) => {
  if (dinnerPlan.user.groupId && dinnerPlan.user.id) {
    const newDinnerPlanRef = doc(
      db,
      "dinnerPlans",
      dinnerPlan.user.groupId,
      "dailyDinnerPlans",
      date,
      "dinnerPlan",
      dinnerPlan.user.id
    );
    setDoc(newDinnerPlanRef, dinnerPlan);
  }
};
