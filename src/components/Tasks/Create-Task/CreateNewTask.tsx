import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CustomDropDown from "components/Utills/CustomDropDown";
import { ChangeEvent, useEffect, useState } from "react";
import Footer from "./Footer";
import {
  PROJECT_APIS,
  getAllProjects,
  taskActions,
  userApiAction,
} from "redux/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { isEmpty } from "lodash";
import CustomDatePicker from "components/Utills/CustomDatePicker";
import UserDropDown from "components/Utills/UserDropdown";
import { ChangeValueType, CreateNewTaskFormType, Options } from "../type";
import CustomSwitch from "components/Utills/CustomSwitch";
import TaskHeader from "../TaskHeader";
import ImageBox from "components/Utills/ImageBox";
import FileBox from "components/Utills/FileBox";

var initialValues = {
  dueDate: "",
  topic: "",
  project: "",
  assignedToState: [],
  creator: "",
  description: "",
  doneImageRequired: false,
  doneCommentsRequired: false,
  invitedNumbers: [],
};

function CreateNewTask() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
  const [selectedData, setSelectedData] =
    useState<CreateNewTaskFormType>(initialValues);
  const [topicOptions, setTopicOptions] = useState<Options>({
    allOptions: [],
    recentOptions: [],
  });
  const [projectOptions, setProjectOptions] = useState<Options>({
    allOptions: [],
    recentOptions: [],
  });
  const dispatch = useDispatch();
  const { userAllContacts, loadingContacts } = useSelector(
    (state: RootState) => state.user
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const tasks = useSelector((store: RootState) => store.task);
  const projects = useSelector((store: RootState) => store.project);
  const { allProjects } = projects;
  const { Topics } = tasks;

  useEffect(() => {
    dispatch(taskActions.getAllTopic());
    dispatch(getAllProjects());
    const payload = {
      other: { userId: user._id },
    };
    userAllContacts.length < 1 &&
      dispatch(userApiAction.getUserContacts(payload));
  }, []);

  useEffect(() => {
    console.log("topic");
    if (Topics && !isEmpty(Topics)) {
      const topics = [...Topics.allTopics, ...Topics.recentTopics];
      const getAllTopicOptions = getDropdownOptions(
        Topics.allTopics,
        "topic",
        "_id"
      );
      const getRecentTopicOptions = getDropdownOptions(
        Topics.recentTopics,
        "topic",
        "_id"
      );
      setTopicOptions({
        allOptions: getAllTopicOptions,
        recentOptions: getRecentTopicOptions,
      });
    }
  }, [Topics.allTopics]);

  useEffect(() => {
    if (allProjects && !isEmpty(allProjects)) {
      //todo : add allProjects
      const getAllProjectOptions = getDropdownOptions(
        allProjects,
        "title",
        "_id"
      );
      //todo : add recentProjects
      const getRecentProjectOptions = getDropdownOptions(
        allProjects,
        "title",
        "_id"
      );
      setProjectOptions({
        allOptions: getAllProjectOptions,
        recentOptions: getRecentProjectOptions,
      });
    }
  }, [allProjects]);

  const getDropdownOptions = (
    data: object[],
    labelName: string,
    valueName: string
  ) => {
    return (
      data &&
      data.map((item: object) => {
        //@ts-ignore
        return { label: item[labelName], value: item[valueName] };
      })
    );
  };

  const handleCreateTask = () => {
    let payload = selectedData;
    payload.creator = user._id;
    dispatch(
      taskActions.createTask({
        body: payload,
      })
    );
  };

  const handleDescriptionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    let value = event ? event.target.value : "";
    handleChangeValues(value, "description");
  };

  const handleCreateCallback = (type: string, label: string) => {
    switch (type) {
      case "Topic":
        dispatch(
          taskActions.createTopic({
            body: {
              topic: label,
            },
          })
        );
        //todo check websocket events for new window
        dispatch(taskActions.getAllTopic());

        break;
      case "Project":
        dispatch(
          PROJECT_APIS.createProject({
            body: {
              title: label,
            },
          })
        );
        //todo check websocket events for new window
        dispatch(getAllProjects());
    }
  };

  const handleChangeValues = (
    value: ChangeValueType,
    name: keyof CreateNewTaskFormType
  ) => {
    setSelectedData((prevSelectedData) => ({
      ...prevSelectedData,
      [name]: value,
    }));
  };
  console.log("selectedData", selectedData);
  const handleGetLocationValue = () => {};

  const handleAttachImageValue = (file: File) => {
    setSelectedImages([...selectedImages, file]);
  };
  const handleSelectDocumentValue = (file: File) => {
    setSelectedDocuments([...selectedDocuments, file]);
  };

  return (
    <Box>
      <TaskHeader title="New task" />
      <Box sx={{ padding: "16px" }}>
        <CustomDropDown
          name="topic"
          label={"Topic"}
          options={topicOptions}
          createCallback={handleCreateCallback}
          handleChangeValues={handleChangeValues}
        />
        <UserDropDown
          name="assignedToState"
          label={"Assign to"}
          contacts={userAllContacts}
          handleChangeValues={handleChangeValues}
        />
        <CustomDropDown
          name="project"
          label={"Project"}
          options={projectOptions}
          createCallback={handleCreateCallback}
          handleChangeValues={handleChangeValues}
        />
        <CustomDatePicker
          name="dueDate"
          label="Due Date"
          handleChangeValues={handleChangeValues}
        />
        <Box sx={{ padding: "8px", width: "100%" }}>
          <TextField
            name="description"
            id="description-multiline"
            label="Description"
            multiline
            maxRows={4}
            variant="standard"
            sx={{ width: "100%" }}
            onChange={handleDescriptionChange}
          />
        </Box>
        <CustomSwitch
          label="Done requirements"
          toggle={toggle}
          handleChange={() => {
            setToggle(!toggle);
          }}
        />
        {toggle && (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  // defaultChecked
                  onChange={(e, checked) => {
                    handleChangeValues(checked, "doneImageRequired");
                  }}
                />
              }
              label="Image"
              name="doneImageRequired"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Comment"
              onChange={(e, checked) => {
                handleChangeValues(checked, "doneCommentsRequired");
              }}
              name="doneCommentsRequired"
            />
          </FormGroup>
        )}
        {selectedImages.length > 0 && (
          <Box
            sx={{
              display: "flex",
              padding: "16px",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                height: "0.4rem",
              },
              "&::-webkit-scrollbar-track": {
                "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
                borderRadius: "0.2rem",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
              },
            }}
          >
            {selectedImages.map((file) => {
              return (
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    marginRight: "16px",
                  }}
                >
                  <ImageBox src={URL.createObjectURL(file)} />
                </Box>
              );
            })}
          </Box>
        )}

        {selectedDocuments.length > 0 && (
          <Box
            sx={{
              padding: "16px",
            }}
          >
            <FileBox title="Files" files={selectedDocuments} />
          </Box>
        )}
        <Box sx={{ marginTop: "100px" }}>
          <Footer
            handleSubmitForm={handleCreateTask}
            handleAttachImageValue={handleAttachImageValue}
            handleGetLocationValue={handleGetLocationValue}
            handleSelectDocumentValue={handleSelectDocumentValue}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CreateNewTask;
