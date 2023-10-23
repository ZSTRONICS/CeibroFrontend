import {
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
    seenBy,
    userSubState,
    assignedToState,
  } = task;
  const taskCreatedAt = momentLocalDateTime(createdAt).split(' ');
  const isSelectedTask: boolean = selectedTaskId === _id;
  const cardBorderColor = !isCreator ? "#ccc" : "#FFE7E7";
  const isCanceled: boolean = userSubState === "canceled";
  const assignToNames = () =>
    assignedToState.length > 0 ? (
      <Tooltip title={AssignedToList(assignedToState)}>
        <span style={{
          fontWeight: "600",
          fontSize: "11px",
          padding: "4px",
          backgroundColor: "transparent",
        }}>
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
        border: `${isCanceled ? `3px solid ${cardBorderColor}` : "1px solid #818181"
          }`,
        borderRadius: 2,
        // padding: "3px 4px",
        // paddingTop: "0px",
        borderTop: "none",
        background: !seenBy.includes(userId) ? "#EBF5FB" : "",
        WebkitBoxShadow: `${isSelectedTask === true ? "0px -4px 0px 0px #3b95d3" : "none"
          }`,
      }}
      key={_id}
      id={_id}
      onClick={() => handleClick(task)}
    >
      <CardHeader
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 0,
          pl: 0,
          pb: 0,
          pr: 0.1,
        }}
        title={
          <CustomStack gap={1}>
            <Span
              sx={{
                color: "0d0d0d",
                fontWeight: 600,
                border: "1px solid #818181",
                borderRadius: 1,
                padding: "2px 9px",
              }}
            >
              {taskUID}
            </Span>
            <Span sx={{
              color: "0d0d0d",
              fontWeight: 600,
            }}>
              {`${taskCreatedAt[0]}`}
            </Span>

            <Span sx={{
              color: "0d0d0d",
              fontWeight: 600,
            }}>
              {`${taskCreatedAt[1]}`}
            </Span>

            {momentdeDateFormat(dueDate) === "N/A" ? <></> : <Span>{`Due date ${momentdeDateFormat(dueDate)}`}</Span>}
          </CustomStack>
        }

        action={
          <CustomStack>
            <GenericMenu
              options={menuOption}
              key={_id}
              disableMenu={disableMenu || !isSelectedTask}
              paddingTop={0}
            />
          </CustomStack>
        }
      />

      <CardContent sx={{
        pl: 1.5,
        pt: 0, "&:last-child": { pb: 0 }
      }}>
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
          {topic?.topic ? topic.topic.charAt(0).toUpperCase() + topic.topic.slice(1) : "N/A"}
        </SubHeadingTag>

        <SubLabelTag
          className="textOverflowDescription"
          sx={{
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

