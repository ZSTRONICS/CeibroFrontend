import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import assets from "assets";
import { LoadingButton } from "components/Button";
import {
  BoldLableTag,
  CustomStack,
  FileName,
  Span,
  SubHeadingTag,
  SubLabelTag,
} from "components/CustomTags";
import { deDateFormat, momentdeDateFormat } from "components/Utills/Globals";
import { AttachmentIcon, ViewCommentsIco } from "components/material-ui/icons";
import { AssignedUserState, Task } from "constants/interfaces";

interface IProps {
  task: Task;
  handleClick: (task: Task) => void;
}
function TaskCard(props: IProps) {
  const { task, handleClick } = props;
  const {
    taskUID,
    project,
    _id,
    dueDate,
    doneImageRequired,
    doneCommentsRequired,
    description,
    topic,
    creator,
    access,
    createdAt,
    assignedToState,
  } = task;

  // const assignedTo =
  // assignedToState.length > 0
  //     ? `${assignedToState[0].firstName} ${assignedToState[0].surName}`
  //     : "N/A";

  const taskCreated = momentdeDateFormat(createdAt);
  return (
    <Card
      sx={{
        width: "100%",
        minWidth: 280,
        marginTop: "10px",
        cursor: "pointer",
      }}
      key={_id}
      onClick={() => handleClick(task)}
    >
      <CardHeader
        sx={{
          pt: 0,
          pl: 0,
        }}
        avatar={
          <CustomStack gap={1}>
            <Span
              sx={{
                border: "1px solid #818181",
                borderRadius: 1,
                padding: "2px 9px",
              }}
            >
              {taskUID}
            </Span>
            <Span>{`Due date ${dueDate.replace(/-/g, ".") ?? ""}`}</Span>
          </CustomStack>
        }
        title=""
        action={<assets.DoneAllIcon sx={{ color: "#818181" }} />}
      />
      <CardContent sx={{ pt: 0 }}>
        <CustomStack justifyContent="space-between">
          <BoldLableTag>
            To:&nbsp;{" "}
            <span style={{ fontWeight: "500" }}> {`${creator.firstName} ${creator.surName}`}</span>
          </BoldLableTag>
          <BoldLableTag>
            Project: &nbsp;{" "}
            <span style={{ fontWeight: "500" }}>
              {project ? project.title : "N/A"}
            </span>
          </BoldLableTag>
        </CustomStack>

        <SubHeadingTag
          className="ellipsis"
          sx={{ maxWidth: "300px", color: "black" }}
        >
          {topic?.topic ?? "N/A"}
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
          <Span>{`Created ${taskCreated}`} </Span>
          <LoadingButton
            variant="text"
            sx={{ color: "black", fontSize: "10px" }}
            startIcon={<ViewCommentsIco />}
          >
            Comment
          </LoadingButton>
          <LoadingButton
            variant="text"
            sx={{ color: "black", fontSize: "10px" }}
            startIcon={
              <assets.ImageOutlinedIcon sx={{ color: "#0076C8 !important" }} />
            }
          >
            Photo
          </LoadingButton>
          <LoadingButton
            sx={{ color: "black", fontSize: "10px" }}
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
