import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Span } from "components/CustomTags";
import { getFileIconThumbnail } from "components/Utills/FileBox";
import {
  MEDIA_EXT,
  convertDateFormat,
  momentLocalDateTime,
} from "components/Utills/Globals";
import {
  CancelTaskIcon,
  DoneTaskIcon,
  NewTaskIcon,
  OngoingTaskIcon,
  PendingTaskIcon,
  ViewerTaskIcon,
} from "components/material-ui/icons/TaskCardIcon";
import { ITask } from "constants/interfaces";
import React from "react";
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
  const { task, handleClick, selectedTaskId } = props;

  const {
    files,
    taskUID,
    project,
    _id,
    dueDate,
    createdAt,
    description,
    creator,
    userSubState,
    creatorState,

    isCreator,
    isAssignedToMe,
    isTaskConfirmer,
    isTaskViewer,
    isTaskInApproval,
    isCanceled,
    taskRootState,
    title,
  } = task;
  const iconMappings: Record<string, JSX.Element> = {
    Cancelled: <CancelTaskIcon />,
    NewTaskByCreator: <NewTaskIcon />,
    Done: <DoneTaskIcon />,
    Pending: <PendingTaskIcon />,
    Ongoing: <OngoingTaskIcon />,
    Viewer: <ViewerTaskIcon />,
  };

  const getTaskCardIcon = (
    taskRootState: string,
    userSubState: string,
    creatorState: string,
    isCreator: boolean,
    isAssignedToMe: boolean,
    isTaskConfirmer: boolean,
    isTaskViewer: boolean
  ): JSX.Element => {
    if (taskRootState === "Approval") return iconMappings.Pending;
    if (taskRootState === "Ongoing") {
      if (isCreator || isTaskViewer || isTaskConfirmer) {
        if (creatorState === "unread") {
          return iconMappings.NewTaskByCreator;
        } else if (creatorState === "ongoing") {
          return iconMappings.Ongoing;
        }
      } else if (isAssignedToMe) {
        if (userSubState === "new") {
          return iconMappings.NewTaskByCreator;
        } else if (userSubState === "ongoing") {
          return iconMappings.Ongoing;
        }
      }
    }
    if (taskRootState === "Closed") {
      if (userSubState === "done") {
        return iconMappings.Done;
      } else if (userSubState === "reject-closed") {
        return iconMappings.Cancelled;
      }
    }
    if (taskRootState === "Canceled") return iconMappings.Cancelled;
    return iconMappings.Viewer;
  };

  const taskCreatedAt = momentLocalDateTime(createdAt).split(" ");
  const formattedDate = convertDateFormat(dueDate);
  const isSelectedTask: boolean = selectedTaskId === _id;

  const { firstName = "", surName = "" } = creator || {};
  const displayName = `${firstName || ""} ${surName || ""}`;
  const theme = useTheme();
  const isXlScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const isDefualScreen = useMediaQuery(theme.breakpoints.between(1200, 1350));

  const currentTaskColor =
    MUI_TASK_CARD_COLOR_MAP.get(task.userSubState) || "#CFECFF";

  let emptyDiv = false;

  if (emptyDiv) {
    return <></>;
  }

  const FormagttedDateSplit = (date: any) => {
    return date.slice(0, -4) + date.slice(-2);
  };

  return (
    <>
      <Card
        sx={{
          ":hover": {
            boxShadow:
              "inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          },
          width: "96%",
          marginLeft: "3%",
          borderRadius: "15px",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          paddingTop: "8px",
          paddingBottom: "8px",
          background: isSelectedTask ? "#EBF5FB" : "",
          cursor: "pointer",
        }}
        key={_id}
        id={_id}
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
              border: `1px solid ${currentTaskColor}`,
              fontWeight: "700",
              padding: "3px",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            {taskUID}
          </Span>
          <Typography
            sx={{
              fontSize: "10px",
              color: "#605C5C",
              marginLeft: "10px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: isXlScreen ? "25%" : "45%",
              display: "inline-block",
              transform: "translateY(4px)",
            }}
          >
            {project?.title}
          </Typography>
          <Span sx={{ mt: "5px", float: "right" }}>
            {dueDate && dueDate !== "" ? (
              <Span
                sx={{
                  color: "#605C5C",
                  fontSize: "12px",
                }}
              >{`Due Date: ${FormagttedDateSplit(formattedDate)}`}</Span>
            ) : (
              <Span
                sx={{
                  color: "#605C5C",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
              >
                {/* {``} */}
                {`Due date N/A`}
              </Span>
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
          }}
        >
          {files.length !== 0 ? (
            <Box
              sx={{
                borderRadius: "5px",
                height: "75px",
                position: "relative",
                width: isXlScreen ? "90px" : "90px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "solid 1px #dbdbdb",
                overflow: "hidden",
              }}
            >
              {files.length > 0 && MEDIA_EXT.includes(files[0].fileType) ? (
                <CardMedia
                  component="img"
                  sx={{
                    height: "75px",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  image={files[0].fileUrl}
                  alt={files[0].fileName}
                />
              ) : (
                getFileIconThumbnail(files[0]?.fileType, 40, 40)
              )}
              {files.length === 1 ? (
                ""
              ) : (
                <Span
                  sx={{
                    position: "absolute",
                    top: "68%",
                    left: "66%",
                    width: "25px",
                    height: "24.5px",
                    color: "white",
                    backgroundColor: "#00000059",
                    borderRadius: "6px 0px 4px 0px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
              maxHeight: "100px",
              height: files.length !== 0 ? "80px" : "max-content",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: "-7px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                height: "max-content",
                maxHeight: "60px",
              }}
            >
              <Typography
                sx={{
                  marginLeft: files.length !== 0 ? "10px" : "0px",
                  fontWeight: "500",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "95%",
                  fontSize: "13px",
                  marginTop: "5px",
                  color: "black",
                }}
              >
                {title ? title.charAt(0).toUpperCase() + title.slice(1) : "N/A"}
              </Typography>
              <Typography
                sx={{
                  color: "#605C5C",
                  lineHeight: "18px",
                  marginLeft: "10px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                  fontSize: "12px",
                  marginTop: "-2px",
                }}
              >
                {description ? description : ""}
              </Typography>
            </Box>
            <Box
              sx={{
                borderTop: "1px solid #605C5C",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "1px",
              }}
            >
              <Span
                sx={{
                  marginLeft: files.length !== 0 ? "10px" : "0px",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "3px",
                  width: isDefualScreen ? "45%" : isXlScreen ? "40%" : "60%",
                }}
              >
                <Avatar
                  alt="avater"
                  src={creator?.profilePic}
                  variant="circular"
                  sx={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                <Typography
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "#605C5C",
                    fontSize: "12px",
                    fontWeight: "700",
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
                {getTaskCardIcon(
                  taskRootState,
                  userSubState,
                  creatorState,
                  isCreator,
                  isAssignedToMe,
                  isTaskConfirmer,
                  isTaskViewer
                )}
              </Span>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
});

export { TaskCard };
