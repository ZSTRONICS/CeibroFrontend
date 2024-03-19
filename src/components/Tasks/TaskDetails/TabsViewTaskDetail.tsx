import BasicTabs from "components/TaskComponent/Tabs/BasicMuiTabs";
import { FILTER_DATA_BY_EXT, MEDIA_EXT } from "components/Utills/Globals";
import { ITask } from "constants/interfaces";
import { DynamicDimensions } from "hooks/useDynamicDimensions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import TaskDetails from ".";
import AddedDetails from "./AddedDetails";
import FilesTab from "./FilesTab";
interface IProps {
  isSplitView: boolean;
  selectedTask: ITask;
  taskDetailContDimension: DynamicDimensions;
  RECENT_TASK_UPDATED_TIME_STAMP: string;
  parentheight?: number;
  openCommentTab: string;
  headerHeight: number;
  handleSelectedDetailTab: (tab: string) => void;
}
function TabsViewTaskDetail(props: IProps) {
  const dispatch = useDispatch();
  const {
    isSplitView,
    taskDetailContDimension,
    selectedTask,
    RECENT_TASK_UPDATED_TIME_STAMP,
    parentheight,
    openCommentTab,
    handleSelectedDetailTab,
  } = props;
  const showDefault = isSplitView ? "Comments" : "Details";
  const [selectedTab, setSelectedTab] = useState(showDefault);
  const [tabIndex, setTabIndex] = useState(0);
  const { events, files } = selectedTask;
  const media = FILTER_DATA_BY_EXT(MEDIA_EXT, files);
  useEffect(() => {
    if (selectedTask && selectedTask._id) {
      dispatch(
        taskActions.getAllTaskFiles({ other: { taskId: selectedTask._id } })
      );
    }
  }, [selectedTask._id]);
  const { loadingAllTaskFiles, allTaskFiles } = useSelector(
    (state: RootState) => state.task
  );

  const commentsAndFilesTabs = [
    {
      label: "Comments",
      content: (
        <AddedDetails
          taskId={selectedTask._id}
          parentheight={parentheight}
          selectedTab={selectedTab}
          isCommentView={isSplitView}
          contHeight={taskDetailContDimension.height}
          events={events}
          hasFile={media.length > 0}
        />
      ),
    },
    {
      label: "Files",
      content: <FilesTab allTaskFiles={allTaskFiles} />,
    },
  ];

  const allTabs = [
    {
      label: "Details",
      content: (
        <>
          <TaskDetails
            DrawDetailCollapse={false}
            task={selectedTask}
            userSubStateLocal={"ongoing"}
            TASK_UPDATED_TIME_STAMP={RECENT_TASK_UPDATED_TIME_STAMP}
          />
        </>
      ),
    },
    ...commentsAndFilesTabs,
  ];
  const allTabsData = isSplitView ? commentsAndFilesTabs : allTabs;
  const findTabIndex = allTabsData.findIndex(
    (tab: any) => tab.label === openCommentTab
  );

  useEffect(() => {
    if (openCommentTab !== "") {
      if (findTabIndex === -1) {
        setTabIndex(0);
      } else {
        setTabIndex(findTabIndex);
      }
    }
  }, [openCommentTab, selectedTab]);

  useEffect(() => {
    if (selectedTab !== "") {
      handleSelectedDetailTab(selectedTab);
    }
  }, [selectedTab]);

  return (
    <BasicTabs
      selectedTabIndex={tabIndex}
      setSelectedTab={setSelectedTab}
      tabsBgColor={isSplitView ? "white" : "#F4F4F4"}
      tabsData={allTabsData}
    />
  );
}

export default TabsViewTaskDetail;
