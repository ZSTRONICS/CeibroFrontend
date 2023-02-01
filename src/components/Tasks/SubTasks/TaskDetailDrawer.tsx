import React from 'react'
import { Drawer } from '@material-ui/core';
import colors from '../../../assets/colors';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import taskActions from 'redux/action/task.action';
import DrawerHeader from 'components/Projects/Create-Project/CreateProjectDrawer/DrawerHeader';
import { Grid } from '@mui/material';
import TaskDrawerMenu from '../Create-Task/TaskDrawerMenu';
import TaskDetail from './TaskDetail';
import { TASK_CONFIG } from 'config/task.config';
import { RootState } from 'redux/reducers';

function TaskDetailDrawer() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const subTaskDetailDrawer = useSelector(
        (store: RootState) => store.task.subTaskDetailDrawer)

    const { selectedSubtaskFroDetailView } = useSelector(
        (store: RootState) => store.task)

    const handleClose = () => {
        dispatch({
            type: TASK_CONFIG.SET_SUBTASK,
            payload: null,
        });

        dispatch(taskActions.closeSubtaskDetailDrawer())
    }

    return (
        <div>
            <Drawer onClose={handleClose} anchor="right" open={subTaskDetailDrawer}>
                <div className={classes.outerWrapper}>
                    <DrawerHeader title='Subtask Detail' handleClose={handleClose} />
                    <Grid container>
                        {selectedSubtaskFroDetailView && selectedSubtaskFroDetailView ? <Grid item md={12} sx={{ background: 'white' }}>
                            <TaskDetail subtaskDetail={selectedSubtaskFroDetailView} />
                        </Grid> : <>OOPS! there is no detail available</>}
                    </Grid>
                </div>
            </Drawer>
        </div>
    )
}

export default TaskDetailDrawer

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