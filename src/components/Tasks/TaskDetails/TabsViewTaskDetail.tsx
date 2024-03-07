import BasicTabs from "components/TaskComponent/Tabs/BasicMuiTabs";
import { FILTER_DATA_BY_EXT, MEDIA_EXT } from "components/Utills/Globals";
import { ITask } from "constants/interfaces";
import TaskDetails from ".";
import AddedDetails from "./AddedDetails";
interface IProps {
  isCommentView: boolean;
  selectedTask: ITask;
  RECENT_TASK_UPDATED_TIME_STAMP: string;
}
function TabsViewTaskDetail(props: IProps) {
  const { isCommentView, selectedTask, RECENT_TASK_UPDATED_TIME_STAMP } = props;
  const { events, files } = selectedTask;
  const media = FILTER_DATA_BY_EXT(MEDIA_EXT, files);
  const commentsAndFilesTabs = [
    {
      label: "Comments",
      content: (
        <>
          <AddedDetails events={events} hasFile={media.length > 0} />
        </>
      ),
    },
    { label: "Files", content: "Content of item three" },
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
        tabsBgColor={isCommentView ? "white" : "#F4F4F4"}
        tabsData={isCommentView ? commentsAndFilesTabs : allTabs}
      />
    </div>
  );
}

export default TabsViewTaskDetail;
