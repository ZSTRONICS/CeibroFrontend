import { Box, Card, CardContent, Tooltip } from "@mui/material";
import {
  CustomStack,
  Span,
  SubHeadingTag,
  SubLabelTag,
  TaskCardLabel,
} from "components/CustomTags";
import GenericMenu from "components/GenericMenu/GenericMenu";
import {
  dateFormatWithYearSplit,
  momentLocalDateTime,
} from "components/Utills/Globals";
import { AssignedUserState, ITask } from "constants/interfaces";
import { useState } from "react";

interface IProps {
  task: ITask;
  userId: string;
  selectedTaskId: string | undefined;
  handleClick: (task: ITask) => void;
  menuOption: any;
  disableMenu: boolean;
  isTaskFromMe: string;
}

function TaskCard(props: IProps) {
  const {
    task,
    handleClick,
    selectedTaskId,
    menuOption,
    disableMenu,
    isTaskFromMe,
    userId,
  } = props;
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
    seenBy,
  } = task;
  const taskCreatedAt = momentLocalDateTime(createdAt).split(" ");
  const formattedDate = dateFormatWithYearSplit(dueDate);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const isSelectedTask: boolean = selectedTaskId === _id;
  const trucateText =
    project?.title.length > 8
      ? project?.title.slice(0, 8) + "..."
      : project?.title;
  const cardBorderColor = !isCreator ? "#ccc" : "#FFE7E7";
  const isCanceled: boolean = userSubState === "canceled";
  const assignToNames = () =>
    assignedToState.length > 1 ? (
      <Tooltip title={AssignedToList(assignedToState)}>
        <span
          style={{
            fontWeight: "600",
            fontSize: "11px",
            padding: "4px",
            backgroundColor: "transparent",
          }}
        >
          +{assignedToState.length - 1}
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
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
      sx={{
        width: "100%",
        minWidth: 290,
        maxWidth: 320,
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
            : !seenBy.includes(userId)
            ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            : "none"
        }`,
        // background: !seenBy.includes(userId) ? "#EBF5FB" : "",
        background: isSelectedTask ? "#EBF5FB" : "",
        "&:hover": {
          WebkitBoxShadow: !seenBy.includes(userId)
            ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset"
            : "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
          borderTopRightRadius: "15px",
        },
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
            padding: "2px 6px",
            backgroundColor: "white",
            borderTopLeftRadius: "4px",
            ml: "-1px",
            WebkitBoxShadow: `${
              isSelectedTask || isMouseOver
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
            userState={userSubState}
            options={menuOption}
            key={_id}
            isCreator={isCreator}
            disableMenu={disableMenu || !isSelectedTask}
            paddingTop={0}
          />
        </Box>
      </CustomStack>

      <CardContent
        sx={{
          pl: 1.5,
          pt: 0,
          px: 1.2,
          "&:last-child": { pb: 0 },
        }}
      >
        <CustomStack justifyContent="space-between" pt={0.2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <TaskCardLabel className="textOverflowDescription">
              {isCanceled && !isCreator ? "From" : isTaskFromMe}:&nbsp;{""}
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "11px",
                }}
              >
                {`${
                  isTaskFromMe === "To"
                    ? assignedToState[0].firstName +
                      " " +
                      assignedToState[0].surName
                    : creator.firstName + " " + creator.surName
                }`}
              </span>
            </TaskCardLabel>
            {isTaskFromMe !== "From" && assignToNames()}
          </Box>

          {project?.title && (
            <TaskCardLabel
              className="textOverflowDescription"
              style={{ paddingLeft: "2px", whiteSpace: "nowrap" }}
            >
              Project: &nbsp;{""}
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "11px",
                }}
              >
                {trucateText}
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
