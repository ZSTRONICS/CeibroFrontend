import { Box } from "@mui/material";
import { ITask, ITaskFilterInterace } from "constants/interfaces";
import React from "react";
import {
  MinicardTypography,
  Minicardheading,
  styles,
} from "./MiniCardTaskStyle";

interface IProps {
  allTask: ITask[];
  taskListFilter: ITaskFilterInterace;
}
const MiniTaskCardList: React.FC<IProps> = ({ allTask, taskListFilter }) => {
  allTask?.sort((taskA, taskB) => {
    return taskA.updatedAt.localeCompare(taskB.updatedAt);
  });

  const MUI_TASK_CARD_COLOR_MAP: Map<string, string> = new Map([
    ["ongoing", "#F1B740"],
    ["new", "#CFECFF"],
    ["canceled", "#FFE7E7"],
    ["unread", "#E2E4E5"],
    ["done", "#55BCB3"],
  ]);

  const MiniCardRendering = allTask?.map((task) => {
    const currentTaskColor = MUI_TASK_CARD_COLOR_MAP.get(task.userSubState);
    const rootState = task.rootState;

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
        emptyDiv = !taskListFilter.hidden.cancelled;
        break;

      default:
        console.log("default");
        emptyDiv = true;
        break;
    }

    return (
      <>
        {emptyDiv ? (
          <> </>
        ) : (
          <Box
            style={{
              ...styles.minicard_parent,
              backgroundColor: `${currentTaskColor}`,
            }}
          >
            <Minicardheading>{task.taskUID}</Minicardheading>
            <MinicardTypography>{rootState}</MinicardTypography>
          </Box>
        )}
      </>
    );
  });

  return (
    <>
      <Box style={styles.minicard_container}>{MiniCardRendering}</Box>
    </>
  );
};

export default MiniTaskCardList;
