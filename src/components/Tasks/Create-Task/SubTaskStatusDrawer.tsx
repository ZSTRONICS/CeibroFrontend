import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core';
import { Button, Grid, Paper } from '@mui/material'
import StatusMenu from 'components/Utills/Others/StatusMenu'
import ListIcon from '@material-ui/icons/List';
import DatePicker from 'components/Utills/Inputs/DatePicker';
import SelectDropdown from 'components/Utills/Inputs/SelectDropdown';
import CButton from 'components/Button/Button';
import SubtaskModal from 'components/TaskComponent/CreateSubtask/SubtaskModal';
import taskActions from 'redux/action/task.action';
import { useDispatch } from 'react-redux';


function SubTaskStatusDrawer() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const openSubTaskModal = () => {
      dispatch(taskActions.openSubTask());
    }

  return (<>
                    <div className={classes.drawerStatusContainer}>
                    <Paper className={classes.statusWrapper} sx={{display:'flex', '&.MuiPaper-root':{padding:'7px 0 7px 5px'}}} elevation={0} variant='outlined' >
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
                  <Button variant='contained' onClick={openSubTaskModal}>Add SubTask</Button>
                  {/* <SubtaskModal /> */}
               
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
    drawerStatusContainer:{
        padding:'11px 18px'
    },
    statusWrapper:{
        "@media(max-width:1024px)":{
          overflowX: 'scroll',
        }
      },

})
