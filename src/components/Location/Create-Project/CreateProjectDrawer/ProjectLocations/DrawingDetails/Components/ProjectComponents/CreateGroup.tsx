import { Box, Button } from "@mui/material";
import { hasOnlySpaces } from "components/Utills/Globals";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { PROJECT_CONFIG } from "config";
import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PROJECT_APIS } from "redux/action";
interface Props {
  projectId: string;
  closeModal: () => void;
}
function CreateGroup({ projectId, closeModal }: Props) {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateGroup = () => {
    setIsLoading(true);
    if (groupName.length > 0) {
      dispatch(
        PROJECT_APIS.createProjectGroup({
          other: {
            projectId: projectId,
          },
          body: {
            groupName: groupName,
          },
          success: (res: any) => {
            setGroupName("");
            setIsLoading(false);
            closeModal();
            dispatch({
              type: PROJECT_CONFIG.PROJECT_GROUP_CREATED,
              payload: res.data.group,
            });
          },
          onFailAction: (err: any) => {
            setIsLoading(false);
          },
        })
      );
    }
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (hasOnlySpaces(e.target.value)) {
        setGroupName("");
      } else {
        setGroupName(e.target.value);
      }
    },
    [setGroupName]
  );

  // const handleUpdateGroup = () => {
  //   dispatch(
  //     PROJECT_APIS.updateGroupById({
  //       other: {
  //         groupId: "657c6cf2fa6501660b70c176",
  //       },
  //       body: {
  //         groupName: "test group 1",
  //       },
  //     })
  //   );
  // };

  return (
    <>
      <Box
        sx={{
          padding: "0 10px 14px",
          width: "100%",
          height: "300px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          Direction: "column",
        }}
      >
        <Box>
          <CustomMuiTextField
            inputVariant="standard"
            required={true}
            typeName="counterText-field"
            name="groupName"
            label="Group name"
            placeholder={"Enter group name"}
            inputValue={groupName}
            onChange={handleChange}
            maxLength={50}
            inputProps={{ style: { background: "white" } }}
          />
        </Box>

        <Button
          variant="contained"
          sx={{
            width: "20%",
            position: "relative",
            left: "60%",
            transform: "translateX(100%)",
          }}
          onClick={handleCreateGroup}
          disabled={isLoading || groupName.length === 0}
        >
          Create
        </Button>
      </Box>
    </>
  );
}

export default CreateGroup;
