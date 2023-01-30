import { useState } from 'react';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

// mui
import { makeStyles } from '@material-ui/core';
import { Grid, Paper } from '@mui/material';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { createSubTask } from 'redux/action/task.action';

// components
import CustomModal from 'components/Modal';
import CButton from 'components/Button/Button';
import CreateSubTask from '../SubTasks/CreateSubTask';
import DatePicker from 'components/Utills/Inputs/DatePicker';
import StatusMenu from 'components/Utills/Others/StatusMenu';
import SelectDropdown from 'components/Utills/Inputs/SelectDropdown';
import { TaskInterface } from 'constants/interfaces/task.interface';
import { isTrue } from 'components/Utills/Globals/Common';

interface Props {
  task: TaskInterface}

function SubTaskStatusDrawer({task}:Props) {
 
  const classes = useStyles()
  const dispatch = useDispatch()
  const [subTask, setSubTask]: any = useState(false)
  const { user } = useSelector((store: RootState) => store?.auth);

  const isCreator = task.creator._id=== user?._id
  const isAdmin = isTrue(task.admins, user?._id)

  const handleSubmit = (values: any) => {
    const  {dueDate, title,taskId,assignedTo,creator, state, description } = values;
    const payload = {dueDate, taskId,title,assignedTo,creator, state, description };
    dispatch(
      createSubTask({
        body: payload,
        success: (res) => {
          if(res?.status >= 400) {
            toast.error("Failed to create subtask", res?.message);
          }
          else if (res?.status === 201) {
            setSubTask(false)
          }
        },
        // finallyAction: () => {
         // dispatch(getAllSubTaskList());
        // },
        showErrorToast: true,
        onFailAction: (err) => {
          toast.error("Failed to create subtask", err);
        },
      })
    );
  };

  const AddSubtask=()=>{
    return(
      <Formik
          initialValues={{
            dueDate: "",
            title: "",
            taskId: String(task._id),
            assignedTo: [],
            creator: user?._id,
            doneImageRequired: false,
            doneCommentsRequired: false,
            description: "",
            state: [{"userId": user._id, "userState": "draft"}],
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
            <CreateSubTask setSubTask={setSubTask} setFieldValue={setFieldValue}  values={values}/>
            </Form>
          )}
        </Formik>
    )
  }
  return (<>
    <div className={classes.drawerStatusContainer}>
      <Paper className={classes.statusWrapper} sx={{ display: 'flex', '&.MuiPaper-root': { padding: '7px 0 7px 5px' } }} elevation={0} variant='outlined' >
        <StatusMenu options={options} />
      </Paper>
    </div>
    <Grid pl={2.2} pr={1.25} container justifyContent='space-between'gap={1.5}>
        <Grid item container sm={10}  md={9} gap={2}>
            <Grid item md={4} >
                <DatePicker Datetitle='Date' />
            </Grid>
            <Grid item md={5} >
                <SelectDropdown title="Assigned to" />
            </Grid>
        </Grid>
        {(isCreator || isAdmin) && <Grid item  display='flex' justifyContent='flex-end' pr={1.2}>
            <CButton label="Add Subtask" onClick={() => setSubTask(true)} variant={'contained'} styles={{ fontSize: 12, textTransform: 'capitalize' }} />
        </Grid>}
    </Grid>
    <CustomModal title="New Subtask" isOpen={subTask} handleClose={() => setSubTask(false)} children={<AddSubtask/>} />
  </>
  )
}

const options = [
  {
    title: "All",
    count: 10,
  },
  {
    title: "Assigned",
    count: 2,
  },
  {
    title: "Accepted",
    count: 2,
  },
  {
    title: "Ongoing",
    count: 2,
  },
  {
    title: "Rejected",
    count: 4,
  },
  {
    title: "Done",
    count: 1,
  },
  {
    title: "Draft",
    count: 1,
  },
];
export default SubTaskStatusDrawer

const useStyles = makeStyles({
  actionButton: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'normal'
  },
  drawerStatusContainer: {
    padding: '11px 18px'
  },
  statusWrapper: {
    "@media(max-width:1024px)": {
      overflowX: 'scroll',
    }
  },

})
