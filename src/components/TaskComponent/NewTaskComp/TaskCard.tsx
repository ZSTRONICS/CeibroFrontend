import { Badge, Card, CardContent, CardHeader, Tooltip } from "@mui/material";
import {
  BoldLableTag,
  CustomStack,
  Span,
  SubHeadingTag,
  SubLabelTag,
} from "components/CustomTags";
import GenericMenu from "components/GenericMenu/GenericMenu";
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
    description,
    topic,
    creator,
    isCreator,
    seenBy,
    userSubState,
    assignedToState,
  } = task;

  const isSelectedTask: boolean = selectedTaskId === _id;
  const cardBorderColor = !isCreator ? "#ccc" : "#FFE7E7";
  const isCanceled: boolean = userSubState === "canceled";
  const assignToNames = () =>
    assignedToState.length > 0 ? (
      <Badge
        overlap="circular"
        color="primary"
        sx={{
          padding: "0 6px",
          width: "16px",
          height: "16px",
          "& .MuiBadge-badge": {
            width: "16px",
            height: "16px",
          },
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
        marginTop: "10px",
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
          pb: 1,
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
            <Span>{`Due date ${dueDate.replace(/-/g, ".") || "N/A"}`}</Span>
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
      <CardContent sx={{ pt: 0, "&:last-child": { pb: 0 } }}>
        <CustomStack justifyContent="space-between">
          <BoldLableTag>
            {isCanceled && !isCreator ? "From" : isTaskFromMe}
            &nbsp;{" "}
            <span style={{ fontWeight: "500", fontSize: "11px" }}>
              {" "}
              {`${creator.firstName} ${creator.surName}`}
            </span>
          </BoldLableTag>
          {assignToNames()}
          <BoldLableTag
            sx={{ display: "flex", maxWidth: "120px", WebkitLineClamp: 1 }}
            className="textOverflowDescription"
          >
            Project: &nbsp;{" "}
            <span
              style={{
                fontWeight: "500",
                fontSize: "11px",
              }}
            >
              {project ? project.title : "N/A"}
            </span>
          </BoldLableTag>
        </CustomStack>

        <SubHeadingTag
          className="ellipsis"
          sx={{ maxWidth: "300px", color: "black", pb: 0.1 }}
        >
          {topic.topic || "N/A"}
        </SubHeadingTag>

        <SubLabelTag
          className="textOverflowDescription"
          sx={{
            maxWidth: "350px",
            WebkitLineClamp: 1,
          }}
        >
          {description || "No description"}
        </SubLabelTag>
      </CardContent>
    </Card>
  );
}

export { TaskCard };
