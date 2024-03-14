import { Button } from "@mui/material";
import { CustomStack } from "components/CustomTags";
import TagListDropdown from "components/Location/LocationImageDetails/TagsDropdown";
import UserListDropdown from "components/Location/LocationImageDetails/UserListDropdown";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import TaskMenu from "./TaskMenu";
interface Props {
  handleTaskRootState: (rootState: string) => void;
  handleClearAll: () => void;
  showHiddenTasks: boolean;
  selectedRootTask: string;
}
function TaskFilters(props: Props) {
  const {
    handleTaskRootState,
    handleClearAll,
    selectedRootTask,
    showHiddenTasks,
  } = props;
  const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTaskMenu, setSelectedTaskMenu] = useState<string>("All");

  const handleMenuItemClick = (selectedItem: string) => {
    setSelectedTaskMenu(selectedItem);
    handleTaskRootState(selectedItem);
  };
  const { allProjects } = useSelector((state: RootState) => state.project);
  const { userAllContacts } = useSelector((state: RootState) => state.user);
  const Topics = useSelector((state: RootState) => state.task.Topics);

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

  const isApproval = selectedRootTask === "Approval";
  return (
    <CustomStack sx={{ gap: 1, alignItems: "flex-start" }}>
      {!showHiddenTasks && (
        <TaskMenu
          menuItems={isApproval ? TaskRootStateApproval : TaskRootState}
          selectedMenu={selectedTaskMenu}
        />
      )}
      <TagListDropdown
        labelName="Project"
        isSmall={true}
        options={[]}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <UserListDropdown
        isSmall={true}
        options={[]}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
      <TagListDropdown
        isSmall={true}
        options={[]}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <Button
        variant="text"
        sx={{ fontSize: "12px", fontWeight: 400, textTransform: "unset" }}
        onClick={handleClearAll}
      >
        Clear all
      </Button>
    </CustomStack>
  );
}

export default TaskFilters;
