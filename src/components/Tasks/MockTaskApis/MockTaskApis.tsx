import { useEffect, useState } from "react";
// mui

// components
import { Box } from "@mui/material";
import { formatDropdownData } from "components/Utills/Globals";
import { AutocompleteField } from "components/material-ui/customMuiTextField/simpleTextField";
import { useDispatch } from "react-redux";
import { taskActions } from "redux/action";
import { constants } from "http2";

const MockTaskApis = () => {
  const [selectedApi, setSelectedApi] = useState<any>(null);
  const dispatch = useDispatch();

  const handleAPIChange = (event: any, option: any) => {
    setSelectedApi(option ? option : null);
  };

  useEffect(() => {
    if (selectedApi !== null) {
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
      if (selectedApi.value === "getAllTaskToMe") {
        dispatch(taskActions.getAllTaskToMe());
      }
      if (selectedApi.value === "getAllTaskFromMe") {
        dispatch(taskActions.getAllTaskFromMe());
      }
      if (selectedApi.value === "getAllTaskHidden") {
        dispatch(taskActions.getAllTaskHidden());
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
        const fetchFile = (filePath: any) => {
          return new Promise((resolve, reject) => {
            fetch(filePath)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("File fetch request failed.");
                }
                return response.blob();
              })
              .then((fileBlob) => {
                const file = new File([fileBlob], "ui.png", { type: "*/*" });
                resolve(file);
              })
              .catch((error) => {
                reject(error);
              });
          });
        };

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
  { title: "createTopic: /task/topic", id: "createTopic" },
  { title: "createTask: /task", id: "createTask" },
  { title: "forwardTask: /task/forward/:taskId", id: "forwardTask" },
  { title: "getAllTopic: /task/topic", id: "getAllTopic" },
  { title: "getAllTaskToMe: /task/to-me", id: "getAllTaskToMe" },
  { title: "getAllTaskFromMe: /task/from-me", id: "getAllTaskFromMe" },
  { title: "getAllTaskHidden: /task/hidden", id: "getAllTaskHidden" },
  { title: "taskCaneled: //task/cancel/:taskId", id: "taskCaneled" },
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
