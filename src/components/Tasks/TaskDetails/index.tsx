import React from "react";
import DetailsHeader from "./DetailsHeader";
import FileBox from "components/Utills/FileBox";
import DetailsBody from "./DetailsBody";
import ContactList from "components/Utills/ContactList";
import { Task } from "constants/interfaces";
import { Box } from "@mui/material";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  MEDIA_EXT,
  momentdeDateFormatWithDay,
} from "components/Utills/Globals";

interface IProps {
  task: Task;
  handleClick?: (task: Task) => void;
}
export default function TaskDetails(props: IProps) {
  const {
    dueDate,
    taskUID,
    assignedToState,
    userSubState,
    topic,
    project,
    creator,
    createdAt,
    description,
    events,
    invitedNumbers,
    files,
  } = props.task;
  // console.log("task", props.task);
  const docs = FILTER_DATA_BY_EXT(DOC_EXT, files);
  const media = FILTER_DATA_BY_EXT(MEDIA_EXT, files);

  return (
    <Box sx={{ height: "calc(100vh - 85px)", overflow: "auto" }}>
      <DetailsHeader
        assignedToState={assignedToState}
        userSubState={userSubState}
        dueDate={dueDate || ""}
        taskUid={taskUID}
        topic={topic}
        creator={creator}
        project={project}
        invitedNumbers={invitedNumbers}
        createdOn={momentdeDateFormatWithDay(createdAt)}
        // commentCallback={}
        // forwardCallback={}
        // Callback={}
      />
      <FileBox title="Files" files={docs} />
      <DetailsBody description={description} media={media} events={events} />
    </Box>
  );
}
