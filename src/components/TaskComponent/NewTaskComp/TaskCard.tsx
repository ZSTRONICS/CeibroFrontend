import {
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
} from "@mui/material";
import {
  CustomStack,
  Span,
  SubHeadingTag,
  SubLabelTag,
  TaskCardLabel,
} from "components/CustomTags";
import GenericMenu from "components/GenericMenu/GenericMenu";
import {
  momentLocalDateTime,
  momentdeDateFormat,
} from "components/Utills/Globals";
import { AssignedUserState, Task } from "constants/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

interface IProps {
  task: Task;
  selectedTaskId: string | undefined;
  handleClick: (task: Task) => void;
  menuOption: any;
  disableMenu: boolean;
  isTaskFromMe: string;
}

function TaskCard(props: IProps) {
  const { user } = useSelector((store: RootState) => store.auth);
  const {
    task,
    handleClick,
    selectedTaskId,
    menuOption,
    disableMenu,
    isTaskFromMe,
  } = props;
  const userId = user && String(user._id);
  const {
    taskUID,
    project,
    _id,
    dueDate,
    createdAt,
    description,
    topic,
    creator,
    isCreator,
    seenBy,
    userSubState,
    assignedToState,
  } = task;
  const taskCreatedAt = momentLocalDateTime(createdAt);
  const isSelectedTask: boolean = selectedTaskId === _id;
  const cardBorderColor = !isCreator ? "#ccc" : "#FFE7E7";
  const isCanceled: boolean = userSubState === "canceled";
  const assignToNames = () =>
    assignedToState.length > 0 ? (
      <Badge
        overlap="circular"
        color="primary"
        sx={{
          padding: "0 4px",
        }}
        badgeContent={
          <Tooltip title={AssignedToList(assignedToState)}>
            <span>{assignedToState.length}</span>
          </Tooltip>
        }
      ></Badge>
    ) : (
      <></>
    );

  const AssignedToList = (membersList: AssignedUserState[]) => {
    return (
      <>
        {membersList.map((item: AssignedUserState, index) => (
          <span key={item._id} style={{ textTransform: "capitalize" }}>
            {`${item.firstName} ${item.surName}`}
            {index !== membersList.length - 1 && <br />}
          </span>
        ))}
      </>
    );
  };

  return (
    <Card
      sx={{
        width: "100%",
        minWidth: 280,
        mt: 1,
        cursor: "pointer",
        border: `${
          isCanceled ? `3px solid ${cardBorderColor}` : "1px solid #818181"
        }`,
        borderRadius: 1,
        padding: "3px 4px",
        borderTop: "none",
        background: !seenBy.includes(userId) ? "#EBF5FB" : "",
        WebkitBoxShadow: `${
          isSelectedTask === true ? "0px -4px 0px 0px #3b95d3" : "none"
        }`,
      }}
      key={_id}
      id={_id}
      onClick={() => handleClick(task)}
    >
      <CardHeader
        sx={{
          pt: 0,
          pl: 0,
          pb: 0.1,
          pr: 0.1,
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
            <Span>{`${taskCreatedAt}`}</Span>
            <Span>{`Due date ${momentdeDateFormat(dueDate)}`}</Span>
          </CustomStack>
        }
        title=""
        action={
          <CustomStack>
            <GenericMenu
              options={menuOption}
              key={_id}
              disableMenu={disableMenu || !isSelectedTask}
            />
          </CustomStack>
        }
      />
      <CardContent sx={{ pt: 0, p: 0.5, "&:last-child": { pb: 0 } }}>
        <CustomStack justifyContent="space-between">
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <TaskCardLabel className="textOverflowDescription">
              {isCanceled && !isCreator ? "From" : isTaskFromMe}:&nbsp;{""}
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "11px",
                }}
              >
                {`${creator.firstName} ${creator.surName}`}
              </span>
            </TaskCardLabel>
            {assignToNames()}
          </Box>

          {project && (
            <TaskCardLabel
              className="textOverflowDescription"
              style={{ paddingLeft: "10px" }}
            >
              Project: &nbsp;{""}
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "11px",
                }}
              >
                {project.title}
              </span>
            </TaskCardLabel>
          )}
        </CustomStack>

        <SubHeadingTag
          className="ellipsis"
          sx={{
            maxWidth: "300px",
            color: "black",
            pb: 0.1,
            WebkitLineClamp: 1,
          }}
        >
          {topic.topic || "N/A"}
        </SubHeadingTag>

        <SubLabelTag
          className="textOverflowDescription"
          sx={{
            maxWidth: "350px",
            WebkitLineClamp: 2,
          }}
        >
          {description || "No description"}
        </SubLabelTag>
      </CardContent>
    </Card>
  );
}

export { TaskCard };
