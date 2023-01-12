
import { Drawer, Grid } from '@material-ui/core'
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

const CreateTaskDrawer = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
  let  drawerOpen= useSelector((state:RootState)=> state.task.taskDrawerOpen)
    const handleClose = () => {
        dispatch(taskActions.closeTaskDrawer())
    }

    return (
        <Drawer onClose={handleClose} open={drawerOpen} anchor="right">
            <div className={classes.outerWrapper}>
                <DrawerHeader title='New Task' handleClose={handleClose}/>
                <Grid container>
                <Grid item md={3}><TaskDrawerMenu/></Grid>
                <Grid item md={9}> <CreateTaskBody/></Grid>
                </Grid>
                <CreateTaskFooter/>
            </div>
          </Drawer>
    )
}
export default CreateTaskDrawer

const useStyles = makeStyles({
    outerWrapper: {
        width: 'calc(100vw - 200px)',
        backgroundColor: colors.lightGrey,
        height: '100vh',
        '@media (max-width:960px)': {
            width: '100vw'
        }
    }
})
