import { countUnseenTasks } from "components/Utills/Globals";
import StyledChip from "components/Utills/StyledChip";
import { Task } from "constants/interfaces";
import { isEmpty } from "lodash";
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
  const { allTaskToMe, allTaskFromMe, allTaskHidden } = task;

  const renderTabs = filterKeys.map((key: string) => {
    let label = "";
    let tasks: Task[] = [];
    let bgColor = "";
    let isDisabled = false;

    switch (key) {
      case "new":
        label = "New";
        tasks = allTaskToMe.new;
        bgColor = "#CFECFF";
        isDisabled = isEmpty(allTaskToMe.new);
        break;
      case "unread":
        label = "Unread";
        tasks = allTaskFromMe.unread;
        bgColor = "#CFECFF";
        isDisabled = isEmpty(allTaskFromMe.unread);
        break;
      case "ongoing":
        label = "Ongoing";
        tasks = subTaskKey === "allTaskFromMe" ? allTaskFromMe.ongoing : [];
        bgColor = "#F1B740";
        isDisabled = false;
        break;
      case "done":
        label = "Done";
        tasks = subTaskKey === "allTaskFromMe" ? allTaskFromMe.done : [];
        bgColor = "#55BCB3";
        isDisabled = false;
        break;
      case "canceled":
        label = "Canceled";
        tasks = allTaskHidden.canceled;
        bgColor = "#FFE7E7";
        isDisabled = false;
        break;
      default:
        break;
    }
    const notifyCount = countUnseenTasks(tasks, userId);
    return (
      <StyledChip
        isDisabled={isDisabled}
        key={key}
        label={label}
        notifyCount={notifyCount}
        bgColor={bgColor}
        active={activeTab === key}
        callback={() => handleTabClick(key)}
      />
    );
  });
  return renderTabs;
}

export default FilterTabs;
