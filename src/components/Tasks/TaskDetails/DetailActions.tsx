import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Box, Chip, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DragableDrawer from "Drawer/DragableDrawer";
import { LoadingButton } from "components/Button";
import { ReplyIcon } from "components/material-ui/icons";
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
  title: string;
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
    taskId,
    title,
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
  const isMiniScreen = useMediaQuery(theme.breakpoints.down(1100));
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
    <Box
      sx={{
        // border: "solid 1px red",
        maxWidth: "100%",
        width: "max-content",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      {!["done", "canceled", "new"].includes(userSubState) && (
        <>
          {/* //// */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F4F4F4",
              marginRight: "10px",
              padding: "2px 2px",
              borderRadius: "4px",
              // width: "90px",
            }}
          >
            <LoadingButton
              // startIcon={<ReplyIcon />}
              onClick={() => handleClick("comment")}
              variant="outlined"
              sx={{
                width:
                  isLocationTaskDetail && isMinitabdown
                    ? "100%"
                    : "max-content",
                borderRadius: "4px",
                fontWeight: "700",
                // padding: "0px 16px",
                // marginBottom: isTabletdown ? "10px" : "",
                alignSelf: "flex-end",
                backgroundColor: "transparent",
                border: "none",
                "&:hover": {
                  // Correct syntax for hover
                  border: "none",
                },
                span: {
                  mr: "4px",
                },
              }}
            >
              <ReplyIcon />
            </LoadingButton>
            <Box
              sx={{
                border: "solid 1px green",
                height: "20px",
                width: "0.5px",
                backgroundColor: "rgb(226,228,229)",
              }}
            ></Box>
            <LoadingButton
              // startIcon={<ForwardIcon />}
              onClick={() => handleClick("forward")}
              variant="outlined"
              disabled={false}
              sx={{
                borderRadius: "4px",
                fontWeight: "700",
                backgroundColor: "transparent",
                border: "none",
                // marginBottom: isTabletdown ? "10px" : "",
                "&:hover": {
                  // Correct syntax for hover
                  border: "none",
                },
                span: {
                  marginRight: "4px",
                },
              }}
            >
              <PersonAddOutlinedIcon />
            </LoadingButton>
          </Box>
          {/* //// */}
          <Box sx={{ position: "relative" }}>
            <LoadingButton
              // variant="contained"
              // onClick={handleDoneClick}
              sx={{
                width: "95px",
                borderRadius: "4px",
                fontWeight: "700",
                border: "1px solid #F4F4F4",
                marginRight: "10px",
                backgroundColor: "#F4F4F4",
                // width: isTabletdown ? "100%" : "100px",
              }}
              disabled={isloading}
            >
              Hide
            </LoadingButton>
            <LoadingButton
              variant="contained"
              onClick={handleDoneClick}
              sx={{
                width: "95px",
                borderRadius: "4px",
                fontWeight: "700",
                border: "1px solid #0076C8",
                // width: isTabletdown ? "100%" : "100px",
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
    </Box>
  );

  // const HeaderBtns = (
  //   <>
  //     <LoadingButton
  //       startIcon={<ReplyIcon />}
  //       onClick={() => handleClick("comment")}
  //       variant="outlined"
  //       sx={{
  //         width: isLocationTaskDetail && isMinitabdown ? "100%" : "max-content",
  //         borderRadius: "4px",
  //         fontWeight: "700",
  //         border: "1px solid #0076C8",
  //         padding: "0px 16px",
  //         marginBottom: isTabletdown ? "10px" : "",
  //         alignSelf: "flex-end",
  //         span: {
  //           mr: "4px",
  //         },
  //       }}
  //     >
  //       Reply
  //     </LoadingButton>
  //     {!["done", "canceled", "new"].includes(userSubState) && (
  //       <>
  //         <LoadingButton
  //           startIcon={<ForwardIcon />}
  //           onClick={() => handleClick("forward")}
  //           variant="outlined"
  //           disabled={false}
  //           sx={{
  //             borderRadius: "4px",
  //             fontWeight: "700",
  //             border: "1px solid #0076C8",
  //             padding: "0px 12px",
  //             marginBottom: isTabletdown ? "10px" : "",
  //             span: {
  //               marginRight: "4px",
  //             },
  //           }}
  //         >
  //           Forward
  //         </LoadingButton>
  //         <Box sx={{ position: "relative" }}>
  //           <LoadingButton
  //             variant="contained"
  //             onClick={handleDoneClick}
  //             sx={{
  //               borderRadius: "4px",
  //               fontWeight: "700",
  //               border: "1px solid #0076C8",
  //               padding: "0px 16px",
  //               width: isTabletdown ? "100%" : "100px",
  //             }}
  //             disabled={isloading}
  //           >
  //             Done
  //           </LoadingButton>
  //           {(doneCommentsRequired || doneImageRequired) && (
  //             <span
  //               style={{
  //                 height: "10px",
  //                 width: "10px",
  //                 backgroundColor: "red",
  //                 borderRadius: "50%",
  //                 display: "inline-block",
  //                 position: "absolute",
  //                 top: "13%",
  //                 right: "6%",
  //               }}
  //             ></span>
  //           )}
  //         </Box>
  //       </>
  //     )}
  //   </>
  // );

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
      }}
    />
  );

  return (
    // <>
    //   <Grid container justifyContent="space-between" rowGap={1.25}>
    //     <Grid item>
    //       <Box
    //         sx={{
    //           width: "max-content",
    //           paddingRight: "8px",
    //         }}
    //       >
    //         {userSUBState}
    //       </Box>
    //       <SubHeading sx={{ color: "black", fontSize: 16, pt: 1 }}>
    //         {title ? title.charAt(0).toUpperCase() + title.slice(1) : ""}
    //       </SubHeading>
    //     </Grid>
    //     <Grid
    //       item
    //       container
    //       xs={12}
    //       gap={1.4}
    //       justifyContent={justifyContent}
    //       flexWrap="nowrap"
    //     >
    //       {isLocationTaskDetail && isMinitabdown ? (
    //         <>
    //           <Box
    //             sx={{
    //               display: "flex",
    //               justifyContent: "space-between",
    //               width: calculateWidth(),
    //               transition: "all 0.3s linear",
    //               flexDirection: isTabletdown ? "column" : "row",
    //             }}
    //           >
    //             {HeaderBtns}
    //           </Box>
    //         </>
    //       ) : (
    //         <>{HeaderBtns}</>
    //       )}
    //     </Grid>
    //   </Grid>
    //   <DragableDrawer
    //     title={getTitle()}
    //     children={getModalContent()}
    //     openModal={openModal}
    //     closeModal={closeModal}
    //     isOpen={isOpen}
    //   />
    // </>

    <>
      <Grid
        container
        justifyContent="space-between"
        // rowGap={1.25}
        xs={12}
      >
        <Grid
          item
          container
          // xs={ isMiniScreen ? 4 : (!isTabletdown ? 7 : 5)}
          xl={8}
          lg={6}
          md={12}
          sm={12}
          xs={12}
          sx={{ width: "100%" }}
        >
          <Grid container item xs={12}>
            <Grid container item xs={12}>
              <Box
                sx={{
                  width: "max-content",
                  paddingRight: "8px",
                }}
              >
                {userSUBState}
              </Box>
            </Grid>
          </Grid>

          <Grid item sx={{ marginTop: "10px", fontWeight: "600" }}>
            {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
            recusandae totam autem quaerat illo */}
            {title ? title.charAt(0).toUpperCase() + title.slice(1) : ""}
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          item
          xl={4}
          lg={6}
          md={12}
          sm={12}
          xs={12}
          // xs={!isTabletdown ? 5 : 7}
        >
          <>{HeaderBtns}</>
        </Grid>
        {/* <Grid
        item
        container
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
      </Grid> */}
      </Grid>
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
