import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import { Span } from "components/CustomTags";
import { getFileIconThumbnail } from "components/Utills/FileBox";
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
  // menuOption: MenuOption[];
  // disableMenu: boolean;
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

  return (
    <>
      <Card
        sx={{
          ":hover": {
            boxShadow: "inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          },
          width: "96%",
          marginTop: "15px",
          marginLeft: "2%",
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
            height: "20%",
          }}
        >
          <Span
            sx={{
              border: "solid 1px #E2E4E5",
              fontWeight: "700",
              padding: "3px",
              borderRadius: "4px",
              fontSize: "12px",
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
              fontSize: "12px",
              marginTop: "5px",
              float: "right",
            }}
          >
            {dueDate && dueDate !== "" ? (
              <Span
                sx={{
                  color: "#605C5C",
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
          </Span>
        </Box>
        <Box
          sx={{
            width: "96%",
            height: "80%",
            marginLeft: "2%",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          {files.length !== 0 ? (
            <Box
              sx={{
                borderRadius: "5px",
                position: "relative",
                marginTop: "5px",
              }}
            >
              {files.length > 0 && files[0].fileTag === "image" ? (
                <CardMedia
                  component="img"
                  sx={{
                    height: "78px",
                    borderRadius: "5px",
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
              {files.length === 0 ? (
                ""
              ) : (
                <Span
                  sx={{
                    position: "absolute",
                    top: "72%",
                    left: "78%",
                    padding: "2.5px",
                    color: "white",
                    backgroundColor: "black",
                    opacity: "0.6",
                  }}
                >
                  {`+${files.length}`}
                </Span>
              )}
            </Box>
          ) : (
            ""
          )}
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "700", marginLeft: "10px" }}
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
            <Box
              sx={{
                borderTop: "solid 1px #605C5C",
                marginTop: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Span
                // className="textOverflowDescription"
                sx={{
                  marginLeft: "10px",
                  color: "#605C5C",
                  width: "max-content",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <Avatar
                  alt="avater"
                  src={creator?.profilePic}
                  variant="circular"
                  sx={{ width: "25px", height: "25px", marginRight: "5px" }}
                />
                {displayName}
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
                    color: "0d0d0d",
                    fontWeight: 600,
                    marginRight: "5px",
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
                <AssignmentTurnedInOutlinedIcon />{" "}
              </Span>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
});

export { TaskCard };
