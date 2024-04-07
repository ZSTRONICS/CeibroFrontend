import { TaskCard } from "components/TaskComponent";
import { optionMapping } from "components/Utills/Globals";
import {
  FromMeLabelIcon,
  HiddenLabelIcon,
  ToMeLabelIcon,
} from "components/material-ui/icons";
import { TASK_CONFIG } from "config";
import { ITask } from "constants/interfaces";
import { useDispatch } from "react-redux";
import { taskActions } from "redux/action";
import { MUI_TASK_CARD_COLOR_MAP } from "utills/common";
interface IProps {
  userId: string;
  selectedTaskId: string | undefined;
  handleTaskClick: (task: ITask) => void;
  task: ITask;
}

function LocationTaskCard(props: IProps) {
  const dispatch = useDispatch();
  const { handleTaskClick, task: localTask, userId, selectedTaskId } = props;
  const currentTaskColor = MUI_TASK_CARD_COLOR_MAP.get(localTask.userSubState);
  const currentTaskStateAndIcon = [
    {
      taskRootState: "from-me",
      icon: FromMeLabelIcon,
    },
    {
      taskRootState: "to-me",
      icon: ToMeLabelIcon,
    },
    {
      taskRootState: "hidden",
      icon: HiddenLabelIcon,
    },
    {
      taskRootState: "canceled",
      title: "Hidden",
      icon: HiddenLabelIcon,
    },
  ].find((config) => config.taskRootState === localTask.taskRootState);

  const stateMap: { [key: string]: string } = {
    "from-me": "allTaskFromMe",
    "to-me": "allTaskToMe",
    hidden: "allTaskHidden",
    canceled: "allTaskHidden",
  };
  const taskRootState = stateMap[localTask.taskRootState];

  const handleTaskAction = (
    actionType: (arg: {
      other: { taskId: string };
      success: (res: any) => void;
    }) => any,
    actionConfig: { eventType: any }
  ) => {
    if (selectedTaskId) {
      dispatch(
        actionType({
          other: { taskId: selectedTaskId },
          success: (res: any) => {
            if (res) {
              dispatch({
                type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                payload: {
                  ...res.data,
                  userId,
                  eventType: actionConfig.eventType,
                },
              });
            }
          },
        })
      );
    }
  };

  const menuOptions = [
    {
      menuName: "Hide",
      callBackHandler: () => {
        if (selectedTaskId) {
          handleTaskAction(taskActions.taskHide, {
            eventType: TASK_CONFIG.TASK_HIDDEN,
          });
        }
      },
    },
    {
      menuName: "Un-hide",
      callBackHandler: () => {
        if (selectedTaskId) {
          handleTaskAction(taskActions.taskShow, {
            eventType: TASK_CONFIG.TASK_SHOW,
          });
        }
      },
    },
    {
      menuName: "Cancel",
      callBackHandler: () => {
        if (selectedTaskId) {
          handleTaskAction(taskActions.taskCaneled, {
            eventType: TASK_CONFIG.TASK_CANCELED,
          });
        }
      },
    },
    {
      menuName: "Un-cancel",
      callBackHandler: () => {
        if (selectedTaskId) {
          handleTaskAction(taskActions.taskUnCanel, {
            eventType: TASK_CONFIG.TASK_UN_CANCEL,
          });
        }
      },
    },
  ];
  const filteredMenuOptions = (myState: string, subState: string) => {
    // Get the option name based on the given state and substate
    const optionName = optionMapping[myState]?.[subState];
    return optionName
      ? menuOptions.filter((option) => option.menuName === optionName)
      : [];
  };

  return (
    <TaskCard
      userId={userId}
      key={localTask._id}
      isLocationTask={true}
      task={localTask}
      selectedTaskId={selectedTaskId}
      handleClick={handleTaskClick}
    />
  );
}

export default LocationTaskCard;
