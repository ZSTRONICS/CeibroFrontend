import * as React from "react";
import { Drawer, makeStyles } from '@material-ui/core'
import { Box } from "@mui/material";
import SubTaskList from "components/Tasks/SubTasks/SubTaskList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import taskActions from "redux/action/task.action";
import colors from "assets/colors";
import DrawerHeader from "components/Projects/Create-Project/CreateProjectDrawer/DrawerHeader";

export default function CDrawer(props: any) {
  const dispatch = useDispatch();
  const classes = useStyles()
  let taskDrawer = useSelector((state: RootState) => state.task);

  const handleCloseDrawer = () => {
    dispatch(taskActions.closeTaskDrawer())
  }

  return (
    <>
      <Drawer anchor="right"
        open={taskDrawer.taskDrawerOpen}
        onClose={handleCloseDrawer}
      >
        <Box className={classes.outerWrapper}>
          <DrawerHeader title="Subtask Title" handleClose={handleCloseDrawer} />
          {/* <SubTaskList /> */}
        </Box>
      </Drawer>
    </>
  );
}
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