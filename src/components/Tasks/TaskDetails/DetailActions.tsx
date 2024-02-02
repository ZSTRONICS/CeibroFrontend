import { Box, Chip, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DragableDrawer from "Drawer/DragableDrawer";
import { LoadingButton } from "components/Button";
import { SubLabelTag } from "components/CustomTags";
import { ForwardIcon, ReplyIcon } from "components/material-ui/icons";
import { TASK_CONFIG } from "config";
import { AssignedUserState, InvitedNumber } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { DynamicDimensions } from "hooks/useDynamicDimensions";
import { capitalize } from "lodash";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import Comment from "../Comment";
import ForwardTask from "../Forward-Task";

interface IProps {
  taskId: string;
  userSubState: string;
  dueDate: string | null;
  taskUid: string;
  createdOn: Date | any;
  doneImageRequired: boolean;
  doneCommentsRequired: boolean;
  assignedToState: AssignedUserState[];
  invitedNumbers: InvitedNumber[];
  isExpanded: boolean;
  DrawDetailCollapse: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  taskDetailContDimension: DynamicDimensions | undefined;
  isLocationTaskDetail?: boolean;
}

enum statusColors {
  new = "#CFECFF",
  unread = "#CFECFF",
  ongoing = "#F1B740",
  done = "#55BCB3",
  canceled = "#FFE7E7",
}
type TaskAction = "comment" | "forward" | "done";

const DetailActions: React.FC<IProps> = (props) => {
  const { subtask, filterkey } = useParams<any>();
  const [isPending, startTransition] = useTransition();
  const {
    userSubState,
    taskUid,
    dueDate,
    createdOn,
    taskId,
    doneImageRequired,
    doneCommentsRequired,
    assignedToState,
    invitedNumbers,
    isExpanded,
    DrawDetailCollapse,
    setIsExpanded,
    taskDetailContDimension,
    isLocationTaskDetail,
  } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { isOpen, closeModal, openModal } = useOpenCloseModal();
  const [taskAction, setTaskAction] = useState<TaskAction>("comment");
  const [isloading, setIsLoading] = useState(false);
  const taskDragContHeight = useSelector(
    (store: RootState) => store.task.taskDragContHeight
  );
  const handleClick = (action: TaskAction) => {
    setTaskAction(action);
    dispatch({
      type: TASK_CONFIG.TASK_DRAGABLE_CONTAINER_HEIGHT,
      payload:
        taskDragContHeight === 0
          ? window.innerHeight < 768
            ? 140
            : 200
          : taskDragContHeight,
    });
    openModal();
  };

  const handleDoneClick = () => {
    setIsLoading(true);
    if (doneImageRequired === true || doneCommentsRequired === true) {
      setIsLoading(false);
      handleClick("done");
    } else {
      dispatch(
        taskActions.taskEventsWithFiles({
          other: {
            eventName: "doneTask",
            taskId: taskId,
            hasFiles: false,
          },
          success: (res: any) => {
            !isLocationTaskDetail &&
              history.push(`/tasks/${subtask}/${filterkey}`);
            setIsLoading(false);
            if (res) {
              dispatch({
                type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
                payload: res.data.data,
              });
            }
          },
          onFailAction: () => {
            setIsLoading(false);
          },
        })
      );
    }
  };

  const theme = useTheme();
  const isTabletdown = useMediaQuery(theme.breakpoints.down(1400));
  const isMinitabdown = useMediaQuery(theme.breakpoints.down(1200));
  const isXlscreendown = useMediaQuery(theme.breakpoints.down("xl"));

  const chipColor: string =
    statusColors[userSubState as keyof typeof statusColors];

  const getModalContent = () => {
    if (taskAction === "forward")
      return (
        <ForwardTask
          taskDetailContDimension={taskDetailContDimension}
          invitedNumbers={invitedNumbers}
          assignedToState={assignedToState}
          taskId={taskId}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      );
    return (
      <Comment
        doneCommentsRequired={doneCommentsRequired}
        doneImageRequired={doneImageRequired}
        title={getTitle()}
        showHeader={true}
        taskId={taskId}
        closeModal={closeModal}
      />
    );
  };

  const titles = {
    comment: "New comment",
    forward: "Forward",
    done: "Task Done",
  };

  const justifyContent = {
    xs: "flex-start",
    md: "flex-end",
  };
  const handleFullView = () => {
    let showFullViewData;
    const data = localStorage.getItem("showFullView");
    if (data) {
      showFullViewData = JSON.parse(data);
    }
    localStorage.setItem(
      "showFullView",
      JSON.stringify({ ...showFullViewData, [taskUid]: !isExpanded })
    );
    startTransition(() => {
      setIsExpanded(!isExpanded);
    });
  };
  const getTitle = () => titles[taskAction] || "";

  const calculateWidth = () => {
    switch (true) {
      case DrawDetailCollapse && !isTabletdown:
        return "52%";
      case !DrawDetailCollapse && !isTabletdown:
        return "85%";
      case DrawDetailCollapse && isTabletdown:
      case !DrawDetailCollapse && isTabletdown:
        return "100%";
      default:
        return "initial";
    }
  };

  const HeaderBtns = (
    <>
      <LoadingButton
        startIcon={<ReplyIcon />}
        onClick={() => handleClick("comment")}
        variant="outlined"
        sx={{
          width: isLocationTaskDetail && isMinitabdown ? "100%" : "max-content",
          borderRadius: "4px",
          fontWeight: "700",
          border: "1px solid #0076C8",
          padding: "0px 16px",
          marginBottom: isTabletdown ? "10px" : "",
          alignSelf: "flex-end",
          span: {
            mr: "4px",
          },
        }}
      >
        Reply
      </LoadingButton>
      {!["done", "canceled", "new"].includes(userSubState) && (
        <>
          <LoadingButton
            startIcon={<ForwardIcon />}
            onClick={() => handleClick("forward")}
            variant="outlined"
            disabled={false}
            sx={{
              borderRadius: "4px",
              fontWeight: "700",
              border: "1px solid #0076C8",
              padding: "0px 12px",
              marginBottom: isTabletdown ? "10px" : "",
              span: {
                marginRight: "4px",
              },
            }}
          >
            Forward
          </LoadingButton>
          <Box sx={{ position: "relative" }}>
            <LoadingButton
              variant="contained"
              onClick={handleDoneClick}
              sx={{
                borderRadius: "4px",
                fontWeight: "700",
                border: "1px solid #0076C8",
                padding: "0px 16px",
                width: isTabletdown ? "100%" : "100px",
              }}
              disabled={isloading}
            >
              Done
            </LoadingButton>
            {(doneCommentsRequired || doneImageRequired) && (
              <span
                style={{
                  height: "10px",
                  width: "10px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  display: "inline-block",
                  position: "absolute",
                  top: "13%",
                  right: "6%",
                }}
              ></span>
            )}
          </Box>
        </>
      )}
    </>
  );

  const userSUBState = (
    <Chip
      label={capitalize(userSubState)}
      size="small"
      sx={{
        borderColor: chipColor,
        backgroundColor: chipColor,
        borderRadius: "4px",
        fontFamily: "Inter",
        fontSize: "12px",
        fontWeight: 600,
        color: "#131516",
        padding: "2px 8px",
      }}
    />
  );
  const TaskUID = (
    <Chip
      label={taskUid}
      size="small"
      sx={{
        borderColor: "#818181",
        backgroundColor: "white",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "5px",
        fontFamily: "Inter",
        fontSize: "12px",
        fontWeight: 600,
        color: "#131516",
        padding: "2px 8px",
        marginLeft:
          !isXlscreendown && isLocationTaskDetail && DrawDetailCollapse
            ? "-3.5px"
            : !isXlscreendown && isLocationTaskDetail && !DrawDetailCollapse
            ? "-4.5px"
            : "",
        // !isLgscreendown && isLocationTaskDetail && !DrawDetailCollapse ? '-20px' : '',
      }}
    />
  );

  return (
    <>
      <Grid
        container
        mb={1.5}
        justifyContent="end"
        alignItems="flex-start"
        rowGap={2}
        sx={{ display: "flex", justifyContent: "end" }}
      >
        <Grid
          item
          container
          md={12}
          xs={12}
          gap={1.4}
          justifyContent={justifyContent}
          flexWrap="nowrap"
        >
          {isLocationTaskDetail && isMinitabdown ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: calculateWidth(),
                  transition: "all 0.3s linear",
                  flexDirection: isTabletdown ? "column" : "row",
                }}
              >
                {HeaderBtns}
              </Box>
            </>
          ) : (
            <>{HeaderBtns}</>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        my={1.5}
        justifyContent={"space-between"}
        alignItems={`${isLocationTaskDetail ? "center" : "flex-start"}`}
        rowGap={2}
      >
        <Grid
          item
          container
          xs={12}
          md={isLocationTaskDetail ? (DrawDetailCollapse ? 12 : 12) : 10}
          lg={isLocationTaskDetail ? (!DrawDetailCollapse ? 9 : 10) : 10}
          xl={isLocationTaskDetail ? (!DrawDetailCollapse ? 12 : 10) : 10}
          gap={isLocationTaskDetail ? 0.3 : 1.7}
          alignItems="center"
        >
          {isLocationTaskDetail ? (
            <>
              <Grid
                xs={8}
                md={!DrawDetailCollapse ? 5 : 3.5}
                lg={!DrawDetailCollapse ? 3 : 2.1}
                xl={!DrawDetailCollapse ? 1.8 : 1.9}
              >
                {userSUBState}
              </Grid>
              <Grid
                xs={8}
                md={!DrawDetailCollapse ? 5 : 3}
                lg={!DrawDetailCollapse ? 5 : 2.5}
                xl={!DrawDetailCollapse ? 2 : 1.9}
              >
                {TaskUID}
              </Grid>
              <Grid
                xs={8}
                md={!DrawDetailCollapse ? 12 : 12}
                lg={!DrawDetailCollapse ? 12 : 6}
                xl={!DrawDetailCollapse ? 5.5 : 7}
              >
                <Grid container gap={0.5}>
                  <Grid
                    md={!DrawDetailCollapse ? 5 : 3.5}
                    lg={!DrawDetailCollapse ? 12 : 12}
                    xl={!DrawDetailCollapse ? 12 : 12}
                  >
                    <SubLabelTag sx={{ color: "#131516" }}>
                      {createdOn}
                    </SubLabelTag>
                  </Grid>
                  <Grid
                    md={!DrawDetailCollapse ? 6.7 : 7}
                    lg={!DrawDetailCollapse ? 12 : 12}
                    xl={!DrawDetailCollapse ? 12 : 12}
                  >
                    {dueDate && (
                      <SubLabelTag sx={{ color: "#131516" }}>
                        Due date: {dueDate}
                      </SubLabelTag>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              {userSUBState}
              {TaskUID}
              <SubLabelTag sx={{ color: "#131516" }}>{createdOn}</SubLabelTag>
              {dueDate && (
                <SubLabelTag sx={{ color: "#131516" }}>
                  Due date: {dueDate}
                </SubLabelTag>
              )}
            </>
          )}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Typography
            sx={{
              cursor: "pointer",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "400",
              color: "#0076C8",
            }}
            onClick={() => handleFullView()}
          >
            {isExpanded ? "View less" : "View more"}
          </Typography>
        </Box>
      </Grid>
      {/* {isOpen === true && (
        <CustomModal
          maxWidth={"sm"}
          showFullWidth={true}
          showDivider={true}
          showCloseBtn={true}
          title={getTitle()}
          isOpen={false}
          handleClose={closeModal}
          children={getModalContent()}
        />
      )} */}
      <DragableDrawer
        title={getTitle()}
        children={getModalContent()}
        openModal={openModal}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  );
};

export default DetailActions;
