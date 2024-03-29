import { Box, Divider } from "@mui/material";
import { CustomStack } from "components/CustomTags";
import { getDropdownOptions } from "components/Utills/Globals";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import { ChangeValueType, CreateNewTaskFormType, Options } from "../type";
import ProjectFilter from "./ProjectFilter";
import TaskMenu from "./TaskMenu";
import TopicTagsFilter from "./TopicTagsFilter";
import UserFilter from "./UserFilter";
interface Props {
  handleTaskRootState: (rootState: string) => void;
  handleClearAll: () => void;
  showHiddenTasks: boolean;
  selectedRootTask: string;
}
function TaskFilters(props: Props) {
  const dispatch = useDispatch();
  const {
    handleTaskRootState,
    handleClearAll,
    selectedRootTask,
    showHiddenTasks,
  } = props;
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
  const { Topics, selectedUsers, selectedTopicTags, selectedProjects } =
    useSelector((state: RootState) => state.task);
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
      dispatch(taskActions.setSelectedUsers([]));
    } else {
      if (Array.isArray(values) && name !== "invitedNumbers") {
        const userIds = values.map((value: any) => value.userId);
        dispatch(taskActions.setSelectedUsers([...selectedUsers, ...userIds]));
      }
    }
  };

  return (
    <>
      <CustomStack
        sx={{
          gap: 1,
          alignItems: "center",
          width: "100%",
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "95%",
            height: "max-contnet",
            overflowY: "hidden",
            marginTop: "14px",
            marginBottom: "14px",
          }}
        >
          {!showHiddenTasks && (
            <TaskMenu
              menuItems={isApproval ? TaskRootStateApproval : TaskRootState}
              selectedMenu={selectedTaskMenu}
            />
          )}
          <Divider
            sx={{
              height: "32px",
              color: "#E2E4E5",
              marginRight: "10px",
              marginTop: "2px",
            }}
            orientation="vertical"
            flexItem
          />
          <ProjectFilter TaskMain={true} options={allProjects} />
          <UserFilter
            name="assignedToState"
            label={"Users"}
            contacts={userAllContacts}
            recentUserContact={recentUserContact}
            handleChangeValues={handleChangeValues}
          />
          <TopicTagsFilter TaskMain={true} options={Topics.allTopics} />
        </Box>
        <Box
          sx={{
            fontSize: "12px",
            color: "#0076C8",
            fontWeight: 400,
            textTransform: "unset",
            display: "inline",
            minWidth: "60px",
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
