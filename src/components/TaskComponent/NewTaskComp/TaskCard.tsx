import { Box, Card, CardContent, Tooltip } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  CustomStack,
  Span,
  SubHeadingTag,
  SubLabelTag,
  TaskCardLabel,
} from "components/CustomTags";
import GenericMenu from "components/GenericComponents/GenericMenu";
import {
  convertDateFormat,
  momentLocalDateTime,
} from "components/Utills/Globals";
import { AssignedUserState, ITask } from "constants/interfaces";
import React, { useState } from "react";

interface IProps {
  task: ITask;
  userId: string;
  selectedTaskId: string | undefined;
  handleClick: (task: ITask) => void;
  menuOption: MenuOption[];
  disableMenu: boolean;
  isTaskFromMe: string;
  isLocationTask?: boolean;
}

const TaskCard = React.memo((props: IProps) => {
  const {
    task,
    handleClick,
    selectedTaskId,
    menuOption,
    disableMenu,
    isTaskFromMe,
    userId,
    isLocationTask,
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
  const formattedDate = convertDateFormat(dueDate);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const isSelectedTask: boolean = selectedTaskId === _id;
  const trucateText =
    project?.title.length > 8
      ? project?.title.slice(0, 8) + "..."
      : project?.title;
  const cardBorderColor = !isCreator ? "#ccc" : "#FFE7E7";
  const isCanceled: boolean = userSubState === "canceled";
  const cardLabel = isCanceled && !isCreator ? "From" : isTaskFromMe;
  const labelContent = cardLabel === "To" ? assignedToState[0] : creator;
  const { firstName = "", surName = "" } = labelContent || {};
  const displayName = `${firstName || ""} ${surName || ""}`;

  const assignToNames = () =>
    assignedToState.length > 1 ? (
      <Tooltip title={AssignedToList(assignedToState)}>
        <span
          style={{
            fontWeight: "600",
            fontSize: "11px",
            padding: "3px",
            backgroundColor: "transparent",
            maxWidth: "43px",
            width: "100%",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "end",
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

  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const isMdScreen = useMediaQuery(theme.breakpoints.down(1250));

  return (
    <Card
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
      sx={{
        width: "100%",
        // minWidth: 290,
        // maxWidth: 320,
        cursor: "pointer",
        border: `${!isLocationTask && isCanceled
          ? `3px solid ${cardBorderColor}`
          : isLocationTask
            ? "none"
            : "1px solid #818181"
          }`,
        borderRadius: !isLocationTask ? "8px" : "",
        borderTopRightRadius: isSelectedTask ? "15px" : "10px",
        borderTopLeftRadius: "5px",
        borderTopStyle: "none",
        WebkitBoxShadow: `${isSelectedTask === true
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
          borderTopRightRadius: isLocationTask ? "" : "15px",
        },
      }}
      key={_id}
      id={_id}
      onClick={() => handleClick(task)}
    >
      <CustomStack sx={{ pt: 0.1, gap: 1, position: "relative" }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: isLgScreen ? 'column' : 'row', }} >
          <Box sx={{}} >
            <Span
              sx={{
                color: "0d0d0d",
                fontWeight: 600,
                border: "1px solid #818181",
                borderRadius: "4px",
                paddingTop: "2px",
                paddingBottom: '2px',
                paddingLeft: '6px',
                paddingRight: '6px',
                backgroundColor: "white",
                borderTopLeftRadius: "4px",
                ml: "-1px",
                WebkitBoxShadow: `${isSelectedTask || isMouseOver
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
                marginLeft: '7px',
              }}
            >
              {`${taskCreatedAt[0]}`}
            </Span>
            <Span
              sx={{
                color: "0d0d0d",
                fontWeight: 600,
                marginLeft: '7px',
              }}
            >
              {`${taskCreatedAt[1]}`}
            </Span>
          </Box>
          <Box sx={{ marginLeft: '7px' }} >
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
          </Box>
        </Box>
        <Box sx={{ position: "absolute", top: "3%", right: 0 }}>
          <GenericMenu
            options={menuOption}
            key={_id}
            disableMenu={disableMenu}
            isTaskSelected={!isSelectedTask}
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

        <Box sx={{
          display: 'flex', justifyContent: 'space-between',
        }} >
          <CustomStack sx={{
            flexDirection: isMdScreen ? 'column' : '',
            display: isMdScreen ? 'flex' : '',
            justifyContent: isMdScreen ? 'start' : '',
            alignItems: isMdScreen ? 'start' : ''
          }} justifyContent="space-between" pt={0.2}>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <TaskCardLabel>
                {cardLabel}:&nbsp;{""}
                <span
                  className="textOverflowDescription"
                  style={{
                    fontWeight: "600",
                    fontSize: "11px",
                    WebkitLineClamp: 1,
                    maxWidth: "100px",
                  }}
                >
                  {displayName}
                </span>
              </TaskCardLabel>
              {cardLabel !== "From" && assignToNames()}
            </Box>

            {project?.title && (
              <TaskCardLabel
                className="textOverflowDescription"
                style={{ marginLeft: isMdScreen ? '0px' : '40px', whiteSpace: "nowrap" }}
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
        </Box>

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
});

export { TaskCard };

