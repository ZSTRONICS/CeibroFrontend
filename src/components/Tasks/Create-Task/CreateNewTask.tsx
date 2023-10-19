import {
  Backdrop,
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
} from "@mui/material";
import CustomDatePicker from "components/Utills/CustomDatePicker";
import CustomDropDown from "components/Utills/CustomDropDown";
import CustomSwitch from "components/Utills/CustomSwitch";
import FileBox from "components/Utills/FileBox";
import ImageBox from "components/Utills/ImageBox";
import UserDropDown from "components/Utills/UserDropdown";
import { isEmpty } from "lodash";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  PROJECT_APIS,
  getAllProjects,
  taskActions,
  userApiAction,
} from "redux/action";
import { RootState } from "redux/reducers";
import { removeItem } from "utills/common";
import TaskHeader from "../TaskHeader";
import {
  ChangeValueType,
  CreateNewTaskFormType,
  Options,
  fileType,
} from "../type";
import Footer from "./Footer";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { IS_IMAGE } from "components/Utills/Globals";
import { taskConstantEn, taskConstantEt } from "translation/TaskConstant";
import EmptyScreenDescription from "../EmptyScreenDescription";

var initialValues = {
  dueDate: "",
  topic: "",
  project: "",
  assignedToState: [],
  creator: "",
  description: "",
  hasPendingFilesToUpload: false,
  doneImageRequired: false,
  doneCommentsRequired: false,
  invitedNumbers: [],
};

function CreateNewTask() {
  const [toggle, setToggle] = useState<boolean>(false);
  const isRenderEffect = useRef<any>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
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
  const { userAllContacts, recentUserContact } = useSelector(
    (state: RootState) => state.user
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const Topics = useSelector((state: RootState) => state.task.Topics);
  const allProjects = useSelector(
    (state: RootState) => state.project.allProjects
  );
  const windowClose = window.getSelection();

  useEffect(() => {
    if (!isRenderEffect.current) {
      dispatch(taskActions.getAllTopic());
      if (allProjects.length === 0) {
        dispatch(getAllProjects());
      }
      userAllContacts.length < 1 && dispatch(userApiAction.getUserContacts());
      recentUserContact.length < 1 &&
        dispatch(userApiAction.getRecentContacts());
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, []);
  useEffect(() => {
    if (Topics && !isEmpty(Topics)) {
      // const topics = [...Topics.allTopics, ...Topics.recentTopics];
      const getAllTopicOptions = getDropdownOptions(
        //todo null receive in array from backend
        Topics.allTopics.filter((item: any) => item != null),
        "topic",
        "_id"
      );
      const getRecentTopicOptions = getDropdownOptions(
        //todo null receive in array from backend
        Topics.recentTopics.filter((item: any) => item != null),
        "topic",
        "_id"
      );
      setTopicOptions({
        allOptions: getAllTopicOptions,
        recentOptions: getRecentTopicOptions,
      });
    }
  }, [Topics, Topics.allTopics]);

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
      data.map((item: any) => {
        return { label: item[labelName], value: item[valueName] };
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
            success: (res) => {
              if (res.data.newTopic) {
                setTopicOptions({
                  allOptions: [
                    {
                      label: res.data.newTopic.topic,
                      value: res.data.newTopic._id,
                    },
                    ...topicOptions.allOptions,
                  ],
                  recentOptions: [...topicOptions.recentOptions],
                });
                dispatch(taskActions.getAllTopic());
              }
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
        //todo check websocket events for new window
        dispatch(getAllProjects());
    }
  };

  const handleChangeValues = (
    value: ChangeValueType,
    name: keyof CreateNewTaskFormType
  ) => {
    if (value === undefined) {
      setSelectedData((prevSelectedData) => ({
        ...prevSelectedData,
        [name]: initialValues[name],
      }));
    } else {
      setSelectedData((prevSelectedData) => ({
        ...prevSelectedData,
        [name]: value,
      }));
    }
  };

  const handleAttachImageValue = (files: File[]) => {
    const newFiles = files.filter(
      (file) => !selectedImages.some((item) => item.name === file.name)
    );
    if (newFiles.length < files.length) {
      toast.error("Some images are already added in the list");
    }
    setSelectedImages([...selectedImages, ...newFiles]);
  };

  const handleSelectDocumentValue = (files: File[]) => {
    const newFiles = files.filter(
      (file) => !selectedDocuments.some((item) => item.name === file.name)
    );
    if (newFiles.length < files.length) {
      toast.error("Some Document already added in the list");
    }
    setSelectedDocuments([...selectedDocuments, ...newFiles]);
  };

  const handleClearFile = (file: File, type: fileType) => {
    if (type === "image") {
      const filterSelectedImages = removeItem(selectedImages, file);
      setSelectedImages(filterSelectedImages);
    } else {
      const filterSelectedDocs = removeItem(selectedDocuments, file);
      setSelectedDocuments(filterSelectedDocs);
    }
  };

  const handleDisableSubmit = () => {
    let valid = true;
    valid =
      selectedData.topic !== "" &&
      (selectedData.assignedToState.length > 0 ||
        (selectedData.invitedNumbers && selectedData.invitedNumbers.length > 0))
        ? false
        : true;
    if (selectedData.dueDate === "Invalid date") {
      valid = true;
    }
    return isSubmit || valid;
  };
  const handleCreateTask = () => {
    const formData = new FormData();
    setIsSubmit(true);
    const filesToUpload = [...selectedImages, ...selectedDocuments];
    formData.append("dueDate", selectedData.dueDate || "");
    formData.append("topic", selectedData.topic);
    formData.append("project", selectedData.project || "");
    formData.append("creator", user._id);
    formData.append(
      "assignedToState",
      JSON.stringify(JSON.stringify(selectedData.assignedToState))
    );
    formData.append("description", selectedData.description || "");
    formData.append(
      "doneImageRequired",
      String(selectedData.doneImageRequired)
    );
    formData.append(
      "doneCommentsRequired",
      String(selectedData.doneCommentsRequired)
    );
    formData.append(
      "invitedNumbers",
      JSON.stringify(JSON.stringify(selectedData.invitedNumbers))
    );
    if (selectedImages.length > 0 || selectedDocuments.length > 0) {
      try {
        if (!filesToUpload || filesToUpload.length === 0) {
          console.error("No files to upload.");
          return;
        }
        const metadataObjects: any = [];
        filesToUpload.forEach((file: any) => {
          formData.append("files", file);
          metadataObjects.push(
            JSON.stringify({
              fileName: file.name,
              orignalFileName: file.name,
              tag: IS_IMAGE(file.name) ? "image" : "file",
            })
          );
        });
        const finalMetadata = JSON.stringify(metadataObjects);
        formData.append("metadata", finalMetadata);
      } catch (error) {
        console.error("Error occurred while uploading files:", error);
      }
    }
    dispatch(
      taskActions.createTask({
        other: {
          hasFiles: filesToUpload.length > 0,
        },
        body: formData,
        success: (res: any) => {
          if (res) {
            setIsSubmit(false);
            if (windowClose) {
              window.close();
            }
          }
        },
        onFailAction: () => {
          setIsSubmit(false);
        },
      })
    );
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <TaskHeader title="New task" />
          <Box
            className="custom-scrollbar"
            sx={{
              padding: "16px",
              mt: 3,
              height: "calc(100vh - 54px)",
              overflow: "auto",
            }}
          >
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
              recentUserContact={recentUserContact}
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
            <Box sx={{ marginTop: "8px", width: "100%" }}>
              <TextField
                name="description"
                id="description-multiline"
                label="Description"
                multiline
                // maxRows={15}
                variant="standard"
                sx={{ width: "100%" }}
                onBlur={handleDescriptionChange}
              />
            </Box>

            {selectedImages.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  padding: "16px",
                  mt: 1,
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    height: "0.4rem",
                  },
                  "&::-webkit-scrollbar-track": {
                    WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                    borderRadius: "0.2rem",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.1)",
                  },
                }}
              >
                {selectedImages.map((file, i) => {
                  return (
                    <Box
                      key={i}
                      sx={{
                        width: "80px",
                        height: "80px",
                        display: "flex",
                        marginRight: "16px",
                      }}
                    >
                      <ImageBox src={URL.createObjectURL(file)} />
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          handleClearFile(file, "image");
                        }}
                        sx={{
                          top: "-6px",
                          right: "4px",
                          backgroundColor: "#0076C8",
                          color: "#fff",
                          width: "16px",
                          height: "16px",
                        }}
                        disableRipple
                      >
                        <ClearOutlinedIcon
                          sx={{ width: "16px", height: "16px" }}
                        />
                      </IconButton>
                    </Box>
                  );
                })}
              </Box>
            )}

            {selectedDocuments.length > 0 && (
              <Box
                sx={{
                  padding: "4px 8px",
                }}
              >
                <FileBox
                  title="Files"
                  showFullHeight={true}
                  files={selectedDocuments}
                  handleClearFile={handleClearFile}
                />
              </Box>
            )}
            <Box sx={{ pt: 1, pb: 3, pl: 0.76 }}>
              <CustomSwitch
                label="Done requirements"
                toggle={toggle}
                handleChange={() => {
                  setToggle(!toggle);
                }}
              />
              {toggle && (
                <>
                  <FormGroup row={true} sx={{ gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
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
                  {toggle && (
                    <EmptyScreenDescription
                      showWaterMark={false}
                      content={[
                        {
                          heading: taskConstantEt.done_requirement_quest_et,
                          description: taskConstantEt.done_requirement_desc_et,
                        },
                        {
                          heading: taskConstantEn.done_requirement_quest_en,
                          description: taskConstantEn.done_requirement_desc_en,
                        },
                      ]}
                    />
                  )}
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Footer
          isSubmitted={isSubmit}
          disabled={handleDisableSubmit()}
          showHeader={false}
          handleSubmitForm={handleCreateTask}
          handleAttachImageValue={handleAttachImageValue}
          handleGetLocationValue={() => {}}
          handleSelectDocumentValue={handleSelectDocumentValue}
        />
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmit}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default CreateNewTask;
