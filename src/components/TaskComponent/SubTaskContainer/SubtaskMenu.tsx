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
import EditSubTask from "./EditSubTask";
import { SubtaskInterface } from "constants/interfaces/subtask.interface";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { SubtaskState } from "constants/interfaces/task.interface";
import CreateSubTask from "components/Tasks/SubTasks/CreateSubTask";
import { Formik, Form } from "formik";
import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTasks.interface";

interface Props {
    subTaskDetail: SubtaskInterface;
  }

const SubTaskMenu = ({subTaskDetail}:Props) => {

    let subTaskOfTask: AllSubtasksOfTaskResult = useSelector((state: RootState) => state.task.allSubTaskOfTask);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [anchorElMember, setAnchorElMember] = React.useState<null | HTMLElement>(null);
    const [subTask, setSubTask]= useState(false)
    const { user } = useSelector((store: RootState) => store.auth);
    const {state}= subTaskDetail

    const handleSubmit = (values: any) => {
        const { dueDate, title, taskId, assignedTo, creator, state, description } =
          values;
        const payload = {
          dueDate,
          taskId,
          title,
          assignedTo,
          creator,
          state,
          description,
        };
        // dispatch(
        //   createSubTask({
        //     body: payload,
        //     success: (res) => {
        //       if (res?.status >= 400) {
        //         toast.error("Failed to create subtask", res?.message);
        //       } else if (res?.status === 201) {
        //         setSubTask(false);
        //       }
        //     },
        //     // finallyAction: () => {
        //     // dispatch(getAllSubTaskList());
        //     // },
        //     showErrorToast: true,
        //     onFailAction: (err) => {
        //       toast.error("Failed to create subtask", err);
        //     },
        //   })
        // );
      };

      const AddSubtask = () => {
        return (
          <Formik
            initialValues={{
              dueDate: "",
              title: "",
              taskId: String(subTaskOfTask.task._id),
              assignedTo: [],
              creator: user?._id,
              doneImageRequired: false,
              doneCommentsRequired: false,
              description: "",
              state: [{ userId: user._id, userState: "draft" }],
            }}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <CreateSubTask
                  setSubTask={setSubTask}
                  setFieldValue={setFieldValue}
                  values={values}
                />
              </Form>
            )}
          </Formik>
        );
      };

  const handleOpenEditMemberMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorElMember(event.currentTarget);
  };

  const handleCloseMenu = (event: any) => {
      event.stopPropagation();
    setAnchorElMember(null);
  };

  const handleCloseModal = () => {
      setOpenEditModal((show) => !show);
    };

    const handleEditSubTaskInDraft = (e: any) => {
      e.stopPropagation();
      setAnchorElMember(null);
      setSubTask(true)
    };

    const handleEditDetails = (e: any) => {
      e.stopPropagation();
      setAnchorElMember(null);
      setOpenEditModal((show) => !show);
    };

    const handleDeleteSubTask = (e: any) => {
      e.stopPropagation();
      setAnchorElMember(null);
    };

    const handleEditSubTaskInAssigned = (e: any) => {
      e.stopPropagation();
      setAnchorElMember(null);
      setSubTask(true)
    };

  const myState = state.find( (localState) => String(localState.userId) === String(user._id))?.userState;

  // console.log((myState !== SubtaskState.Done))
  
  return (
    <>
      <Box sx={{ flexGrow: 0, color: "primary" }}>
        <IconButton
          onClick={handleOpenEditMemberMenu}
          disableRipple
          sx={{ p: 1 }}
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

    {(myState === SubtaskState.Draft)&&
    <>
        <MenuItem disableRipple sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
              },
            }}
          >
            <SubTaskButton
              textAlign="center"
            //   sx={{ color: "#0076c8"}} 
              onClick={handleEditSubTaskInDraft}
            >
              Edit subtask
            </SubTaskButton>
          </MenuItem>
          <MenuItem disableRipple sx={{
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
    </>      
    }
{/* edit details, edit subtask, and delete subtask */}

    {(myState === SubtaskState.Assigned)&&
    <>
        <MenuItem disableRipple sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
              },
            }}
          >
            <SubTaskButton
              textAlign="center"
            //   sx={{ color: "#0076c8" }} 
              onClick={handleEditSubTaskInAssigned}
            >
              Edit subtask
            </SubTaskButton>
          </MenuItem>
        <MenuItem disableRipple sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
              },
            }}
          >
            <SubTaskButton
              textAlign="center"
            //   sx={{ color: "#0076c8" }} 
              onClick={handleEditDetails}
            >
              Edit details
            </SubTaskButton>
          </MenuItem>
          <MenuItem disableRipple sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
              },
            }}
          >
            <SubTaskButton
              textAlign="center"
              sx={{ color: "#FA0808" }} 
            //   onClick={handleToggle}
            >
              Delete subtask
            </SubTaskButton>
          </MenuItem>
    </>      
    }


          {(myState === SubtaskState.Accepted)&&<MenuItem disableRipple sx={{
              "&.MuiMenuItem-root": {
                padding: "10px 20px",
              },
            }}
          >
            <SubTaskButton
              textAlign="center"
            //   sx={{ color: "#0076c8" }} 
              onClick={handleEditDetails}
            >
              Edit Details
            </SubTaskButton>
          </MenuItem>}
        </Menu>
      </Box>
      <Box>
     {openEditModal&&   <CustomModal
        //   showBottomBtn={false}
          isOpen={openEditModal}
          handleClose={handleCloseModal}
          showCloseBtn={true}
          title="Edit Details"
          children={<EditSubTask />}
        />
}
      </Box>
    {subTask&& <CustomModal
            showCloseBtn={false}
            title="Edit Subtask"
            isOpen={subTask}
            handleClose={() => setSubTask(false)}
            children={<AddSubtask/>}
        />}
    </>
  );
};
export default SubTaskMenu;


const SubTaskButton= styled(Typography)`
font-size: 14px;
color: #0076C8;
font-weight: 500;
line-height: 150%;
text-transform: capitalize;
`