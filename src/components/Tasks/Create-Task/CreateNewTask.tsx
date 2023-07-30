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
        break;
      case "Project":
        dispatch(
          PROJECT_APIS.createProject({
            body: {
              title: label,
            },
          })
        );
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
  return (
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
      <CustomDatePicker />
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
                defaultChecked
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
      <Box sx={{ marginTop: "100px" }}>
        <Footer handleSubmitForm={handleCreateTask} />
      </Box>
    </Box>
  );
}

export default CreateNewTask;
