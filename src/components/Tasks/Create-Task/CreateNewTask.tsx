import { Box, Switch, TextField, Typography } from "@mui/material";
import assets from "assets/assets";
import CustomDropDown from "components/Utills/CustomDropDown";
import React, { useEffect, useState } from "react";
import de from "date-fns/locale/de";
import Footer from "./Footer";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { getAllProjects, taskActions } from "redux/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { isEmpty } from "lodash";

const urls = [assets.visual, assets.visual, assets.visual];

function CreateNewTask() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [topicOptions, setTopicOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const dispatch = useDispatch();
  const tasks = useSelector((store: RootState) => store.task);
  const projects = useSelector((store: RootState) => store.project);
  const { allProjects } = projects;
  const { Topics } = tasks;

  useEffect(() => {
    dispatch(taskActions.getAllTopic());
    dispatch(getAllProjects());
  }, []);

  useEffect(() => {
    if (Topics && !isEmpty(Topics)) {
      const topics = [...Topics.allTopics, ...Topics.recentTopics];
      const getTopicOptions = getDropdownOptions(topics, "topic", "_id");
      setTopicOptions(getTopicOptions);
    }
  }, [Topics.allTopics]);

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
        break;

      default:
        break;
    }
  };
  return (
    <div>
      <CustomDropDown
        label={"Topic"}
        options={topicOptions}
        createCallback={handleCreateCallback}
      />
      <CustomDropDown
        label={"Project"}
        options={[]}
        createCallback={handleCreateCallback}
      />
      <CustomDropDown label={"Assign to"} options={[]} />
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
        <DatePicker
          value={selectedDate}
          inputFormat={"dd.MM.yyyy"}
          label={"Due date"}
          minDate={new Date().toISOString().slice(0, 10)}
          onChange={(newValue: any) => setSelectedDate(newValue)}
          renderInput={(params: any) => (
            <TextField
              {...params}
              error={false}
              sx={{
                ".MuiInputBase-input": {
                  padding: "9px 14px",
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
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
      <Footer />
    </div>
  );
}

export default CreateNewTask;
