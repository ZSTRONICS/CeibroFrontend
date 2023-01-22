import { useState, useRef } from "react";

// mui
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import Link from "@mui/material/Link";

// formik
import { Form, Formik, useFormikContext } from "formik";

import useMediaQuery from "@mui/material/useMediaQuery";
// import CustomizedSwitch from "components/Chat/Questioniar/IOSSwitch";
import assets from "assets/assets";
import { CBox } from "components/material-ui";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "theme";
import taskActions, {
  createTask,
  getAllTask,
} from "../../../redux/action/task.action";
import { RootState } from "../../../redux/reducers";
// import { TaskAdvanceOptions } from './TaskAdvanceOptions';
import NewTaskMenu from "./NewTaskMenu";
import CButton from "components/Button/Button";
import { toast } from "react-toastify";
import { SET_SELECTED_TASK } from "config/task.config";

export const TaskModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dialogOpen = useSelector((state: RootState) => state.task.dialogOpen);
  const { user } = useSelector((store: RootState) => store.auth);
  const handleClose = () => {
    dispatch(taskActions.closeNewTask());
  };

  const handleSubmit = (values: any) => {
    const  {dueDate, title,project,admins,assignedTo,creator, state, description } = values;
    const payload = {dueDate, title,project,admins,assignedTo,creator, state, description };
    
    dispatch(
      createTask({
        body: payload,
        success: (res) => {
          handleClose()
          if(res?.status >= 400) {
            toast.error("Failed to create task", res?.message);
          }
          else if (res?.status === 201) {
            //New Task Created Successfully
            //Open Task Drawer with latest Task Data
            const newTaskData = res?.data?.newTask;
            if (newTaskData) {
              dispatch({
                type: SET_SELECTED_TASK,
                payload: newTaskData,
              });

              dispatch(taskActions.openTaskDrawer());
            }
          }
        },
        finallyAction: () => {
          dispatch(getAllTask());
        },
        showErrorToast: true,
        onFailAction: (err) => {
          toast.error("Failed to create task", err);
        },
      })
    );
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ fontWeight: "600", paddingBottom: "0" }}
        >
          New Task
        </DialogTitle>
        <Formik
          initialValues={{
            dueDate: "",
            title: "",
            admins: [user?._id],
            assignedTo: [],
            creator: user?._id,
            project: "",
            description: "",
            state: "new",
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <DialogContent sx={{ padding: "0 20px 24px" }}>
                <DialogContentText>
                  <CBox>
                    <NewTaskMenu
                      setFieldValue={setFieldValue}
                      values={values}
                    />
                    {/* <Divider /> */}
                    {/* <Link href="#" underline="none" onClick={(event) => setOpen(!open)}>
                                            <CBox color='#0076C8' fontSize={14} fontWeight={600} display='flex' alignItems='center' my={1.8}>
                                                {open ?
                                                    <>
                                                        < assets.KeyboardArrowUpIcon />                                                    </>
                                                    :
                                                    <>
                                                        < assets.KeyboardArrowRightIcon />
                                                    </>
                                                }
                                                Advance Options
                                            </CBox>
                                        </Link>
                                        {open ? <TaskAdvanceOptions />
                                            :
                                            ''
                                        } */}
                  </CBox>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <CBox display="flex" width="100%" pl={1.5} pr={4.3} pb={1}>
                  <CBox className={classes.btnDraft}>
                    <CButton
                      type="submit"
                      variant="outlined"
                      styles={{
                        color: "#0076C8",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      label={"Save as draft"}
                      onClick={() => {
                        values.state = "draft";
                      }}
                    />
                  </CBox>
                  <div
                    style={{
                      flex: "1 0 0",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <CButton
                      type="submit"
                      variant="contained"
                      styles={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold",
                        marginRight: 15,
                      }}
                      label={"Create Task"}
                      onClick={() => {
                        values.state = "new";
                      }}
                    />
                    <CButton
                      onClick={handleClose}
                      variant="contained"
                      styles={{
                        color: "#605C5C",
                        backgroundColor: "#ECF0F1",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      label={"Cancel"}
                    />
                  </div>
                </CBox>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles({
  btnDraft: {
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      top: 17,
      right: 25,
    },
  },
});
