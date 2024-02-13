import { Box } from "@mui/material";
import { ITask, ITaskFilterInterace } from "constants/interfaces";
import React, { useCallback, useState } from "react";
import { MUI_TASK_CARD_COLOR_MAP } from "utills/common";
import { MinicardTypography, Minicardheading } from "./MiniCardTaskStyle";

interface IProps {
  allTasks: ITask[];
  taskListFilter: ITaskFilterInterace;
  loadingAllTasksAllEvents: boolean;
  handleSelectedTask(task: ITask): void;
  windowActualHeight: number;
  selectedTaskId: string | undefined;
}

const MiniTaskCardList: React.FC<IProps> = React.memo(
  ({
    allTasks,
    taskListFilter,
    handleSelectedTask,
    loadingAllTasksAllEvents,
    windowActualHeight,
    selectedTaskId,
  }) => {
    const [selectedTask, setSelectedTask] = useState(selectedTaskId);

    const handleTaskClick = useCallback(
      (task: ITask, index: number) => {
        setSelectedTask(task._id);
        handleSelectedTask(task);
      },
      [handleSelectedTask]
    );

    return (
      <Box>
        {allTasks.map((task, index) => {
          const currentTaskColor =
            MUI_TASK_CARD_COLOR_MAP.get(task.userSubState) || "";
          const rootState =
            task.taskRootState === "canceled"
              ? "hidden"
              : task.taskRootState || "";

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

          if (emptyDiv) {
            return <></>;
          }

          return (
            <Box
              key={index}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                transform: selectedTaskId === task._id ? "scale(.98)" : "",
              }}
              style={{
                borderRadius: "10px",
                height: "max-content",
                minWidth: "72px",
                marginLeft: "-3px",
                marginTop: "15px",
                boxShadow: "0px 4px 4px 0px #00000040",
                backgroundColor: `${currentTaskColor}`,
                padding: "5px 4px 4px 4px",
                transition: "all linear 0.15s",
              }}
              onClick={() => handleTaskClick(task, index)}
            >
              <Minicardheading
                sx={{
                  boxShadow:
                    selectedTaskId === task._id
                      ? "inset 0px 4px 4px 0px #00000040"
                      : "",
                }}
              >
                {task.taskUID}
              </Minicardheading>
              <MinicardTypography sx={{ width: "100%", textAlign: "center" }}>
                {rootState === "from-me"
                  ? "From me"
                  : rootState === "to-me"
                  ? "To me"
                  : rootState === "hidden"
                  ? "Hidden"
                  : ""}
              </MinicardTypography>
            </Box>
          );
        })}
      </Box>
    );
  }
);

export default MiniTaskCardList;
