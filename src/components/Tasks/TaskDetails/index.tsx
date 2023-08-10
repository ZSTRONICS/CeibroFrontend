import { Box } from "@mui/material";
import FileBox from "components/Utills/FileBox";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  MEDIA_EXT,
  momentdeDateFormatWithDay,
} from "components/Utills/Globals";
import { Task } from "constants/interfaces";
import DetailsBody from "./DetailsBody";
import DetailsHeader from "./DetailsHeader";

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
    _id,
    doneCommentsRequired,
    doneImageRequired,
  } = props.task;
  // console.log("task", props.task);
  const docs = FILTER_DATA_BY_EXT(DOC_EXT, files);
  const media = FILTER_DATA_BY_EXT(MEDIA_EXT, files);

  return (
    <Box
      key={_id}
      sx={{ height: "calc(100vh - 85px)", overflow: "auto" }}
      className="custom-scrollbar"
    >
      <DetailsHeader
        doneCommentsRequired={doneCommentsRequired}
        doneImageRequired={doneImageRequired}
        assignedToState={assignedToState}
        userSubState={userSubState}
        dueDate={dueDate || ""}
        taskUid={taskUID}
        topic={topic}
        creator={creator}
        project={project}
        invitedNumbers={invitedNumbers}
        taskId={_id}
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
