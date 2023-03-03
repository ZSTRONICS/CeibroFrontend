import React, { useState } from "react";

// material
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";

// components
import assets from "assets/assets";
import CustomModal from "components/Modal";
import CreateSubTask from "components/Tasks/SubTasks/CreateSubTask";
import { DOCS_CONFIG } from "config/docs.config";
import { TASK_CONFIG } from "config/task.config";
import { SubtaskInterface } from "constants/interfaces/subtask.interface";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteSubtask, patchSubTaskById } from "redux/action/task.action";
import { RootState } from "redux/reducers";
import EditSubTaskDetails from "./EditSubTaskDetails";

interface Props {
  subTaskDetail: SubtaskInterface;
}

const SubTaskMenu = ({ subTaskDetail }: Props) => {
  const dispatch = useDispatch();
  // let subTaskOfTask: AllSubtasksOfTaskResult = useSelector(
  //   (state: RootState) => state.task.allSubTaskOfTask
  // );

  let temporarySubtask = useSelector(
    (state: RootState) => state.task.temporarySubtask
  );

  temporarySubtask.taskId = subTaskDetail.taskId;
  temporarySubtask.assignedTo = subTaskDetail.assignedTo;
  temporarySubtask.description = subTaskDetail.description;
  temporarySubtask.dueDate = subTaskDetail.dueDate;
  temporarySubtask.title = subTaskDetail.title;
  temporarySubtask.state = subTaskDetail.state;
  temporarySubtask._id = subTaskDetail._id;
  temporarySubtask.taskData = subTaskDetail.taskData;
  temporarySubtask.assignedToMembersOnly = subTaskDetail.assignedToMembersOnly;

  const [openEditDetailsModal, setOpenEditModal] = useState(false);
  const [anchorElMember, setAnchorElMember] =
    React.useState<null | HTMLElement>(null);
  const [subTask, setSubTask] = useState(false);
  const { user } = useSelector((store: RootState) => store.auth);
  const { state } = subTaskDetail;

  const handleSubmit = (values: any) => {
    let { dueDate, title, assignedTo, state, description, files, _id } =
      values.subTask;
    if (state[0]._id) {
      state = state.map((item: any) => {
        return { userId: item._id, userState: item.userState };
      });
    }
    if (assignedTo && typeof assignedTo[0].addedBy !== typeof "") {
      assignedTo = assignedTo.map((assigned: any) => {
        return {
          members: assigned.members.map((item: any) => item._id),
          addedBy: assigned.addedBy._id,
        };
      });
    }

    const payload = {
      dueDate,
      title,
      assignedTo,
      state,
      description,
    };

    if (files && files.files.length > 0) {
      dispatch({
        type: DOCS_CONFIG.UPLAOD_FILES_NOW,
        payload: files,
      });
    }

    dispatch(
      patchSubTaskById({
        body: payload,
        other: _id,
        success: (res: any) => {
          if (res.status === 200) {
            setSubTask(false);

            dispatch({
              type: TASK_CONFIG.UPDATE_SUB_TASK_BY_ID,
              payload: res.data.newSubtask,
            });
          }
          toast.success("Subtask updated");
        },
        onFailAction: () => {
          toast.error("Failed to updated subtask!");
        },
      })
    );
  };

  let canEdit = false;
  let canDelete = false;
  let canEditDetails = false;

  const myState: any = state.find(
    (localState) => String(localState.userId) === String(user._id)
  )?.userState;

  // const isAdmin =  temporarySubtask.taskData.admins.includes(user._id)

  if (String(user._id) === String(subTaskDetail.creator._id)) {
    state.every((localState: any) => {
      if (
        localState.userState === "assigned" ||
        localState.userState === "accepted" ||
        localState.userState === "draft" ||
        localState.userState === "rejected"
      ) {
        canDelete = true;
        return true;
      } else {
        canDelete = false;
        return false;
      }
    });
  }

  if (subTaskDetail.taskData && subTaskDetail.taskData.admins.includes(String(user._id))) {
    if(subTaskDetail.taskData.admins === undefined || subTaskDetail.taskData.admins === null){
      return <></>
    }
    canEditDetails = true;
    state.every((localState: any) => {
      if (
        localState.userState === "draft" ||
        localState.userState === "rejected" ||
        localState.userState === "assigned"
      ) {
        canEdit = true;
        return true;
      } else {
        canEdit = false;
        return false;
      }
    });
  } else {
    if (myState === "ongoing" || myState === "accepted" || myState === "done") {
      canEditDetails = true;
    }
  }

  const EditSubTask = (subTask: any) => {
    return (
      <Formik
        enableReinitialize={false}
        initialValues={{ ...subTask }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <CreateSubTask
              setSubTask={setSubTask}
              values={values}
              myState={myState}
              isEditMode={true}
            />
          </Form>
        )}
      </Formik>
    );
  };

  const handleOpenEditMemberMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorElMember(e.currentTarget);
  };

  const handleCloseMenu = (event: any) => {
    event.stopPropagation();
    setAnchorElMember(null);
  };

  const handleCloseModal = () => {
    setOpenEditModal((show) => !show);
  };
  const handleCloseEditModal = (e: any) => {
    e.stopPropagation();
    setSubTask(false);
  };

  const handleEditSubTaskInDraft = (e: any) => {
    e.stopPropagation();
    setAnchorElMember(null);
    setSubTask(true);
  };

  const handleEditDetails = (e: any) => {
    e.stopPropagation();
    setAnchorElMember(null);
    setOpenEditModal((show) => !show);
  };

  const handleDeleteSubTask = (e: any) => {
    e.stopPropagation();
    setAnchorElMember(null);
    dispatch(
      deleteSubtask({
        other: subTaskDetail._id,
        success: (res: any) => {
          if (res.status === 200) {
            setAnchorElMember(null);
          }
          toast.success("Subtask deleted");
        },
      })
    );
  };

  // const handleEditSubTaskInAssigned = (e: any) => {
  //   e.stopPropagation();
  //   setAnchorElMember(null);
  //   setSubTask(true);
  // };

  return (
    <Box>
      <Box sx={{ flexGrow: 0, color: "primary"  }}>
        <IconButton
          color="primary"
          onClick={handleOpenEditMemberMenu}
          disableRipple
          sx={{ padding: "0px 1px" }}
        >
          <assets.MoreVertOutlinedIcon />
        </IconButton>
        {(canEdit || canDelete || canEditDetails) && (
          <Menu
            MenuListProps={{ sx: { py: 0 } }}
            sx={{ mt: "35px" }}
            id="menu-appbar"
            anchorEl={anchorElMember}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElMember)}
            onClose={handleCloseMenu}
          >
            {/* edit subtask, edit members and delete subtask */}
            <Box>
              {canEdit && (
                <MenuItem
                  onClick={handleEditSubTaskInDraft}
                  disableRipple
                  sx={{
                    "&.MuiMenuItem-root": {
                      padding: "10px 10px",
                    },
                  }}
                >
                  <SubTaskButton
                    textAlign="center"
                    //   sx={{ color: "#0076c8"}}
                  >
                    Edit subtask
                  </SubTaskButton>
                </MenuItem>
              )}

              {canEditDetails && (
                <MenuItem
                  disableRipple
                  onClick={handleEditDetails}
                  sx={{
                    "&.MuiMenuItem-root": {
                      padding: "10px 10px",
                      // marginRight:"10px",
                    },
                  }}
                >
                  <SubTaskButton textAlign="center">Edit details</SubTaskButton>
                </MenuItem>
              )}

              {canDelete && (
                <MenuItem
                  onClick={handleDeleteSubTask}
                  disableRipple
                  sx={{
                    "&.MuiMenuItem-root": {
                      padding: "10px 10px",
                    },
                  }}
                >
                  <SubTaskButton textAlign="center" sx={{ color: "#FA0808" }}>
                  Delete subtask
                </SubTaskButton>
                </MenuItem>
              )}
            </Box>
          </Menu>
        )}
      </Box>
      <Box>
        {openEditDetailsModal && (
          <CustomModal
            //   showBottomBtn={false}
            isOpen={openEditDetailsModal}
            handleClose={handleCloseModal}
            showCloseBtn={true}
            title="Edit Details"
            children={
              <EditSubTaskDetails
                subTask={temporarySubtask}
                handleClose={handleCloseModal}
              />
            }
          />
        )}
      </Box>
      {subTask && (
        <CustomModal
          showCloseBtn={false}
          title="Edit Subtask"
          isOpen={subTask}
          handleClose={(e: any) => handleCloseEditModal(e)}
          children={<EditSubTask subTask={temporarySubtask} />}
        />
      )}
    </Box>
  );
};
export default SubTaskMenu;

const SubTaskButton = styled(Typography)`
  font-size: 14px;
  color: #0076c8;
  font-weight: 500;
  line-height: 150%;
  text-transform: capitalize;
`;
