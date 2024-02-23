import { Box, Button } from "@mui/material";
import { CustomStack } from "components/CustomTags";
import DragAndDrop from "components/DropFileInput/DropFileInput";
import { hasOnlySpaces } from "components/Utills/Globals";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { PROJECT_CONFIG } from "config";
import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PROJECT_APIS } from "redux/action";
interface IProps {
  onClose: () => void;
}
function CreateProject(props: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<string | Blob>("");
  const dispatch = useDispatch();
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (hasOnlySpaces(e.target.value)) {
        setTitle("");
      } else {
        setTitle(e.target.value);
      }
    },
    [setTitle]
  );
  const handleCreateProject = () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      formData.append("title", title);
      formData.append("description", description);
      const payload = {
        body: formData,
        success: (res: any) => {
          if (res) {
            setIsLoading(false);
            dispatch({
              type: PROJECT_CONFIG.PROJECT_CREATED,
              payload: res.data.newProject,
            });
            props.onClose();
          }
        },
        onFailAction: (err: any) => {
          if (err) {
            console.error("Failed to upload image");
            setIsLoading(false);
          }
        },
      };
      dispatch(PROJECT_APIS.createProject(payload));
    } catch (e: any) {
      setIsLoading(false);
    }
  };
  return (
    <Box
      sx={{
        padding: "0 10px 14px",
        width: "100%",
        height: "600px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        Direction: "column",
      }}
    >
      <CustomStack sx={{ gap: 1, flexDirection: "column", width: "100%" }}>
        <Box width="100%">
          <CustomMuiTextField
            inputVariant="standard"
            required={true}
            typeName="counterText-field"
            name="projectName"
            label="Project name"
            placeholder={"Enter project name"}
            inputValue={title}
            onChange={handleChange}
            maxLength={50}
            inputProps={{ style: { background: "white" } }}
          />
        </Box>
        <Box width="100%">
          <CustomMuiTextField
            inputVariant="standard"
            multiline={true}
            required={true}
            typeName="counterText-field"
            name="description"
            label="Description"
            placeholder={"Enter Description"}
            inputValue={description}
            onChange={(e: any) => setDescription(e.target.value)}
            maxLength={1500}
            maxRows={5}
            inputProps={{ style: { background: "white" } }}
          />
        </Box>
        <CBox
          sx={{
            height: "240px",
            maxWidth: "390px",
            width: "100%",
            my: 1,
          }}
        >
          <DragAndDrop
            setFile={setFile}
            deleteFile={() => {
              setFile("");
            }}
          />
        </CBox>
      </CustomStack>
      <Button
        variant="contained"
        sx={{
          width: "20%",
          position: "relative",
          left: "60%",
          transform: "translateX(100%)",
        }}
        onClick={handleCreateProject}
        disabled={isLoading || title.length === 0}
      >
        Create
      </Button>
    </Box>
  );
}

export default CreateProject;
