import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Span } from "components/CustomTags";
import { getFileIconThumbnail } from "components/Utills/FileBox";
import {
  convertDateFormat,
  momentLocalDateTime,
} from "components/Utills/Globals";
import { OutlineIcon } from "components/material-ui/icons/TaskCardIcon";
import { AssignedUserState, ITask } from "constants/interfaces";
import React, { useState } from "react";
import { MUI_TASK_CARD_COLOR_MAP } from "utills/common";

interface IProps {
  task: ITask;
  userId: string;
  selectedTaskId: string | undefined;
  handleClick: (task: ITask) => void;
  isTaskFromMe: string;
  isLocationTask?: boolean;
}

const TaskCard = React.memo((props: IProps) => {
  const {
    task,
    handleClick,
    selectedTaskId,
    isTaskFromMe,
    userId,
    isLocationTask,
  } = props;

  const {
    files,
    taskUID,
    project,
    _id,
    dueDate,
    createdAt,
    description,
    creator,
    isCreator,
    userSubState,
    assignedToState,
    seenBy,
    title,
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
  const isXlScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const isDefualScreen = useMediaQuery(theme.breakpoints.between(1200, 1350));

  const currentTaskColor = MUI_TASK_CARD_COLOR_MAP.get(task.userSubState) || "";
  const rootState =
    task.taskRootState === "canceled" ? "hidden" : task.taskRootState || "";

  let emptyDiv = false;

  // switch (task.userSubState) {
  //   case "new":
  //     emptyDiv = !taskListFilter.toMe.new;
  //     break;

  //   case "ongoing":
  //     const ongoingFilter =
  //       rootState === "to-me"
  //         ? taskListFilter.toMe.ongoing
  //         : rootState === "from-me"
  //         ? taskListFilter.fromMe.ongoing
  //         : taskListFilter.hidden.ongoing;
  //     emptyDiv = !ongoingFilter;
  //     break;

  //   case "done":
  //     const doneFilter =
  //       rootState === "to-me"
  //         ? taskListFilter.toMe.done
  //         : rootState === "from-me"
  //         ? taskListFilter.fromMe.done
  //         : taskListFilter.hidden.done;
  //     emptyDiv = !doneFilter;
  //     break;

  //   case "unread":
  //     emptyDiv = !taskListFilter.fromMe.unread;
  //     break;

  //   case "canceled":
  //     emptyDiv = !taskListFilter.hidden.canceled;
  //     break;

  //   default:
  //     emptyDiv = true;
  //     break;
  // }

  if (emptyDiv) {
    return <></>;
  }

  const imgformat = (format: any) => {
    if (
      format === ".jpeg" ||
      format === ".jpg" ||
      format === ".gif" ||
      format === ".png"
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Card
        sx={{
          ":hover": {
            boxShadow: "inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          },
          width: "96%",
          marginTop: "2px",
          marginLeft: "1%",
          borderRadius: "15px",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          paddingTop: "8px",
          paddingBottom: "8px",
          background: isSelectedTask ? "#EBF5FB" : "",
          cursor: "pointer",
        }}
        key={_id}
        id={_id}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseOut={() => setIsMouseOver(false)}
        onClick={() => handleClick(task)}
      >
        <Box
          sx={{
            width: "96%",
            marginLeft: "2%",
            height: "20px",
          }}
        >
          <Span
            sx={{
              // border: "solid 1px #E2E4E5",
              border: `solid 1px ${currentTaskColor}`,
              fontWeight: "700",
              padding: "3px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {taskUID}
          </Span>
          <Span
            sx={{
              fontSize: "12px",
              color: "#605C5C",
              marginLeft: "10px",
            }}
          >
            Kloostri 14
          </Span>
          <Span
            sx={{
              marginTop: "5px",
              float: "right",
            }}
          >
            {dueDate && dueDate !== "" ? (
              <Span
                sx={{
                  color: "#605C5C",
                  fontSize: "12px",
                }}
              >{`Due date ${formattedDate}`}</Span>
            ) : (
              <Span
                sx={{
                  color: "0d0d0d",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
              >{`Due date N/A`}</Span>
            )}
          </Span>
        </Box>
        <Box
          sx={{
            width: "96%",
            height: "max-content",
            marginLeft: "2%",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            marginTop: "10px",
            // border: "solid 1px green",
          }}
        >
          {files.length !== 0 ? (
            <Box
              sx={{
                borderRadius: "5px",
                position: "relative",
                minWidth: imgformat(files[0].fileType)
                  ? isXlScreen
                    ? "25%"
                    : "20%"
                  : "max-content",
              }}
            >
              {files.length > 0 && imgformat(files[0].fileType) ? (
                <CardMedia
                  component="img"
                  sx={{
                    height: "95px",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  // image={files[0].fileUrl}
                  image={
                    "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8"
                  }
                  alt={files[0].fileName}
                />
              ) : (
                getFileIconThumbnail(files[0]?.fileType, 50, 50)
              )}
              {files.length === 1 ? (
                ""
              ) : (
                <Span
                  sx={{
                    position: "absolute",
                    top: "72%",
                    left: "70%",
                    padding: "2.5px",
                    color: "white",
                    backgroundColor: "black",
                    opacity: "0.6",
                  }}
                >
                  {`+${files.length - 1}`}
                </Span>
              )}
            </Box>
          ) : (
            ""
          )}
          <Box
            sx={{
              minWidth: isXlScreen ? "75%" : "80%",
              width: "100%",
              maxHeight: "95px",
              height:
                files.length === 0
                  ? "max-content"
                  : !description
                  ? "max-content"
                  : "95px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: "-7px",
            }}
          >
            <Span
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                height: "max-content",
                maxHeight: "75px",
              }}
            >
              <Typography
                className="ellipsis"
                variant="subtitle1"
                sx={{
                  marginLeft: "10px",
                  fontWeight: "700",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "95%",
                }}
              >
                {title ? title.charAt(0).toUpperCase() + title.slice(1) : "N/A"}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#605C5C",
                  lineHeight: "20px",
                  marginLeft: "10px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                }}
              >
                {description && description}
              </Typography>
            </Span>
            <Box
              sx={{
                borderTop: "solid 1px #605C5C",
                marginTop: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Span
                sx={{
                  marginLeft: "10px",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "5px",
                  width: isDefualScreen ? "45%" : "50%",
                }}
              >
                <Avatar
                  alt="avater"
                  src={creator?.profilePic}
                  variant="circular"
                  sx={{ width: "25px", height: "25px", marginRight: "5px" }}
                />
                <Typography
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "#605C5C",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  {displayName}
                </Typography>
              </Span>
              <Span
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <Span
                  sx={{
                    color: "#605C5C",
                    fontWeight: 600,
                    marginRight: "5px",
                    fontSize: "12px",
                  }}
                >
                  {`${taskCreatedAt[0]}`}
                </Span>
                <Span
                  sx={{
                    color: "#605C5C",
                    fontWeight: 600,
                    fontSize: "12px",
                    marginRight: "10px",
                  }}
                >
                  {`${taskCreatedAt[1]}`}
                </Span>
                <OutlineIcon />
              </Span>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
});

export { TaskCard };
