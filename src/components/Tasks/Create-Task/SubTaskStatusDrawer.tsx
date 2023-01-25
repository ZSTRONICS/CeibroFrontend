import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core';
import {  Grid, Paper } from '@mui/material'
import StatusMenu from 'components/Utills/Others/StatusMenu'
import DatePicker from 'components/Utills/Inputs/DatePicker';
import SelectDropdown from 'components/Utills/Inputs/SelectDropdown';
import { CBox } from 'components/material-ui';
import CButton from 'components/Button/Button';
import CustomModal from 'components/Modal';
import CreateSubTask from '../SubTasks/CreateSubTask';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { AssignedTo } from 'constants/interfaces/subtask.interface';
import { createSubTask, getAllSubTaskList } from 'redux/action/task.action';
import { toast } from 'react-toastify';
import { TASK_CONFIG } from 'config/task.config';


function SubTaskStatusDrawer() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [subTask, setSubTask]: any = useState(false)
  const { user } = useSelector((store: RootState) => store?.auth);
  const { selectedTaskId } = useSelector((store: RootState) => store?.task);

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
        finallyAction: () => {
          dispatch(getAllSubTaskList());
        },
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
            taskId: String(selectedTaskId),
            assignedTo: [],
            creator: user?._id,
            doneImageRequired: false,
            doneCommentsRequired: false,
            description: "",
            state: "draft",
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
    <Grid container gap={2} pl={2.2}>
      <CBox display='flex' justifyContent='space-between' alignItems='center' width='100%' mr={2.2} mb={2}>
        <CBox display='flex'>
          <DatePicker Datetitle='Date' />
          &nbsp;
          &nbsp;
          <SelectDropdown title="Assigned to" />
        </CBox>
        <CBox>
          <CButton label="Add SubTask" onClick={() => setSubTask(true)} variant={'contained'} styles={{ fontSize: 12, textTransform: 'capitalize' }} />

        </CBox>
      </CBox>
      {/* <Grid item md={2.5}>
                    <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<ListIcon />}
                            className={classes.actionButton}
                        >
                            Bulk edit
                        </Button>
                    </Grid> */}


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
