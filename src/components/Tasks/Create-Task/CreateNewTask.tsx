import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import assets from "assets/assets";
import CustomDropDown from "components/Utills/CustomDropDown";
import React, { useEffect, useState } from "react";
import de from "date-fns/locale/de";
import Footer from "./Footer";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
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

const urls = [assets.visual, assets.visual, assets.visual];

function CreateNewTask() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [topicOptions, setTopicOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [projectOptions, setProjectOptions] = useState<
    { label: string; value: string }[]
  >([]);
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
      const getTopicOptions = getDropdownOptions(topics, "topic", "_id");
      setTopicOptions(getTopicOptions);
    }
  }, [Topics.allTopics]);

  useEffect(() => {
    if (allProjects && !isEmpty(allProjects)) {
      const getTopicOptions = getDropdownOptions(allProjects, "title", "_id");
      setProjectOptions(getTopicOptions);
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
        return { label: item[labelName], value: item[valueName] };
      })
    );
  };

  const handleCreateTask = () => {
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
  return (
    <div>
      <CustomDropDown
        label={"Topic"}
        options={topicOptions}
        createCallback={handleCreateCallback}
      />
      <UserDropDown label={"Assign to"} options={[]} />
      <CustomDropDown
        label={"Project"}
        options={projectOptions}
        createCallback={handleCreateCallback}
      />
      <CustomDatePicker />
      <Box sx={{ padding: "8px", width: "100%" }}>
        <TextField
          id="description-multiline"
          label="Description"
          multiline
          maxRows={4}
          variant="standard"
          sx={{ width: "100%" }}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <Typography>Done requirements</Typography>
        <Switch
          // checked={checked}
          // onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Image" />
        <FormControlLabel control={<Checkbox />} label="Comment" />
      </FormGroup>
      <Box sx={{ marginTop: "100px" }}>
        <Footer />
      </Box>
    </div>
  );
}

export default CreateNewTask;
