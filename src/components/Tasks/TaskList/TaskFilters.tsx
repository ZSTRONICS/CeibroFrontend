import { Box } from "@mui/material";
import { CustomStack } from "components/CustomTags";
import { getDropdownOptions } from "components/Utills/Globals";
import UserDropDown from "components/Utills/UserDropdown";
import { Topic } from "constants/interfaces";
import { isEmpty } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { ChangeValueType, CreateNewTaskFormType, Options } from "../type";
import ProjectFilter from "./ProjectFilter";
import TaskMenu from "./TaskMenu";
import TopicTagsFilter from "./TopicTagsFilter";
interface Props {
  handleTaskRootState: (rootState: string) => void;
  handleClearAll: () => void;
  showHiddenTasks: boolean;
  selectedRootTask: string;
  selectedUsers: string[];
  selectedTopicTags: Topic[];
  selectedProjects: Project[];
  setSelectedUsers: Dispatch<SetStateAction<string[]>>;
  setSelectedTopicTags: Dispatch<SetStateAction<Topic[]>>;
  setSelectedProjects: Dispatch<SetStateAction<Project[]>>;
}
function TaskFilters(props: Props) {
  const {
    handleTaskRootState,
    handleClearAll,
    selectedRootTask,
    showHiddenTasks,
    selectedUsers,
    setSelectedUsers,
    selectedTopicTags,
    setSelectedTopicTags,
    selectedProjects,
    setSelectedProjects,
  } = props;
  // const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTaskMenu, setSelectedTaskMenu] = useState<string>("All");
  var initialValues: any = {
    tags: [],
    project: [],
    assignedToState: [],
  };
  const handleMenuItemClick = (selectedItem: string) => {
    setSelectedTaskMenu(selectedItem);
    handleTaskRootState(selectedItem);
  };
  const { allProjects } = useSelector((state: RootState) => state.project);
  const { userAllContacts, recentUserContact } = useSelector(
    (state: RootState) => state.user
  );
  const Topics = useSelector((state: RootState) => state.task.Topics);
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
  const AllTask = [
    {
      label: "All",
      callBackHandler: () => handleMenuItemClick("All"),
    },
  ];
  const TaskRootState = [
    ...AllTask,
    {
      label: "From me",
      callBackHandler: () => handleMenuItemClick("From me"),
    },
    {
      label: "To me",
      callBackHandler: () => handleMenuItemClick("To me"),
    },
  ];
  const TaskRootStateApproval = [
    ...AllTask,
    {
      label: "To Review",
      callBackHandler: () => handleMenuItemClick("To Review"),
    },
    {
      label: "Pending", // in-review
      callBackHandler: () => handleMenuItemClick("Pending"),
    },
  ];
  const getProjectOptions = (
    data: object[],
    labelName: string,
    valueName: string,
    _id?: string,
    isShown: boolean = false,
    overideLabel?: string
  ) => {
    return (
      data &&
      data.map((item: any) => {
        return {
          label: overideLabel ? overideLabel : item[labelName],
          value: item[valueName],
          _id: item?._id || "",
          isShown,
          isPermanenetOption: true,
        };
      })
    );
  };
  useEffect(() => {
    if (Topics && !isEmpty(Topics)) {
      const getAllTopicOptions = getDropdownOptions(
        //todo null receive in array from backend
        Topics.allTopics.filter(Boolean),
        "topic",
        "topic",
        "_id"
      );
      setTopicOptions({
        allOptions: getAllTopicOptions,
        recentOptions: [],
      });
    }
  }, [Topics, Topics.allTopics.length]);
  useEffect(() => {
    if (allProjects && !isEmpty(allProjects)) {
      const getAllProjectOptions = getProjectOptions(
        allProjects,
        "title",
        "title",
        "_id"
      );
      setProjectOptions({
        allOptions: getAllProjectOptions,
        recentOptions: [],
      });
    }
  }, [allProjects.length]);
  const isApproval = selectedRootTask === "Approval";

  const handleChangeValues = (values: ChangeValueType, name: keyof any) => {
    if (values === undefined) {
      console.log(selectedData);
      setSelectedUsers([]);
      // setSelectedData((prevSelectedData) => ({
      //   ...prevSelectedData,
      //   [name]: initialValues[name],
      // }));
      // setSelectedUsers(initialValues[name]);
    } else {
      // setSelectedData((prevSelectedData) => ({
      //   ...prevSelectedData,
      //   [name]: value,
      // }));
      // const filteredUsers = userAllContacts.filter((contact: any) =>
      //   values.some((value) => contact.userId == value.userId)
      // );
      // debugger;
      if (Array.isArray(values) && name != "invitedNumbers") {
        const userIds = values.map((value: any) => value.userId);
        setSelectedUsers([...selectedUsers, ...userIds]);
      }
    }
  };

  return (
    <>
      <CustomStack
        sx={{
          gap: 1,
          alignItems: "flex-start",
          width: "100%",
          // overflow: "auto",
          // border: "solid 1px red",
          // dis
        }}
      >
        {!showHiddenTasks && (
          <TaskMenu
            menuItems={isApproval ? TaskRootStateApproval : TaskRootState}
            selectedMenu={selectedTaskMenu}
          />
        )}
        <ProjectFilter
          options={allProjects}
          selectedProjects={selectedProjects}
          setSelectedProjects={setSelectedProjects}
        />
        <Box
          sx={{
            maxWidth: "90px",
            width: "100%",
            mt: "-10px",
          }}
        >
          <UserDropDown
            isTaskFilter={true}
            name="assignedToState"
            label={"Users"}
            contacts={userAllContacts}
            recentUserContact={recentUserContact}
            handleChangeValues={handleChangeValues}
            tasktilters={true}
          />
        </Box>
        <TopicTagsFilter
          options={Topics.allTopics}
          selectedTopics={selectedTopicTags}
          setSelectedTopics={setSelectedTopicTags}
        />
        {/* <TagListDropdown
          isSmall={true}
          options={[]}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tasktilters={true}
        /> */}
        <Box
          // variant="text"
          sx={{
            fontSize: "12px",
            color: "#0076C8",
            fontWeight: 400,
            textTransform: "unset",
            display: "inline",
            minWidth: "60px",
            border: "solid 1px red",
            // width: "max-contnet",
            marginTop: "10px",
            cursor: "pointer",
            transform: "translateX(5px)",
          }}
          onClick={() => {
            setSelectedTaskMenu("All");
            handleClearAll();
          }}
        >
          Clear all
        </Box>
      </CustomStack>
    </>
  );
}

export default TaskFilters;
