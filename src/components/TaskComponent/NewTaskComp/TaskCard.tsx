import { Box, Card, CardContent, Tooltip } from "@mui/material";
import {
  CustomStack,
  Span,
  SubHeadingTag,
  SubLabelTag,
  TaskCardLabel,
} from "components/CustomTags";
import GenericMenu from "components/GenericMenu/GenericMenu";
import { momentLocalDateTime } from "components/Utills/Globals";
import { AssignedUserState, ITask } from "constants/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

interface IProps {
  task: ITask;
  selectedTaskId: string | undefined;
  handleClick: (task: ITask) => void;
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
    userSubState,
    assignedToState,
  } = task;
  const taskCreatedAt = momentLocalDateTime(createdAt).split(" ");
  const [month, day, year] = dueDate.split("-");
  const formattedYear = year.slice(-2);
  const formattedDate = `${day}.${month}.${formattedYear}`;
  const isSelectedTask: boolean = selectedTaskId === _id;
  const cardBorderColor = !isCreator ? "#ccc" : "#FFE7E7";
  const isCanceled: boolean = userSubState === "canceled";
  const assignToNames = () =>
    assignedToState.length > 0 ? (
      <Tooltip title={AssignedToList(assignedToState)}>
        <span
          style={{
            fontWeight: "600",
            fontSize: "11px",
            padding: "4px",
            backgroundColor: "transparent",
          }}
        >
          +{assignedToState.length}
        </span>
      </Tooltip>
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
        borderRadius: "8px",
        borderTopRightRadius: isSelectedTask ? "15px" : "10px",
        borderTopLeftRadius: "5px",
        borderTopStyle: "none",
        WebkitBoxShadow: `${
          isSelectedTask === true
            ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
            : "none"
        }`,
        // background: !seenBy.includes(userId) ? "#EBF5FB" : "",
        background: isSelectedTask ? "#EBF5FB" : "",
      }}
      key={_id}
      id={_id}
      onClick={() => handleClick(task)}
    >
      <CustomStack sx={{ pt: 0.1, gap: 1, position: "relative" }}>
        <Span
          sx={{
            color: "0d0d0d",
            fontWeight: 600,
            border: "1px solid #818181",
            borderRadius: "4px",
            padding: "2px 9px",
            backgroundColor: "white",
            borderTopLeftRadius: "4px",
            ml: "-1px",
            WebkitBoxShadow: `${
              isSelectedTask === true
                ? "0px 3px 4px 0px rgba(0, 0, 0, 0.25) inset"
                : "none"
            }`,
          }}
        >
          {taskUID}
        </Span>
        <Span
          sx={{
            color: "0d0d0d",
            fontWeight: 600,
          }}
        >
          {`${taskCreatedAt[0]}`}
        </Span>

        <Span
          sx={{
            color: "0d0d0d",
            fontWeight: 600,
          }}
        >
          {`${taskCreatedAt[1]}`}
        </Span>
        {dueDate && dueDate !== "" ? (
          <Span
            sx={{
              color: "0d0d0d",
              fontWeight: 600,
            }}
          >{`Due date ${formattedDate}`}</Span>
        ) : (
          <Span
            sx={{
              color: "0d0d0d",
              fontWeight: 600,
            }}
          >{`Due date N/A`}</Span>
        )}
        <Box sx={{ position: "absolute", top: "3%", right: 0 }}>
          <GenericMenu
            options={menuOption}
            key={_id}
            disableMenu={disableMenu || !isSelectedTask}
            paddingTop={0}
          />
        </Box>
      </CustomStack>

      <CardContent
        sx={{
          pl: 1.5,
          pt: 0,
          "&:last-child": { pb: 0 },
        }}
      >
        <CustomStack justifyContent="space-between">
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <TaskCardLabel className="textOverflowDescription">
              {isCanceled && !isCreator ? "From" : isTaskFromMe}:&nbsp;{""}
              <span
                style={{
                  fontWeight: "600",
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
                  fontWeight: "600",
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
          {topic?.topic
            ? topic.topic.charAt(0).toUpperCase() + topic.topic.slice(1)
            : "N/A"}
        </SubHeadingTag>

        <SubLabelTag
          className="textOverflowDescription"
          sx={{
            pb: 0.5,
            maxWidth: "350px",
            WebkitLineClamp: 2,
            wordWrap: "break-word",
            wordBreak: "break-all",
          }}
        >
          {description}
        </SubLabelTag>
      </CardContent>
    </Card>
  );
}

export { TaskCard };
