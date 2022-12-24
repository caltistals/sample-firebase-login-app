import { collection, Firestore, getDocs } from "firebase/firestore";
import { DinnerPlanType } from "../types";

export const readDinnerPlans = async (
  db: Firestore,
  groupId: string,
  date: string
) => {
  let dinnerPlans: DinnerPlanType[] = [];
  const dinnerPlansDocs = await getDocs(
    collection(
      db,
      "dinnerPlans",
      groupId,
      "dailyDinnerPlans",
      date,
      "dinnerPlan"
    )
  );
  console.log(dinnerPlansDocs.docs);
  if (!dinnerPlansDocs.empty) {
    dinnerPlansDocs.forEach((doc) =>
      dinnerPlans.push(doc.data() as DinnerPlanType)
    );
  }
  return dinnerPlans;
};
