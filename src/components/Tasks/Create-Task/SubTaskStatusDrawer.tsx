import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core';
import {  Grid, Paper } from '@mui/material'
import StatusMenu from 'components/Utills/Others/StatusMenu'
import DatePicker from 'components/Utills/Inputs/DatePicker';
import SelectDropdown from 'components/Utills/Inputs/SelectDropdown';
import CButton from 'components/Button/Button';
import CustomModal from 'components/Modal';
import CreateSubTask from 'components/TaskComponent/CreateSubtask/SubtaskFields';

function SubTaskStatusDrawer() {
  const [subTask, setSubTask]: any = React.useState(false)

    const classes = useStyles()


  return (<>
    <div className={classes.drawerStatusContainer}>
      <Paper className={classes.statusWrapper} sx={{ display: 'flex', '&.MuiPaper-root': { padding: '7px 0 7px 5px' } }} elevation={0} variant='outlined' >
        <StatusMenu options={options} />
      </Paper>
    </div>
    <Grid container gap={2} pl={2.2}>
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
               
                <Grid item  md={4}>
                <DatePicker  Datetitle='Date'/>
                </Grid>
                <Grid item  md={4}>
                <SelectDropdown title="Assigned to" />
                </Grid>
                <Grid item  md={3.5}>
                  <CButton onClick={() => setSubTask(true)} label="Add SubTask" variant={'contained'} />
        <CustomModal title="New Sub-task" isOpen={subTask}
        handleClose={() => setSubTask(false)} children={<CreateSubTask setSubTask={setSubTask} />} />
               
                </Grid>
                </Grid>
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
