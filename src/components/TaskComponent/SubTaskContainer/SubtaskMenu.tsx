import React, { useState } from "react";

// material
import {
  Menu,
  IconButton,
  MenuItem,
  Typography,
  Box,
  styled,
} from "@mui/material";

// components
import assets from "assets/assets";
import CustomModal from "components/Modal";
import EditSubTaskDetails from "./EditSubTaskDetails";
import { SubtaskInterface } from "constants/interfaces/subtask.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { SubtaskState } from "constants/interfaces/task.interface";
import CreateSubTask from "components/Tasks/SubTasks/CreateSubTask";
import { Formik, Form } from "formik";
import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTasks.interface";
import { deleteSubtask, patchSubTaskById } from "redux/action/task.action";
import { toast } from "react-toastify";
import { DOCS_CONFIG } from "config/docs.config";
import { TASK_CONFIG } from "config/task.config";
import TaskDetail from "components/Tasks/SubTasks/TaskDetail";

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
  temporarySubtask.assignedToMembersOnly = subTaskDetail.assignedToMembersOnly;

  const [openEditDetailsModal, setOpenEditModal] = useState(false);
  const [anchorElMember, setAnchorElMember] =
    React.useState<null | HTMLElement>(null);
  const [subTask, setSubTask] = useState(false);
  const { user } = useSelector((store: RootState) => store.auth);
  const { state } = subTaskDetail;

  const myState = state.find(
    (localState) => String(localState.userId) === String(user._id)
  )?.userState;

  const handleSubmit = (values: any) => {
    let { dueDate, title, assignedTo, state, description, files, _id } =
      values.subTask;
    if (state[0]._id) {
      state = state.map((item: any) => {
        return { userId: item._id, userState: item.userState };
      });
    }

    const payload = {
      dueDate,
      title,
      assignedTo,
      state,
      description,
    };

    if (files.files.length > 0) {
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

  const handleEditSubTaskInAssigned = (e: any) => {
    e.stopPropagation();
    setAnchorElMember(null);
    setSubTask(true);
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 0, color: "primary" }}>
        <IconButton
          color="primary"
          onClick={handleOpenEditMemberMenu}
          disableRipple
          sx={{ padding: "0px 1px" }}
        >
          <assets.MoreVertOutlinedIcon />
        </IconButton>
        <Menu
          MenuListProps={{ sx: { py: 0 } }}
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElMember}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElMember)}
          onClose={handleCloseMenu}
        >
          {/* edit and delete subtask */}

          {myState === SubtaskState.Draft && (
            <Box>
              <MenuItem
                onClick={handleEditSubTaskInDraft}
                disableRipple
                sx={{
                  "&.MuiMenuItem-root": {
                    padding: "10px 20px",
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
              <MenuItem
                disableRipple
                sx={{
                  "&.MuiMenuItem-root": {
                    padding: "10px 20px",
                  },
                }}
              >
                <SubTaskButton
                  textAlign="center"
                  sx={{ color: "#FA0808" }}
                  onClick={handleDeleteSubTask}
                >
                  Delete subtask
                </SubTaskButton>
              </MenuItem>
            </Box>
          )}
          {/* edit details, edit subtask, and delete subtask */}

          {myState === SubtaskState.Assigned && (
            <Box>
              <MenuItem
                onClick={handleEditSubTaskInDraft}
                disableRipple
                sx={{
                  "&.MuiMenuItem-root": {
                    padding: "10px 20px",
                  },
                }}
              >
                <SubTaskButton
                  textAlign="center"
                  //   sx={{ color: "#0076c8" }}
                >
                  Edit subtask
                </SubTaskButton>
              </MenuItem>
              <MenuItem
                //  onClick={handleEditDetails}
                disableRipple
                sx={{
                  "&.MuiMenuItem-root": {
                    padding: "10px 20px",
                  },
                }}
              >
                <SubTaskButton textAlign="center" onClick={handleEditDetails}>
                  Edit details
                </SubTaskButton>
              </MenuItem>
              <MenuItem
                //   onClick={handleDelteSubtask}
                disableRipple
                sx={{
                  "&.MuiMenuItem-root": {
                    padding: "10px 20px",
                  },
                }}
              >
                <SubTaskButton
                  onClick={handleDeleteSubTask}
                  textAlign="center"
                  sx={{ color: "#FA0808" }}
                >
                  Delete subtask
                </SubTaskButton>
              </MenuItem>
            </Box>
          )}
          {(myState === SubtaskState.Accepted ||
            myState === SubtaskState.Ongoing) && (
            <MenuItem
              disableRipple
              sx={{
                "&.MuiMenuItem-root": {
                  padding: "10px 20px",
                },
              }}
            >
              <SubTaskButton
                textAlign="center"
                onClick={handleEditDetails}
                //   sx={{ color: "#0076c8" }}
                // onClick={handleEditDetails}
              >
                Edit Details
              </SubTaskButton>
            </MenuItem>
          )}
        </Menu>
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
