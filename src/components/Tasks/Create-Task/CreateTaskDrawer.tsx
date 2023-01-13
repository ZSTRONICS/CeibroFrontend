
import { Drawer } from '@material-ui/core'
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

const CreateTaskDrawer = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  let drawerOpen = useSelector((state: RootState) => state.task.taskDrawerOpen)
  const handleClose = () => {
    dispatch(taskActions.closeTaskDrawer())
  }

  return (
    <Drawer onClose={handleClose} open={drawerOpen} anchor="right" >
      <div className={classes.outerWrapper}>
        <DrawerHeader title='New Task' handleClose={handleClose} />

        <Grid container>
          <Grid item md={3} sx={{ background: 'white' }}><TaskDrawerMenu /></Grid>
          <Grid item md={9}>
            <div className={classes.drawerStatusContainer}>
              <Paper className={classes.statusWrapper} sx={{ display: 'flex', '&.MuiPaper-root': { padding: '7px 0 7px 5px' } }} elevation={0} variant='outlined' >
                <StatusMenu options={options} />
              </Paper>
            </div>

            <CreateTaskBody /></Grid>
        </Grid>
        {/* <CreateTaskFooter/>  */}
      </div>
    </Drawer>
  )
}

const options = [
  {
    title: "All",
    count: 10,
  },
  {
    title: "Ongoing",
    count: 2,
  },

  {
    title: "Submitted",
    count: 3,
  },
  {
    title: "Rejected",
    count: 4,
  },
  {
    title: "Approve",
    count: 1,
  },
  {
    title: "Done",
    count: 1,
  },
  {
    title: "Draft",
    count: 10,
  },
];
export default CreateTaskDrawer

const useStyles = makeStyles({
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
