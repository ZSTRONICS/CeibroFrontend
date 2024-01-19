import { Box, Button, TextField } from "@mui/material";
import { PROJECT_CONFIG } from "config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PROJECT_APIS } from "redux/action";
interface Props {
  projectId: string;
  closeModal: () => void;
}
function CreateGroup({ projectId, closeModal }: Props) {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const handleCreateGroup = () => {
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
            closeModal();
            dispatch({
              type: PROJECT_CONFIG.PROJECT_GROUP_CREATED,
              payload: res.data.group,
            });
          },
        })
      );
    }
  };
  return (
    <>
      <Box
        sx={{
          padding: "0 10px 14px",
          width: "100%",
          height: "350px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          Direction: "column",
        }}
      >
        <Box>
          <TextField
            sx={{ width: "100%" }}
            inputProps={{ style: { background: "white" } }}
            variant="filled"
            required={true}
            name="groupName"
            label="Group name"
            placeholder={"Enter group name"}
            value={groupName}
            onChange={(e: any) => {
              setGroupName(e.target.value);
            }}
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
        >
          Create
        </Button>
      </Box>
    </>
  );
}

export default CreateGroup;
