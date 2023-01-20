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


function SubTaskStatusDrawer() {
  const classes = useStyles()
  const [subTask, setSubTask]: any = useState(false)

  const subMenu = 'subTask'
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
    <CustomModal title="New Subtask" isOpen={subTask} handleClose={() => setSubTask(false)} children={<CreateSubTask setSubTask={setSubTask} />} />

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
