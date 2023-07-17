import { useEffect, useState, useRef, ChangeEvent } from "react";
// components
import { Box, Grid, Tab, Tabs, InputBase, Badge } from "@mui/material";
import { tabsIndexProps } from "components/Utills/Globals";
import { TabPanel, TaskCard } from "components/TaskComponent";
import { CustomStack } from "components/CustomTags";
import { RootState } from "redux/reducers";
import { taskActions } from "redux/action";
import { useDispatch, useSelector } from "react-redux";
// mui
import { makeStyles } from "@mui/styles";
import TaskDetail from "../TaskDetails";
import StyledChip from "components/Utills/StyledChip";
import { Task as ITask } from "constants/interfaces";
import { event } from "jquery";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    borderRadius: "20px",
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1, 2),
    textTransform: "none",
  },
}));

const Task = () => {
  const [value, setValue] = useState(0);
  const [filteredTask, setFilteredTask] = useState<ITask[] | null>(null);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const isRenderEffect = useRef<any>(false);
  const dispatch = useDispatch();
  const { task } = useSelector((state: RootState) => state);
  const {
    selectedTaskFilter,
    allTaskToMe,
    allTaskFromMe,
    loadingAllTaskToMe,
    loadingAllTaskfromMe,
  } = task;
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    const key = Object.keys(task[selectedTaskFilter])[0];
    setFilteredTask(
      searchInData(task[selectedTaskFilter][selectedTab], "", "taskUID")
    );
    setSelectedTab(key);
    setSelectedTask(task[selectedTaskFilter][key][0]);
  }, [selectedTaskFilter, allTaskFromMe, allTaskToMe]);

  useEffect(() => {
    const key = Object.keys(task[selectedTaskFilter])[0];
    if (!isRenderEffect.current) {
      if (allTaskToMe.new.length === 0) {
        dispatch(taskActions.getAllTaskToMe());
      }
      if (allTaskFromMe.unread.length === 0) {
        dispatch(taskActions.getAllTaskFromMe());
      }
    }
    setSelectedTab(key);
    setSelectedTask(task[selectedTaskFilter][key][0]);
    setFilteredTask(searchInData(task[selectedTaskFilter][key], "", "taskUID"));
    return () => {
      isRenderEffect.current = true;
    };
  }, []);

  const handleTabClick = (type: string) => {
    setSelectedTab(type);
    setSelectedTask(task[selectedTaskFilter][type][0]);
    setFilteredTask(
      searchInData(task[selectedTaskFilter][type], "", "taskUID")
    );
  };

  const handleSelectedTask = (task: ITask) => {
    setSelectedTask(task);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTxt = event.target.value;
    console.log(searchTxt, "search");
    const filterData = searchInData(
      task[selectedTaskFilter][selectedTab],
      searchTxt,
      "taskUID"
    );
    setFilteredTask(filterData);
  };

  function searchInData(data: ITask[], searchText: string, property: string) {
    let filteredData: ITask[] = data;
    if (searchText != "") {
      filteredData = data.filter((item) => {
        const searchValue = item[property].toLowerCase();
        return searchValue.includes(searchText.toLowerCase());
      });
    }

    return filteredData;
  }

  const renderTabs = (type: string, activeTab: string) => {
    switch (type) {
      case "new":
        return (
          <StyledChip
            label="New"
            notfiyCount="2"
            bgColor="#CFECFF"
            active={activeTab === "new" ? true : false}
            callback={() => handleTabClick("new")}
          />
        );
      case "unread":
        return (
          <StyledChip
            label="Unread"
            notfiyCount="2"
            bgColor="#CFECFF"
            active={activeTab === "unread" ? true : false}
            callback={() => handleTabClick("unread")}
          />
        );
      case "ongoing":
        return (
          <StyledChip
            label="Ongoing"
            notfiyCount="2"
            bgColor="#F1B740"
            active={activeTab === "ongoing" ? true : false}
            callback={() => handleTabClick("ongoing")}
          />
        );
      case "done":
        return (
          <StyledChip
            label="Done"
            notfiyCount="2"
            bgColor="#55BCB3"
            active={activeTab === "done" ? true : false}
            callback={() => handleTabClick("done")}
          />
        );
      case "canceled":
        return (
          <StyledChip
            label="Canceled"
            notfiyCount="2"
            bgColor="#FFE7E7"
            active={activeTab === "canceled" ? true : false}
            callback={() => handleTabClick("canceled")}
          />
        );
    }
  };
  return (
    <Grid container>
      <Grid item md={2.5} sx={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            height: "48px",
          }}
        >
          {task &&
            selectedTaskFilter &&
            Object.keys(task[selectedTaskFilter]).map((key: string) => {
              return renderTabs(key, selectedTab);
            })}
        </Box>

        <CustomStack
          gap={1.4}
          flexWrap="wrap"
          maxHeight={"100vh"}
          overflow={"auto"}
          sx={{ scrollbarWidth: "8px" }}
        >
          <Box
            sx={{
              width: "100%",
              borderWidth: "0px 0px 1px 0px",
              borderColor: "#818181",
              borderStyle: "solid",
            }}
          >
            <InputBase
              placeholder="Start typing to search"
              sx={{ height: "48px" }}
              onChange={handleSearch}
            />
          </Box>
          {task &&
            filteredTask &&
            filteredTask.map((task: any) => (
              <TaskCard
                key={task._id}
                task={task}
                handleClick={handleSelectedTask}
              />
            ))}
        </CustomStack>
      </Grid>
      <Grid item md={9.5}>
        {selectedTask && <TaskDetail task={selectedTask} />}
      </Grid>
    </Grid>
  );
};
export default Task;
