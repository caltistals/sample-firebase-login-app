import { collection, Firestore, getDocs } from "firebase/firestore";
import { DinnerPlanType } from "../types";

export const readDinnerPlans = async (
  db: Firestore,
  groupId: string,
  date: string
) => {
  let dinnerPlans: DinnerPlanType[] | null = null;
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
  if (dinnerPlansDocs.empty) {
    console.log("該当するデータがありません");
  } else {
    console.log(dinnerPlansDocs.docs.map((doc) => doc.data()));
  }
};
