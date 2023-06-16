import { useState } from "react";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";

// mui
import { makeStyles } from "@material-ui/core";
import { Grid, Paper } from "@mui/material";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";
import { createSubTask } from "redux/action/task.action";

// components
import CustomModal from "components/Modal";
import { CButton } from "components/Button";
import CreateSubTask from "../SubTasks/CreateSubTask";
import DatePicker from "components/Utills/Inputs/DatePicker";
import StatusMenu from "components/Utills/Others/StatusMenu";
import SelectDropdown from "components/Utills/Inputs/SelectDropdown";
import { TaskInterface } from "constants/interfaces/task.interface";
import { isTrue } from "components/Utills/Globals/Common";
import { SubtaskInterface } from "constants/interfaces/subtask.interface";
import { DOCS_CONFIG } from "config/docs.config";
import { TASK_CONFIG } from "config/task.config";
import moment from "moment-timezone";
import CDatePicker from "components/DatePicker/CDatePicker";

interface Props {
  task: TaskInterface;
  subtasks: SubtaskInterface[];
}

function SubTaskStatusDrawer({ task, subtasks }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [subTask, setSubTask]: any = useState(false);
  // const [showDate, setShowDate]= useState<any>()
  const { user } = useSelector((store: RootState) => store?.auth);

  const isCreator = task.creator && task.creator._id === user?._id;
  const isAdmin = isTrue(task.admins, user?._id);

  const handleSubmit = (values: any) => {
    const {
      dueDate,
      title,
      taskId,
      assignedTo,
      creator,
      state,
      description,
      files,
    } = values.subTask;

    setSubTask(false);

    const payload = {
      dueDate,
      taskId,
      title,
      assignedTo,
      creator,
      state,
      description,
    };

    if (files.files.length > 0) {
      dispatch({
        type: DOCS_CONFIG.SET_SELECTED_FILES_TO_BE_UPLOADED,
        payload: files,
      });
    }

    dispatch(
      createSubTask({
        body: payload,
        success: (res) => {
          if (res?.status >= 400) {
            toast.error("Failed to create subtask", res?.message);
          } else if (res?.status === 201) {
            setSubTask(false);
          }
        },

        showErrorToast: true,
        onFailAction: (err) => {
          toast.error("Failed to create subtask", err);
        },
      })
    );
  };

  const AddSubtask = () => {
    return (
      <Formik
        enableReinitialize={false}
        initialValues={{
          subTask: {
            dueDate: moment(new Date()).format("DD-MM-YYYY"),
            title: "",
            taskId: String(task._id),
            assignedTo: [
              {
                addedBy: user._id,
                members: task.assignedTo.map((member) => member._id),
              },
            ],
            creator: user?._id,
            description: "",
            state: [],
            files: {},
          },
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => {
          return (
            <Form>
              <CreateSubTask setSubTask={setSubTask} values={values} />
            </Form>
          );
        }}
      </Formik>
    );
  };

  const getSubtaskStateCount = (checkState: any) => {
    let count = 0;
    subtasks.forEach((subtask) => {
      subtask.state.every((state) => {
        if (state.userId === user._id && state.userState === checkState) {
          count += 1;
          return false;
        }
        return true;
      });
    });
    return count;
  };

  const options = [
    {
      title: "All",
      count: subtasks.length,
    },
    {
      title: "Assigned",
      count: getSubtaskStateCount("assigned"),
    },
    {
      title: "Accepted",
      count: getSubtaskStateCount("accepted"),
    },
    {
      title: "Ongoing",
      count: getSubtaskStateCount("ongoing"),
    },
    {
      title: "Rejected",
      count: getSubtaskStateCount("rejected"),
    },
    {
      title: "Done",
      count: getSubtaskStateCount("done"),
    },
    {
      title: "Draft",
      count: getSubtaskStateCount("draft"),
    },
  ];

  return (
    <>
      <div className={classes.drawerStatusContainer}>
        <Paper
          className={classes.statusWrapper}
          sx={{
            display: "flex",
            "&.MuiPaper-root": { padding: "7px 0 7px 5px" },
          }}
          elevation={0}
          variant="outlined"
        >
          <StatusMenu options={options} />
        </Paper>
      </div>

      <Grid
        container
        className={classes.editSubTaskinputTypes}
        pl={2.2}
        pr={1.25}
        justifyContent="space-between"
        gap={1.5}
      >
        <Grid item container sm={8} md={9} gap={2}>
          <Grid item md={5} xs={10} sm={5}>
            {/* <DatePicker Datetitle="Date" /> */}
            <CDatePicker
              showLabel={true}
              required
              // value={showDate}
              id="date1"
              name="dueDate"
              componentsProps={{
                actionBar: {
                  actions: ["clear"],
                },
              }}
              // onChange={(e: any) => {
              //   setShowDate(e);
              //   projectOverview.dueDate = moment(e).format("DD-MM-YYYY");
              // }}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={10}
            sm={5}
            // sx={{
            //   width:"260px",
            //   height:"38px",
            // }}
          >
            <SelectDropdown title="Assigned to" />
          </Grid>
        </Grid>
        {(isCreator || isAdmin) && (
          <Grid item display="flex" justifyContent="flex-between" pr={1.7}>
            <CButton
              label="Add Subtask"
              onClick={() => setSubTask(true)}
              variant={"contained"}
              styles={{ fontSize: 12, textTransform: "capitalize" }}
            />
          </Grid>
        )}
      </Grid>

      <CustomModal
        showCloseBtn={false}
        title="New Subtask"
        isOpen={subTask}
        handleClose={async () => {
          setSubTask(false);
          dispatch({
            type: DOCS_CONFIG.CLEAR_SELECTED_FILES_TO_BE_UPLOADED,
          });
        }}
        children={<AddSubtask />}
      />
    </>
  );
}

export default SubTaskStatusDrawer;

const useStyles = makeStyles({
  actionButton: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  drawerStatusContainer: {
    padding: "11px 18px",
  },
  statusWrapper: {
    "@media(max-width:1340px)": {
      overflowX: "auto",
    },
  },
  editSubTaskinputTypes: {
    "& .MuiGrid-grid-sm-10": {
      flexBasis: "max-content",
    },
  },
});
