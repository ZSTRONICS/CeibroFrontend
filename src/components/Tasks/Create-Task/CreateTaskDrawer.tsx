
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@mui/material';
import DrawerHeader from 'components/Projects/Create-Project/CreateProjectDrawer/DrawerHeader';
import { AllSubtasksOfTaskResult } from 'constants/interfaces/AllSubTask';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import colors from '../../../assets/colors';
import taskActions from '../../../redux/action/task.action';
import CreateTaskBody from './CreateTaskBody';
import TaskDrawerMenu from './TaskDrawerMenu';

const CreateTaskDrawer = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const drawerOpen = useSelector((state: RootState) => state.task.taskDrawerOpen);
  let subTaskOfTask:AllSubtasksOfTaskResult  = useSelector((state:RootState)=> state.task.allSubTaskOfTask)

  const handleClose = () => {
    dispatch(taskActions.closeTaskDrawer());
    subTaskOfTask.subtasks=[]
    subTaskOfTask.task= {
      dueDate: "",
      title: "",
      admins: [],
      assignedTo: [],
      project: {
        _id: "",
        title: ""
      },
      description: "",
      state: "new",
    }
  }

  return (
    <Drawer onClose={handleClose} open={drawerOpen} anchor="right">
      <div className={classes.outerWrapper}>
        <DrawerHeader title='New Task' handleClose={handleClose} />
        <Grid container>

          <Grid item md={3.5} sx={{ background: 'white' }}>
            <TaskDrawerMenu taskMenue = {subTaskOfTask.task}/>
          </Grid>

          {/* <Grid item> */}
          {/* </Grid> */}
          {/* <div>
                        <SubTaskStatusDrawer/>
                    </div>  */}
          <Grid item md={8.5} className={classes.bodyWrapper} >
            <CreateTaskBody subtasks={subTaskOfTask.subtasks} task={subTaskOfTask.task} />
          </Grid>

        </Grid>
        {/* <CreateTaskFooter/>  */}
      </div>
    </Drawer>
  )
}

export default CreateTaskDrawer

const useStyles = makeStyles({
  // drawerContainer:{
  //     background:'#F5F7F8'
  // },
  bodyWrapper: {
    maxWidth: '878px',
    width: '100%',
    "@media(max-width:769)": {
      maxWidth: '767px',
      width: '100%',
    }
  },
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
  outerWrapper: {
    width: 'calc(100vw - 200px)',
    backgroundColor: colors.lightGrey,
    height: '100vh',
    '@media (max-width:960px)': {
      width: '100vw'
    }
  }
})