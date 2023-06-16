import React, { useState } from 'react'
import { Divider, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { CBox } from 'components/material-ui';
import CButton from 'components/Button/Button';
import { CustomBadge, CustomStack } from 'components/TaskComponent/Tabs/TaskCard';
import { AttachmentIcon, EyeIcon, SendIcon } from "components/material-ui/icons";
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers/appReducer';
import { RecentCommentsInterface, SubtaskInterface } from 'constants/interfaces/subtask.interface';
import { DOCS_CONFIG } from 'config/docs.config';
import taskActions from 'redux/action/task.action';
import ViewRejectionComments from './ViewRejectionComments';
import CDrawer from 'Drawer/CDrawer';
import CustomModal from 'components/Modal';
import UploadDocs from 'components/uploadImage/UploadDocs';
import { momentdeDateFormat, momentTimeFormat } from 'components/Utills/Globals/Common';

interface Props {
  subtaskDetail: SubtaskInterface
}

export default function RecentCommentInput({ subtaskDetail }: Props) {

  const classes = useStyles()
  const dispatch = useDispatch();

  const [userNewComment, setUserNewComment] = useState<string>("");
  const [openViewAllCommentsDrawer, setOpenViewAllCommentsDrawer] = useState<boolean>(false);
  const [attachmentViewOpen, setAttachmentViewOpen]: any = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState<any>({
    moduleId: "",
    moduleName: "SubTaskComments",
    files: [],
  });

  const { user } = useSelector((state: RootState) => state.auth);
  const { getAllRecentCommentsOfSubtask } = useSelector((state: RootState) => state.task);
  const myState = subtaskDetail.state.find((localState: any) => {
    if (localState === undefined) {
      return
    }
    return String(localState.userId) === String(user._id)
  })?.userState;

  const handleViewAllComments = () => {
    setOpenViewAllCommentsDrawer((prev: boolean) => !prev);
  };

  const handleOpenCloseAttachmentModal = (e: any) => {
    e.stopPropagation();
    setAttachmentViewOpen((value: boolean) => !value);
  };

  const handleSendRecentComment = (e: any) => {
    e.stopPropagation();
    const payload = {
      taskId: subtaskDetail.taskId,
      subTaskId: subtaskDetail._id,
      isFileAttached: selectedAttachments.files.length > 0 ? true : false,
      sender: user._id,
      userState: myState,
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

  const AttachmentsToolTip = () => {
    return selectedAttachments.files.length > 0 ? (
      <>
        {Array.from(selectedAttachments.files).map((file: any, index: any) => {
          return (
            <span
              style={{ textTransform: "capitalize" }}
              key={file.name}
            >{`${file.name}`}
              <br />
            </span>
          );
        })}
      </>
    ) : (
      <></>
    );
  };
  let viewRecentComments =
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
        allFiles: item.files
      };
    });

  return (<>

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
          maxRows={3}
          minRows={3}
          style={{ padding: "7px 7px" }}
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
              mt={.1}
            >
              <CButton
                sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, textTransform: "capitalize" }}
                onClick={handleViewAllComments}
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
              &nbsp;
            </CustomStack>
            <Divider
              orientation="vertical"
              flexItem
              variant="fullWidth"
              style={{ height: 15, width: 1.5, margin: "auto 8px" }}
            />
            &nbsp;
            <CButton
              disabled={userNewComment.trim() === "" ? true : false}
              startIcon={<SendIcon />}
              onClick={(e: any) => handleSendRecentComment(e)}
              //handle click to send newMessage here
              sx={{ paddign: "10px 0", minWidth: 55 }}
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
      opencdrawer={openViewAllCommentsDrawer}
      handleclosecdrawer={() => handleViewAllComments()}
      children={
        <ViewRejectionComments
          subTaskHeading="All Comments"
          handleclosecdrawer={() => handleViewAllComments()}
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
  )
}


const useStyles = makeStyles({
  wrapper: {
    padding: "10px 10px",
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
    // top: "-10px",
    backgroundColor: "#f5f7f8",
    left: 11,
    color: "#605C5C",
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: 600,
  },
  textArea: {
    width: "100%",
    padding: 10,
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
    marginTop: 10,
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