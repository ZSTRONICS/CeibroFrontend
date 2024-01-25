import { Box } from "@mui/material";
import { TaskCard } from "components/TaskComponent";
import {
  optionMapping,
  subtaskToIsTaskFromMe,
} from "components/Utills/Globals";
import {
  FromMeLabelIcon,
  HiddenLabelIcon,
  ToMeLabelIcon,
} from "components/material-ui/icons";
import { TASK_CONFIG } from "config";
import { ITask } from "constants/interfaces";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "redux/action";
import { selectedTaskFilterType } from "redux/type";
import { MUI_TASK_CARD_COLOR_MAP } from "utills/common";
interface IProps {
  userId: string;
  selectedTaskId: string | undefined;
  handleTaskClick: (task: ITask) => void;
  task: ITask;
}
interface RouteParams {
  subtask: selectedTaskFilterType;
  filterkey: string;
  taskuid: string;
}
function LocationTaskCard(props: IProps) {
  const dispatch = useDispatch();
  const { handleTaskClick, task: localTask, userId, selectedTaskId } = props;
  //   const { subtask, filterkey, taskuid } = useParams<RouteParams>();
  const [isTaskFromMe, setIsTaskFromMe] = useState<string>("To");
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
  };

  const taskRootState = stateMap[localTask.rootState];
  // console.log(taskRootState, localTask.rootState);
  useEffect(() => {
    const newIsTaskFromMe = subtaskToIsTaskFromMe[taskRootState];
    if (typeof newIsTaskFromMe === "string") {
      setIsTaskFromMe(newIsTaskFromMe);
    } else if (
      typeof newIsTaskFromMe === "object" &&
      newIsTaskFromMe[taskRootState]
    ) {
      setIsTaskFromMe(newIsTaskFromMe[taskRootState]);
    }
  }, [taskRootState]);

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
  // const handleClick = (task: ITask) => {};
  return (
    <Box
      sx={{
        width: 340,
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        // border: `1px solid ${currentTaskColor}`,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        background: `${currentTaskColor}`,
        marginLeft: '16px',
        marginBottom: '10px',
        height: 'max-content',
        border: 'solid 1px green',
        '@media screen and (max-width: 1330px)': {
          width: '90%',
        },
      }}
    >
      {currentTaskStateAndIcon && (
        <Box sx={{ padding: "1px" }}>
          <currentTaskStateAndIcon.icon />
        </Box>
      )}
      <TaskCard
        userId={userId}
        key={localTask._id}
        isLocationTask={true}
        isTaskFromMe={isTaskFromMe}
        task={localTask}
        selectedTaskId={selectedTaskId}
        handleClick={handleTaskClick}
        menuOption={filteredMenuOptions(taskRootState, localTask.userSubState)}
        disableMenu={
          localTask.userSubState === "canceled" ? !localTask.isCreator : false
        }
      />
    </Box>
  );
}

export default LocationTaskCard;
