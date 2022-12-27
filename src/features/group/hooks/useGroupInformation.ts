import { showNotification } from "@mantine/notifications";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext, UserContext } from "../../../contexts";
import { findGroup } from "../api/find-group";
import { GroupType } from "../types";

const useGroupInformation = () => {
  const { user } = useContext(UserContext);
  const { db } = useContext(FirebaseContext);
  const [groupData, setGroupData] = useState<GroupType | null>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (db && user && user.groupId) {
        try {
          const newGroupData = await findGroup(db, user.groupId);
          setGroupData(newGroupData);
        } catch (error) {
          showNotification({
            message: "グループ情報の取得に失敗しました",
            color: "red",
          });
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return { groupData, isLoading };
};

export default useGroupInformation;
