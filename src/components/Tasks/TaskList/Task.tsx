import { useEffect, useState, useRef } from "react";
// mui

// components
import { Box, Tab, Tabs } from "@mui/material";
import { tabsIndexProps } from "components/Utills/Globals";
import { TabPanel, TaskCard } from "components/TaskComponent";
import { CustomStack } from "components/CustomTags";
import { RootState } from "redux/reducers";
import { taskActions } from "redux/action";
import { useDispatch, useSelector } from "react-redux";

const Task = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const isRenderEffect = useRef<any>(false);
  const dispatch = useDispatch();
  const {
    allTaskAssignedToMe,
    allTaskCreatedFromMe,
    loadingAllTaskToMe,
    loadingAllTaskfromMe,
  } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    if (!isRenderEffect.current) {
      if (allTaskAssignedToMe.new.length === 0) {
        dispatch(taskActions.getTaskAssignedToMe());
      }
      if (allTaskCreatedFromMe.unread.length === 0) {
        dispatch(taskActions.getTaskCreatedFromMe());
      }
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, []);
  console.log("allTaskCreatedFromMe.unread", allTaskCreatedFromMe.unread);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            sx={{
              background: "white",
              zIndex: 1,
              position: "fixed",
              width: "100%",
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="New" {...tabsIndexProps(0)} />
            <Tab label="Unread" {...tabsIndexProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CustomStack gap={1.4} flexWrap="wrap" mt={5}>
            {allTaskAssignedToMe.new &&
              allTaskAssignedToMe.new.map((task: any) => (
                <TaskCard key={task._id} task={task} />
              ))}
          </CustomStack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomStack gap={1.4} flexWrap="wrap" mt={5}>
            {allTaskCreatedFromMe.unread &&
              allTaskCreatedFromMe.unread.map((task: any) => (
                <TaskCard key={task._id} task={task} />
              ))}
          </CustomStack>
        </TabPanel>
      </Box>
    </>
  );
};

export default Task;
