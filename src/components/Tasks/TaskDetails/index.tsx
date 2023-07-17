import React from "react";
import DetailsHeader from "./DetailsHeader";
import FileBox from "components/Utills/FileBox";
import DetailsBody from "./DetailsBody";
import ContactList from "components/Utills/ContactList";
import { Task } from "constants/interfaces";

interface IProps {
  task: Task;
  handleClick?: (task: Task) => void;
}
export default function TaskDetails(props: IProps) {
  const { dueDate, taskUID, userSubState, project } = props.task;
  return (
    <>
      <DetailsHeader
        subTask={userSubState}
        dueDate={dueDate || ""}
        taskUid={taskUID}
        // commentCallback={}
        // forwardCallback={}
        // Callback={}
      />
      <FileBox title="Files" files={[]} showIcon={true} />
      <DetailsBody />
    </>
  );
}
