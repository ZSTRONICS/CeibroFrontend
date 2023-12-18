import { useEffect, useState } from "react";
// mui

// components
import { Box } from "@mui/material";
import { formatDropdownData } from "components/Utills/Globals";
import { AutocompleteField } from "components/material-ui/customMuiTextField/simpleTextField";
import { useDispatch } from "react-redux";
import { PROJECT_APIS, taskActions } from "redux/action";

const MockTaskApis = () => {
  const [selectedApi, setSelectedApi] = useState<any>(null);
  const dispatch = useDispatch();

  const handleAPIChange = (event: any, option: any) => {
    setSelectedApi(option ? option : null);
  };

  useEffect(() => {
    if (selectedApi !== null) {
      if (selectedApi.value === "createProject") {
        const formdata = new FormData();
        formdata.append("title", "first test project");
        formdata.append("description", "first test project description");
        dispatch(
          PROJECT_APIS.createProject({
            body: formdata,
          })
        );
      } else if (selectedApi.value === "getAllProject") {
        dispatch(PROJECT_APIS.getAllProjects());
      } else if (selectedApi.value === "projectHide") {
        dispatch(
          PROJECT_APIS.projectHideUnhide({
            other: {
              isProjHidden: true,
              projectId: "657c6868fa6501660b70b6b7",
            },
          })
        );
      } else if (selectedApi.value === "projectUnhide") {
        dispatch(
          PROJECT_APIS.projectHideUnhide({
            other: {
              isProjHidden: false,
              projectId: "657c6868fa6501660b70b6b7",
            },
          })
        );
      } else if (selectedApi.value === "projectFav") {
        dispatch(
          PROJECT_APIS.projectFavUnFav({
            other: {
              isProjFav: true,
              projectId: "657c6868fa6501660b70b6b7",
            },
          })
        );
      } else if (selectedApi.value === "projectUnFav") {
        dispatch(
          PROJECT_APIS.projectFavUnFav({
            other: {
              isProjFav: false,
              projectId: "657c6868fa6501660b70b6b7",
            },
          })
        );
      } else if (selectedApi.value === "createGroupByProjId") {
        dispatch(
          PROJECT_APIS.createProjectGroup({
            other: {
              projectId: "657c6868fa6501660b70b6b7",
            },
            body: {
              groupName: "Test Group 2",
            },
          })
        );
      } else if (selectedApi.value === "getGroupsByProjectId") {
        dispatch(
          PROJECT_APIS.getGroupsByProjectId({
            other: {
              projectId: "657c6868fa6501660b70b6b7",
            },
          })
        );
      } else if (selectedApi.value === "updateGroupById") {
        dispatch(
          PROJECT_APIS.updateGroupById({
            other: {
              groupId: "657c6cf2fa6501660b70c176",
            },
            body: {
              groupName: "test group 1",
            },
          })
        );
      } else if (selectedApi.value === "addNewDrawing") {
        const formdata = new FormData();
        formdata.append("projectId", "64f736813bc4a418e498d2c1");
        formdata.append("floorId", "64f736813bc4a418e498d2c1");
        formdata.append("groupId", "64f736813bc4a418e498d2c1");
        // formdata.append("uploaderLocalId", "64f735383bc4a418e498d0ae"); //set any local uuid
        formdata.append(
          "metadata",
          JSON.stringify([
            { fileName: "ui.png", orignalFileName: "ui.png", tag: "drawing" },
          ])
        );
        formdata.append("files", "/C:/Users/ZST/Downloads/ui.png");
        dispatch(
          PROJECT_APIS.addNewDrawing({
            body: formdata,
          })
        );
      }
      if (selectedApi.value === "createTask") {
        dispatch(
          taskActions.createTask({
            body: {
              dueDate: "30-07-2023",
              // topic: "64b119a742bbd2b53de76045",
              topic: "64ad0fffb9e0a0a0efbd6b0b",
              project: "",
              assignedToState: [
                {
                  phoneNumber: "+37251234567",
                  userId: "64748b875104dac077e750fb",
                  state: "new",
                },
                {
                  phoneNumber: "+923120619435",
                  userId: "644bdaf18fc7508375adb108",
                  state: "new",
                },
              ],
              creator: "644bdaf18fc7508375adb108",
              description: "",
              doneImageRequired: false,
              doneCommentsRequired: false,
              invitedNumbers: ["+112345678008"],
            },
          })
        );
      }

      if (selectedApi.value === "createTopic") {
        dispatch(
          taskActions.createTopic({
            body: {
              topic: "test topic case 3",
            },
          })
        );
      }
      if (selectedApi.value === "deleteTopic") {
        dispatch(
          taskActions.deleteTopic({
            other: { topicId: "644bdaf18fc7508375adb108" },
          })
        );
      }
      if (selectedApi.value === "getAllTopic") {
        dispatch(taskActions.getAllTopic());
      }
      if (selectedApi.value === "getAllTaskAllEvents") {
        dispatch(taskActions.getAllTasksAllEvents());
      }
      if (selectedApi.value === "syncTaskEventsByTaskId") {
        dispatch(
          taskActions.syncTaskEventsByTaskId({
            other: { taskId: "652fe8decb9983308b49941e" },
            body: {
              eventIds: ["652f9e7d0e89745624ea46cd"],
            },
          })
        );
      }
      if (selectedApi.value === "forwardTask") {
        dispatch(
          taskActions.forwardTask({
            other: { taskId: "64b279cb2e7ae3852ea4e6c8" },
            body: {
              assignedToState: [
                {
                  phoneNumber: "+37251234567",
                  userId: "64748b875104dac077e750fb",
                  state: "new",
                },
              ],
              invitedNumbers: ["+923048234919"],
            },
          })
        );
      }

      if (selectedApi.value === "taskHide") {
        dispatch(
          taskActions.taskHide({
            other: { taskId: "64b279cb2e7ae3852ea4e6c8" },
          })
        );
      }

      if (selectedApi.value === "taskShow") {
        dispatch(
          taskActions.taskShow({
            other: { taskId: "64b279cb2e7ae3852ea4e6c8" },
          })
        );
      }
      if (selectedApi.value === "taskSeen") {
        dispatch(
          taskActions.taskSeen({
            other: { taskId: "64b279cb2e7ae3852ea4e6c8" },
          })
        );
      }

      if (selectedApi.value === "taskCaneled") {
        dispatch(
          taskActions.taskCaneled({
            other: { taskId: "64b279cb2e7ae3852ea4e6c8" },
          })
        );
      }
      if (selectedApi.value === "taskUnCanel") {
        dispatch(
          taskActions.taskUnCanel({
            other: { taskId: "64b279cb2e7ae3852ea4e6c8" },
          })
        );
      }
      if (selectedApi.value === "doneTaskWithComment") {
        const formdata = new FormData();
        formdata.append("message", "dont task comment here with files");
        dispatch(
          taskActions.taskEventsWithFiles({
            other: {
              eventName: "doneTask",
              taskId: "64b279cb2e7ae3852ea4e6c8",
              hasFiles: false,
            },
            body: formdata,
          })
        );
      }
      if (selectedApi.value === "doneTaskWithCommentFiles") {
        const formdata = new FormData();

        formdata.append(
          "metadata",
          JSON.stringify([
            { fileName: "ui.png", orignalFileName: "ui.png", tag: "image" },
          ])
        );
        formdata.append("message", "write comment here with files 3");

        const payload = {
          other: {
            eventName: "doneTask",
            taskId: "64b279cb2e7ae3852ea4e6c8",
            hasFiles: false,
          },
          body: formdata,
        };

        dispatch(taskActions.taskEventsWithFiles(payload));
      }

      if (selectedApi.value === "tasksWithComment") {
        const formdata = new FormData();
        formdata.append("message", "done task comment here 1");
        dispatch(
          taskActions.taskEventsWithFiles({
            other: {
              eventName: "comment",
              taskId: "64b279cb2e7ae3852ea4e6c8",
              hasFiles: false,
            },
            body: formdata,
          })
        );
      }
      if (selectedApi.value === "createTaskWithFiles") {
        const formdata = new FormData();
        formdata.append("dueDate", "28-10-2023");
        formdata.append("topic", "64f736813bc4a418e498d2c1");
        formdata.append("project", "");
        formdata.append("creator", "64f735383bc4a418e498d0ae");
        formdata.append(
          "assignedToState",
          JSON.stringify(
            JSON.stringify([
              {
                phoneNumber: "+923120619435",
                userId: "64f7144039b14025ab86ca4d",
                state: "new",
              },
            ])
          )
        );
        formdata.append("description", "");
        formdata.append("doneImageRequired", "false");
        formdata.append("doneCommentsRequired", "false");
        formdata.append("invitedNumbers", JSON.stringify(JSON.stringify([])));
        dispatch(
          taskActions.createTask({
            other: {
              hasFiles: false,
            },
            body: formdata,
          })
        );
      }

      if (selectedApi.value === "tasksWithComment+files") {
        const formdata = new FormData();
        formdata.append("files", "/C:/Users/ZST/Downloads/ui.png");
        formdata.append("message", "comment with files");
        formdata.append(
          "metadata",
          '"[{\\"fileName\\":\\"ui.png\\",\\"orignalFileName\\":\\"ui.png\\",\\"tag\\":\\"image\\"}]"'
        );
        dispatch(
          taskActions.taskEventsWithFiles({
            other: {
              eventName: "comment",
              taskId: "64b279cb2e7ae3852ea4e6c8",
              hasFiles: true,
            },
            body: formdata,
          })
        );
      }
    }
  }, [selectedApi && selectedApi.value]);

  return (
    <Box>
      <AutocompleteField
        placeholder="Select API"
        label="CheckApi response"
        onChange={handleAPIChange}
        options={formatDropdownData(mockTaskApis, "title", "id")}
        sx={{
          width: "100%",
          border: "1px solid #c4c4c4",
          borderRadius: "0 4px 4px 0",
        }}
        showSideLabel={true}
        value={selectedApi}
      />
    </Box>
  );
};

const mockTaskApis = [
  { title: "createProject: /project", id: "createProject" },
  { title: "getAllProject: /project", id: "getAllProject" },
  {
    title: "projectHide: /project/hidden/isProjHidden/projectId",
    id: "projectHide",
  },
  {
    title: "projectUnhide: /project/hidden/isProjHidden/projectId",
    id: "projectUnhide",
  },

  {
    title: "projectFav: /project/favourite/isProjFav/projectId",
    id: "projectFav",
  },
  {
    title: "projectUnFav: /project/favourite/isProjFav/projectId",
    id: "projectUnFav",
  },
  {
    title: "createGroupByProjId: /project/projectId/group",
    id: "createGroupByProjId",
  },
  {
    title: "getGroupsByProjectId: /project/projectId/group",
    id: "getGroupsByProjectId",
  },
  {
    title: "updateGroupById: /project/group/groupId",
    id: "updateGroupById",
  },
  {
    title: "addNewDrawing: /docs/upload/drawing",
    id: "addNewDrawing",
  },

  { title: "createTopic: /task/topic", id: "createTopic" },
  { title: "createTask: /task", id: "createTask" },
  { title: "createTaskWithFiles: /task/files", id: "createTaskWithFiles" },
  { title: "forwardTask: /task/forward/:taskId", id: "forwardTask" },
  { title: "getAllTopic: /task/topic", id: "getAllTopic" },
  { title: "getAllTaskAllEvents: /task/timeStamp", id: "getAllTaskAllEvents" },
  {
    title: "syncTaskEventsByTaskId: /task/syncEvents",
    id: "syncTaskEventsByTaskId",
  },
  { title: "taskCaneled: //task/cancel/:taskId", id: "taskCaneled" },
  { title: "taskUnCanel: //task/uncancel/:taskId", id: "taskUnCanel" },
  { title: "taskSeen: /task/seen/:taskId", id: "taskSeen" },
  { title: "taskHide: /task/hide/:taskId", id: "taskHide" },
  { title: "taskShow: /task/unhide/:taskId", id: "taskShow" },
  { title: "deleteTopic: /task/topic/:topicId", id: "deleteTopic" },
  {
    title: "tasksWithComment: /task/upload/comment/:taskId",
    id: "tasksWithComment",
  },
  {
    title: "tasksWithComment+files: /task/upload/comment/:taskId",
    id: "tasksWithComment+files",
  },
  {
    title: "doneTaskWithComment: /task/upload/doneTask/:taskId",
    id: "doneTaskWithComment",
  },
  {
    title: "doneTaskWithCommentFiles: /task/upload/doneTask/:taskId",
    id: "doneTaskWithCommentFiles",
  },
];

export default MockTaskApis;
