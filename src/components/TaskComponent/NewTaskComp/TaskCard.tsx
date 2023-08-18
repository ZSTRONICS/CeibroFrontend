import { Card, CardContent, CardHeader } from "@mui/material";
import {
  BoldLableTag,
  CustomStack,
  Span,
  SubHeadingTag,
  SubLabelTag,
} from "components/CustomTags";
import GenericMenu from "components/GenericMenu/GenericMenu";
import { momentdeDateFormat } from "components/Utills/Globals";
import { Task } from "constants/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";

interface IProps {
  task: Task;
  selectedTaskId: string | undefined;
  handleClick: (task: Task) => void;
  menuOption: any;
  disableMenu: boolean;
}

function TaskCard(props: IProps) {
  const { user } = useSelector((store: RootState) => store.auth);
  const { selectedTaskFilter } = useSelector((store: RootState) => store.task);
  const { task, handleClick, selectedTaskId, menuOption, disableMenu } = props;
  const dispatch = useDispatch();
  const userId = user && String(user._id);
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
    userSubState,
    seenBy,
  } = task;

  const isSelectedTask: boolean = selectedTaskId === _id;
  const taskCreated = momentdeDateFormat(createdAt);

  return (
    <Card
      sx={{
        width: "100%",
        minWidth: 280,
        marginTop: "10px",
        cursor: "pointer",
        border: "1px solid #818181",
        borderRadius: 1,
        padding: "5px 9px",
        borderTop: "none",
        background:
          !task.seenBy.includes(userId) &&
          !(
            selectedTaskFilter === "allTaskFromMe" &&
            task.creatorState === "unread"
          )
            ? "#EBF5FB"
            : "",
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
            <Span>{`Due date ${dueDate.replace(/-/g, ".") ?? ""}`}</Span>
          </CustomStack>
        }
        title=""
        action={
          <CustomStack>
            {/* <assets.DoneAllIcon
              sx={{
                color: `${seenBy.includes(userId) ? "#0076C8" : "#0000008A"}`,
              }}
            /> */}
            <GenericMenu
              options={menuOption}
              key={_id}
              disableMenu={disableMenu}
            />
          </CustomStack>
        }
      />
      <CardContent sx={{ pt: 0, "&:last-child": { pb: 0 } }}>
        <CustomStack justifyContent="space-between">
          <BoldLableTag>
            To:&nbsp;{" "}
            <span style={{ fontWeight: "500", fontSize: "11px" }}>
              {" "}
              {`${creator.firstName} ${creator.surName}`}
            </span>
          </BoldLableTag>
          <BoldLableTag>
            Project: &nbsp;{" "}
            <span style={{ fontWeight: "500", fontSize: "11px" }}>
              {project ? project.title : "N/A"}
            </span>
          </BoldLableTag>
        </CustomStack>

        <SubHeadingTag
          className="ellipsis"
          sx={{ maxWidth: "300px", color: "black", pb: 1 }}
        >
          {topic.topic ?? "N/A"}
        </SubHeadingTag>

        <SubLabelTag
          className="textOverflowDescription"
          sx={{
            maxWidth: "350px",
            WebkitLineClamp: 1,
          }}
        >
          {description ?? "No description"}
        </SubLabelTag>
      </CardContent>
      {/*   <CardActions sx={{ py: 0.4, background: "#F4F4F4" }}>
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
      </CardActions>*/}
    </Card>
  );
}

export { TaskCard };
