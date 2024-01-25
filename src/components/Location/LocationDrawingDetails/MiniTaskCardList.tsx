import { Box } from "@mui/material";
import { ITask, ITaskFilterInterace } from "constants/interfaces";
import React from "react";
import { MUI_TASK_CARD_COLOR_MAP } from "utills/common";
import { MinicardTypography, Minicardheading } from "./MiniCardTaskStyle";

interface IProps {
  allTasks: ITask[];
  taskListFilter: ITaskFilterInterace;
  loadingAllTasksAllEvents: boolean;
  handleSelectedTask(task: ITask): void;
  windowActualHeight: number;
}
const MiniTaskCardList: React.FC<IProps> = ({
  allTasks,
  taskListFilter,
  handleSelectedTask,
  loadingAllTasksAllEvents,
  windowActualHeight,
}) => {
  allTasks?.sort((taskA, taskB) => {
    return taskA.updatedAt.localeCompare(taskB.updatedAt);
  });

  const MiniCardRendering = allTasks?.map((task) => {
    const currentTaskColor =
      MUI_TASK_CARD_COLOR_MAP.get(task?.userSubState) ?? "";
    const rootState = task?.rootState ?? "";

    let emptyDiv = false;

    switch (task.userSubState) {
      case "new":
        emptyDiv = !taskListFilter.toMe.new;
        break;

      case "ongoing":
        const ongoingFilter =
          rootState === "to-me"
            ? taskListFilter.toMe.ongoing
            : rootState === "from-me"
              ? taskListFilter.fromMe.ongoing
              : taskListFilter.hidden.ongoing;
        emptyDiv = !ongoingFilter;
        break;

      case "done":
        const doneFilter =
          rootState === "to-me"
            ? taskListFilter.toMe.done
            : rootState === "from-me"
              ? taskListFilter.fromMe.done
              : taskListFilter.hidden.done;
        emptyDiv = !doneFilter;
        break;

      case "unread":
        emptyDiv = !taskListFilter.fromMe.unread;
        break;

      case "canceled":
        emptyDiv = !taskListFilter.hidden.canceled;
        break;

      default:
        emptyDiv = true;
        break;
    }

    return (
      <>
        {emptyDiv ? (
          <></>
        ) : (
          <Box
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            style={{
              borderRadius: "10px",
              height: "max-content",
              minWidth: "54px",
              marginTop: "15px",
              boxShadow: "0px 4px 4px 0px #00000040",
              backgroundColor: `${currentTaskColor}`,
              padding: "5px 4px 4px 4px",
            }}
            onClick={() => handleSelectedTask(task)}
          >
            <Minicardheading sx={{}}>
              {task.taskUID}
            </Minicardheading>
            <MinicardTypography sx={{ width: "100%", textAlign: "center" }}>
              {rootState}
            </MinicardTypography>
          </Box>
        )}
      </>
    );
  });

  return (
    <>
      <Box>{MiniCardRendering}</Box>
    </>
  );
};

export default MiniTaskCardList;
