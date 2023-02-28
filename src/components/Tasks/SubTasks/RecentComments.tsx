import { Divider, makeStyles } from "@material-ui/core";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CButton from "components/Button/Button";
import { CBox } from "components/material-ui";
import {
  AttachmentIcon,
  EyeIcon,
  SendIcon,
} from "components/material-ui/icons";
import CustomModal from "components/Modal";
import {
  CustomBadge,
  CustomStack,
} from "components/TaskComponent/Tabs/TaskCard";
import UploadDocs from "components/uploadImage/UploadDocs";
import {
  momentdeDateFormat,
  momentTimeFormat,
} from "components/Utills/Globals/Common";
import { DOCS_CONFIG } from "config/docs.config";
import {
  RecentCommentsInterface,
  SubtaskInterface,
} from "constants/interfaces/subtask.interface";
import CDrawer from "Drawer/CDrawer";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import taskActions from "redux/action/task.action";
import { RootState } from "redux/reducers";
import RecentCommentsList from "./RecentCommentsList";
import ViewRejectionComments from "./ViewRejectionComments";

interface Props {
  subtaskDetail: SubtaskInterface;
}

export default function RecentComments({ subtaskDetail }: Props) {
  const dispatch = useDispatch();
  const [openViewAllCommentsDrawer, setOpenViewAllCommentsDrawer] =
    useState<boolean>(false);

  const [userNewComment, setUserNewComment] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.auth);
  const { getAllCommentsOfSubtaskLoading, getAllRecentCommentsOfSubtask } =
    useSelector((state: RootState) => state.task);
  const classes = useStyles();
  const myState = subtaskDetail.state.find(
    (localState: any) => String(localState.userId) === String(user._id)
  );
  const [attachmentViewOpen, setAttachmentViewOpen]: any = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState<any>({
    moduleId: "",
    moduleName: "SubTaskComments",
    files: [],
  });

  const handleSendRecentComment = (e: any) => {
    e.stopPropagation();
    const payload = {
      taskId: subtaskDetail.taskId,
      subTaskId: subtaskDetail._id,
      isFileAttached: selectedAttachments.files.length > 0 ? true : false,
      sender: user._id,
      userState: myState && myState.userState,
      message: userNewComment,
      seenBy: [user._id],
    };

    if (selectedAttachments.files.length > 0) {
      dispatch({
        type: DOCS_CONFIG.SET_SELECTED_FILES_TO_BE_UPLOADED,
        payload: selectedAttachments,
      });
    }
    dispatch(
      taskActions.postSubtaskComment({
        body: payload,
        success: (res) => {
          setUserNewComment("");
          setSelectedAttachments({
            moduleId: "",
            moduleName: "SubTaskComments",
            files: [],
          });
          //   dispatch({
          //     type: TASK_CONFIG.PUSH_NEW_COMMENT_IN_STORE,
          //     payload: res.data.result,
          //   });
        },
      })
    );
  };

  const handleViewAllComments = () => {
    setOpenViewAllCommentsDrawer((prev: boolean) => !prev);
  };

  const handleOpenCloseAttachmentModal = (e: any) => {
    e.stopPropagation();
    setAttachmentViewOpen((value: boolean) => !value);
  };

  const AttachmentsToolTip = () => {
    return selectedAttachments.files.length > 0 ? (
      <>
        {Array.from(selectedAttachments.files).map((file: any, index: any) => {
          return (
            <div
              style={{ textTransform: "capitalize" }}
              key={file.name}
            >{`${file.name}\n `}</div>
          );
        })}
      </>
    ) : (
      <></>
    );
  };

  const viewRecentComments =
    getAllRecentCommentsOfSubtask.length > 0 &&
    getAllRecentCommentsOfSubtask.map((item: RecentCommentsInterface) => {
      if (!item.access.includes(String(user._id))) {
        return;
      }
      return {
        name: `${item.sender.firstName} ${item.sender.surName}`,
        message: item.message,
        _id: item._id,
        date: momentdeDateFormat(item.createdAt),
        time: momentTimeFormat(item.createdAt),
        userState: item.userState,
      };
    });

  const recentCommentsBox = document.getElementById("RecentComments");
  if (recentCommentsBox) {
    recentCommentsBox.scrollTop = recentCommentsBox.scrollHeight;
  }

  return (
    <>
      <Box>
        <Typography className="recentComment">Recent Comments</Typography>
      </Box>
      <Box
        id={"RecentComments"}
        sx={{
          overflow: "auto",
          height: "30vh",
          display: " block",
          position: "relative",
        }}
      >
        {/* {!isEmpty && recentComments.map((comment: any) => (<RecentCommentsList comment={comment} />))} */}
        {getAllRecentCommentsOfSubtask.length > 0 ? (
          getAllRecentCommentsOfSubtask
            .slice(0, 4)
            .reverse()
            .map((userComment: RecentCommentsInterface) => {
              if (!userComment.access.includes(user._id)) {
                return;
              }
              return (
                <Box key={userComment._id}>
                  <RecentCommentsList comment={userComment} />
                </Box>
              );
            })
        ) : (
          <Box sx={{ textAlign: "center", paddingTop: "3rem", height: "100%" }}>
            No subtask comments found!
          </Box>
        )}
      </Box>
      <CBox display="flex">
        <Grid item xs={12} md={12} className={classes.textAreaBox}>
          <TextField
            id="standard-multiline-flexible"
            // label="Multiline"
            placeholder="Enter new comment..."
            value={userNewComment}
            onChange={(e) => {
              setUserNewComment(e.target.value);
            }}
            multiline
            maxRows={4}
            minRows={4}
            style={{ padding: "10px 10px" }}
            variant="standard"
            className={classes.textArea}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <CBox
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            width="100%"
            borderTop="1px solid #DBDBE5"
            // px={0.75}
            // py={0.75}
          >
            <CBox
              display="flex"
              alignItems="center"
              className={classes.chatButtonWrapper}
            >
              <CBox
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                mt={1}
              >
                <CButton
                  onClick={handleViewAllComments}
                  styles={{ fontSize: 14, textTransform: "capitalize" }}
                  startIcon={<EyeIcon />}
                  label={"all comments"}
                />
              </CBox>
              <Divider
                orientation="vertical"
                flexItem
                variant="fullWidth"
                style={{ height: 15, width: 1.5, margin: "auto 8px" }}
              />
              <CustomStack>
                <IconButton onClick={handleOpenCloseAttachmentModal}>
                  <AttachmentIcon />
                </IconButton>
                <CustomBadge
                  overlap="circular"
                  color="primary"
                  badgeContent={
                    <Tooltip title={AttachmentsToolTip()}>
                      {selectedAttachments.files.length > 0 ? (
                        <div>{selectedAttachments.files.length}</div>
                      ) : (
                        <div>{0}</div>
                      )}
                    </Tooltip>
                  }
                ></CustomBadge>
              </CustomStack>
              <Divider
                orientation="vertical"
                flexItem
                variant="fullWidth"
                style={{ height: 15, width: 1.5, margin: "auto 8px" }}
              />
              &nbsp;
              <CButton
                startIcon={<SendIcon />}
                onClick={(e: any) => handleSendRecentComment(e)}
                //handle click to send newMessage here
                sx={{ paddign: "10px 0" }}
                type={"submit"}
                style={{ maxWidth: 35 }}
                variant="contained"
              />
            </CBox>
          </CBox>
        </Grid>

        {/* </CBox> */}
        {/* <CBox display='flex'>
                    <Typography className={classes.description} >Magnis dis parturient montes, nascetur Aenean eu leo quam. Pellentesque ornare </Typography>
                    <Divider />
                </CBox> */}
      </CBox>
      <CDrawer
        showBoxShadow={true}
        hideBackDrop={true}
        openCDrawer={openViewAllCommentsDrawer}
        handleCloseCDrawer={handleViewAllComments}
        children={
          <ViewRejectionComments
            subTaskHeading="All comments"
            handleCloseCDrawer={handleViewAllComments}
            cardData={viewRecentComments}
          />
        }
      />

      <CustomModal
        showCloseBtn={false}
        isOpen={attachmentViewOpen}
        handleClose={(e: any) => {
          handleOpenCloseAttachmentModal(e);
        }}
        title={"Attachments"}
        children={
          <UploadDocs
            selectedAttachments={selectedAttachments}
            showUploadButton={false}
            moduleType={"SubTaskComments"}
            moduleId={""}
            handleClose={(e: any, value: any): void => {
              setSelectedAttachments(value);
              setAttachmentViewOpen((prev: boolean) => !prev);
            }}
          />
        }
      />
    </>
  );
}

const useStyles = makeStyles({
  wrapper: {
    padding: "25px 20px",
    backgroundColor: "#F5F7F8",
  },
  heading: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#7D7E80",
  },
  description: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#000000",
    marginBottom: 5,
  },

  status: {
    fontSize: 10,
    color: "#fff !important",
    backgroundColor: "#F1B740",
    borderRadius: "3px !important",
    width: "100%",
    maxWidth: "49px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 19,
    marginRight: "5px !important",
  },
  titleLabel: {
    position: "absolute",
    top: "-10px",
    backgroundColor: "#f5f7f8",
    left: 11,
    color: "#605C5C",
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: 600,
  },
  textArea: {
    width: "100%",
    padding: 15,
    border: "none",
    borderRadius: 5,
    "& textarea:focus": {
      outline: "none !important",
      borderColor: "none",
      // boxShadow: '0 0 10px #719ECE',
    },
  },
  textAreaBox: {
    border: "1px solid #DBDBE5",
    borderRadius: 2,
    marginTop: 20,
    position: "relative",
    background: "white",
    "&:hover": {
      borderColor: "#0a95ff",
      borderWidth: "1px",
    },
    "& .css-8q2m5j-MuiInputBase-root-MuiInput-root": {
      "&:before": {
        borderBottom: "none !important",
      },
      "&:after": {
        borderBottom: "none !important",
      },
    },
  },
  chatButtonWrapper: {
    marginRight: "10px",
    "& .MuiButton-root": {
      // padding: "0",
    },
    "& .css-1d6wzja-MuiButton-startIcon": {
      marginLeft: "8px !important",
      marginRight: "8px !important",
    },
  },
});
