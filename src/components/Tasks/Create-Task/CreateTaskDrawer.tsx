import { Button, Drawer } from '@material-ui/core'
import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../../assets/colors'
import taskActions from '../../../redux/action/task.action'
import TaskDrawerHeader from './TaskDrawerHeader'
import TaskDrawerMenu from './TaskDrawerMenu'
import CreateTaskBody from './CreateTaskBody'
import CreateTaskFooter from './CreateTaskFooter'
import { RootState } from 'redux/reducers'
import DrawerHeader from 'components/Projects/Create-Project/CreateProjectDrawer/DrawerHeader'
import NewTaskMenu from 'components/TaskComponent/TaskModal/NewTaskMenu'
import StatusMenu from 'components/Utills/Others/StatusMenu';
import DatePicker from 'components/Utills/Inputs/DatePicker';
import SelectDropdown from 'components/Utills/Inputs/SelectDropdown';
import SubTaskStatusDrawer from './SubTaskStatusDrawer';

const CreateTaskDrawer = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  let drawerOpen = useSelector((state: RootState) => state.task.taskDrawerOpen)
  const handleClose = () => {
    dispatch(taskActions.closeTaskDrawer())
  }

  return (
    <Drawer onClose={handleClose} open={drawerOpen} anchor="right">
      <div className={classes.outerWrapper}>
        <DrawerHeader title='New Task' handleClose={handleClose} />
        <Grid container>

          <Grid item md={3.5} sx={{ background: 'white' }}>
            <TaskDrawerMenu />
          </Grid>

          {/* <Grid item> */}
          {/* </Grid> */}
          {/* <div>
                        <SubTaskStatusDrawer/>
                    </div>  */}
          <Grid item md={8.5} className={classes.bodyWrapper} >
            <CreateTaskBody />
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