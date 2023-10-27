import { Box } from "@mui/material";
import FileBox from "components/Utills/FileBox";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  MEDIA_EXT,
  momentdeDateFormatWithDay,
} from "components/Utills/Globals";
import { ITask } from "constants/interfaces";
import DetailsBody from "./DetailsBody";
import DetailsHeader from "./DetailsHeader";

interface IProps {
  task: ITask;
  handleClick?: (task: ITask) => void;
}
function TaskDetails(props: IProps) {
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

  const docs = FILTER_DATA_BY_EXT(DOC_EXT, files);
  const media = FILTER_DATA_BY_EXT(MEDIA_EXT, files);

  return (
    <Box
      key={_id}
      sx={{
        height: "calc(100vh - 78px)",
        overflowY: "hidden",
        marginLeft: "10px",
        marginRight: "10px",
      }}
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
      <FileBox media={media} title="Files" bt={true} bb={true} files={docs} />
      {events ? (
        <DetailsBody media={media} description={description} events={events} />
      ) : (
        <></>
      )}
    </Box>
  );
}

export default TaskDetails;
