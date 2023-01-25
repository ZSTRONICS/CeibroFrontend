import React from 'react'
import { Drawer } from '@material-ui/core';
// import { OPEN_TASK_DETAIL_DRAWER } from 'config/task.config';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import colors from '../../../assets/colors';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import taskActions from 'redux/action/task.action';
import DrawerHeader from 'components/Projects/Create-Project/CreateProjectDrawer/DrawerHeader';
import { Grid } from '@mui/material';
import TaskDrawerMenu from '../Create-Task/TaskDrawerMenu';
import TaskDetail from './TaskDetail';

export default function TaskDetailDrawer() {
    const classes = useStyles()
    const dispatch = useDispatch()

    let drawerDetailOpen = useSelector((state: RootState) => state.task.taskDetailDrawer)
    const handleClose = () => {
        // dispatch(taskActions.closeTaskDetailDrawer())
    }
    return (
        <div>
            <Drawer onClose={handleClose} anchor="right" open={drawerDetailOpen}>
                <div className={classes.outerWrapper}>
                    <DrawerHeader title='Task Detail' handleClose={handleClose} />
                    <Grid container>

                        <Grid item md={12} sx={{ background: 'white' }}>
                            <TaskDetail />
                        </Grid>
                    </Grid>
                </div>


            </Drawer>
        </div>
    )
}
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