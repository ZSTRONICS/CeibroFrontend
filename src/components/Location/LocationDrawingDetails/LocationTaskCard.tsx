import { Box } from "@mui/material";
import { CustomStack, Span } from "components/CustomTags";
import { TaskCard } from "components/TaskComponent";
import {
  optionMapping,
  subtaskToIsTaskFromMe,
} from "components/Utills/Globals";
import { FromMEIcon, HiddenIcon, ToMeIcon } from "components/material-ui/icons";
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
      title: "From me",
      icon: <FromMEIcon color="#131516" />,
    },
    {
      taskRootState: "to-me",
      title: "To me",
      icon: <ToMeIcon color="#131516" />,
    },
    {
      taskRootState: "hidden",
      title: "Hidden",
      icon: <HiddenIcon color="#131516" />,
    },
  ].find((config) => config.taskRootState === localTask.taskRootState);
  const stateMap: { [key: string]: string } = {
    "from-me": "allTaskFromMe",
    "to-me": "allTaskToMe",
    hidden: "allTaskHidden",
  };

  const taskRootState = stateMap[localTask.rootState];
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

  return (
    <Box
      sx={{
        width: 373,
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        border: `1px solid ${currentTaskColor}`,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        background: `${currentTaskColor}`,
      }}
    >
      {currentTaskStateAndIcon && (
        <CustomStack
          sx={{
            flexDirection: "column",
            gap: 0.3,
            width: "50px",
            padding: "5px",
          }}
        >
          {currentTaskStateAndIcon.icon}
          <Span sx={{ fontSize: "9px" }}>{currentTaskStateAndIcon.title}</Span>
        </CustomStack>
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
