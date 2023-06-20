import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import assets from "assets";
import { LoadingButton } from "components/Button";
import {
  CustomStack,
  FileName,
  SubHeadingTag,
  SubLabelTag,
} from "components/CustomTags";
import { momentdeDateFormat } from "components/Utills/Globals";
import { AttachmentIcon, ViewCommentsIco } from "components/material-ui/icons";
import { Task, AssignedToState } from "constants/interfaces";

interface IProps {
  task: Task;
}
function TaskCard(props: IProps) {
  const { task } = props;
  const {
    taskUID,
    project,
    _id,
    dueDate,
    doneImageRequired,
    doneCommentsRequired,
    description,
    locations,
    recentComments,
    topic,
    rejectionComments,
    creator,
    assignedToState,
    creatorState,
    access,
    invitedNumbers,
    createdAt,
  } = task;
  const assignedTo: AssignedToState[] | any =
    assignedToState.length > 0 ? `${assignedToState[0].firstName} ${assignedToState[0].surName}` : "Not Assigned";
  const taskCreated = momentdeDateFormat(createdAt);
  return (
    <Card sx={{ minWidth: 280, marginTop: "10px" }} key={_id}>
      <CardHeader
        sx={{
          pt: 0,
          pl: 0,
        }}
        avatar={
          <CustomStack gap={1}>
            <SubLabelTag
              sx={{
                border: "1px solid #818181",
                borderRadius: 1,
                padding: "2px 9px",
              }}
            >
              {taskUID}
            </SubLabelTag>
            <SubLabelTag>{`Due date ${dueDate ?? ""}`}</SubLabelTag>
          </CustomStack>
        }
        title=""
        action={<assets.DoneAllIcon sx={{ color: "#818181" }} />}
      />
      <CardContent sx={{ pt: 0 }}>
        <CustomStack justifyContent="space-between">
          <FileName>
            To:
            <span
              style={{ fontWeight: "500" }}
            >{assignedTo}</span>
          </FileName>
          <FileName>
            Project: &nbsp;{" "}
            <span style={{ fontWeight: "500" }}>
              {project ? project.title : "No Project"}
            </span>
          </FileName>
        </CustomStack>

        <SubHeadingTag className="ellipsis" sx={{ maxWidth: "300px" }}>
          {topic.topic ?? ""}
        </SubHeadingTag>

        <SubLabelTag
          className="textOverflowDescription"
          sx={{
            maxWidth: "350px",
            WebkitLineClamp: 2,
          }}
        >
          {description ?? "No description"}
        </SubLabelTag>
      </CardContent>
      <CardActions sx={{ py: 0.4, background: "#F4F4F4" }}>
        <CustomStack gap={1}>
          <SubLabelTag>{`Created ${taskCreated}`} </SubLabelTag>
          <LoadingButton variant="text" startIcon={<ViewCommentsIco />}>
            Comment
          </LoadingButton>
          <LoadingButton
            variant="text"
            startIcon={<assets.ImageOutlinedIcon />}
          >
            Photo
          </LoadingButton>
          <LoadingButton
            variant="text"
            startIcon={<AttachmentIcon style={{ rotate: "315eg" }} />}
          >
            File
          </LoadingButton>
        </CustomStack>
      </CardActions>
    </Card>
  );
}

export { TaskCard };
