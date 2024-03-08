import BasicTabs from "components/TaskComponent/Tabs/BasicMuiTabs";
import { FILTER_DATA_BY_EXT, MEDIA_EXT } from "components/Utills/Globals";
import { ITask } from "constants/interfaces";
import { DynamicDimensions } from "hooks/useDynamicDimensions";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import TaskDetails from ".";
import AddedDetails from "./AddedDetails";
import FilesTab from "./FilesTab";
interface IProps {
  isCommentView: boolean;
  selectedTask: ITask;
  taskDetailContDimension: DynamicDimensions;
  RECENT_TASK_UPDATED_TIME_STAMP: string;
}
function TabsViewTaskDetail(props: IProps) {
  const dispatch = useDispatch();
  const isRenderEffect = useRef<boolean>(false);
  const [selectedTab, setSelectedTab] = useState("Details");
  const {
    isCommentView,
    taskDetailContDimension,
    selectedTask,
    RECENT_TASK_UPDATED_TIME_STAMP,
  } = props;
  const { events, files } = selectedTask;
  const media = FILTER_DATA_BY_EXT(MEDIA_EXT, files);
  useEffect(() => {
    if (!isRenderEffect.current) {
      if (selectedTask && selectedTask._id) {
        dispatch(
          taskActions.getAllTaskFiles({ other: { taskId: selectedTask._id } })
        );
      }
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, [selectedTask._id]);
  const { loadingAllTaskFiles, allTaskFiles } = useSelector(
    (state: RootState) => state.task
  );

  const commentsAndFilesTabs = [
    {
      label: "Comments",
      content: (
        <AddedDetails
          selectedTab={selectedTab}
          isCommentView={isCommentView}
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

  return (
    <div>
      <BasicTabs
        setSelectedTab={setSelectedTab}
        tabsBgColor={isCommentView ? "white" : "#F4F4F4"}
        tabsData={isCommentView ? commentsAndFilesTabs : allTabs}
      />
    </div>
  );
}

export default TabsViewTaskDetail;
