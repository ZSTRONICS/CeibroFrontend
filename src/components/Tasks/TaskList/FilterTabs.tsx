import { countUnseenTasks } from "components/Utills/Globals";
import StyledChip from "components/Utills/StyledChip";
import { Task } from "constants/interfaces";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

interface FilterTabProps {
  subTaskKey: string;
  activeTab: string;
  filterKeys: string[];
  handleTabClick: (type: string) => void;
}

function FilterTabs(props: FilterTabProps) {
  const { activeTab, filterKeys, subTaskKey, handleTabClick } = props;
  
  const { user } = useSelector((store: RootState) => store.auth);
  const userId = user && String(user._id);
  
  const task: any = useSelector((state: RootState) => state.task);
  const {
      allTaskToMe,
      allTaskFromMe,
      allTaskHidden,
      loadingAllTaskToMe,
      loadingAllTaskfromMe,
      loadingHiddenTask,
    } = task;
    
    let taskOngoingCount = 0;
    let taskDoneCount = 0;
    
    const { ongoing, done } =
    subTaskKey === "allTaskFromMe"
    ? allTaskFromMe
    : subTaskKey === "allTaskToMe"
    ? allTaskToMe
    : allTaskHidden;
    
    ongoing.forEach((task: Task) =>
    !task.seenBy.includes(userId) ? (taskOngoingCount += 1) : 0
    );
    done.forEach((task: Task) =>
    !task.seenBy.includes(userId) ? (taskDoneCount += 1) : 0
    );
    
    const newUnSeenCount = countUnseenTasks(allTaskToMe.new, userId);
    const fromMeUnReadCount = countUnseenTasks(allTaskFromMe.unread, userId);
    const canceledCount = countUnseenTasks(allTaskHidden.canceled, userId);
    function getFilterTabs(type: string, activeTab: string) {
    const tabConfig = [
      {
        type: "new",
        label: "New",
        notifyCount: newUnSeenCount,
        isDisabled: isEmpty(allTaskToMe.new),
        bgColor: "#CFECFF",
      },
      {
        type: "unread",
        label: "Unread",
        notifyCount: fromMeUnReadCount,
        isDisabled: isEmpty(allTaskFromMe.unread),
        bgColor: "#CFECFF",
      },
      {
        type: "ongoing",
        label: "Ongoing",
        notifyCount: taskOngoingCount,
        isDisabled: false,
        bgColor: "#F1B740",
      },
      {
        type: "done",
        label: "Done",
        notifyCount: taskDoneCount,
        isDisabled: false,
        bgColor: "#55BCB3",
      },
      {
        type: "canceled",
        label: "Canceled",
        notifyCount: canceledCount,
        isDisabled: false,
        bgColor: "#FFE7E7",
      },
    ];
    const tab = tabConfig.find((tab) => tab.type === type);

    if (!tab) {
      return null;
    }
    return (
      <StyledChip
        isDisabled={tab.isDisabled}
        key={tab.type}
        label={tab.label}
        notifyCount={tab.notifyCount}
        bgColor={tab.bgColor}
        active={activeTab === tab.type}
        callback={() => handleTabClick(tab.type)}
      />
    );
  }

  const renderTabs = useMemo(() => {
    return filterKeys.map((key: string) => {
      return getFilterTabs(key, activeTab);
    });
  }, [subTaskKey,activeTab]);

  return renderTabs;
}

export default FilterTabs;
