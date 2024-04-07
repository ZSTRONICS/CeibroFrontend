import { LoadingButton } from "components/Button/Button";
import DragAndDrop from "components/DropFileInput/DropFileInput";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_APIS } from "redux/action";
import { RootState } from "redux/reducers";
import { socket } from "services/socket.services";

interface IProps {
  showTextField: boolean;
  showImgDragDrop: boolean;
  isDrawing: boolean;
  floorId?: string;
}

function AddDrawingFloor(props: IProps) {
  const dispatch = useDispatch();
  const { showImgDragDrop, showTextField, isDrawing, floorId } = props;
  const [drwingFloorName, setDrawingFloorName] = useState<string>("");
  const [file, setFile] = useState<string | File | any>("");

  const { isfloorCreating } = useSelector((state: RootState) => state.project);
  const selectedProjectId = socket.getSelectedProjId();

  const handleSaveFloorData = () => {
    const payload = {
      body: {
        floorName: drwingFloorName,
      },

      other: String(selectedProjectId),
    };
    dispatch(PROJECT_APIS.createFloor(payload));
  };

  const handleSaveDrawingData = () => {
    try {
      const formData = new FormData();
      const metadataObject = [
        { fileName: file.name, orignalFileName: file.name, tag: "drawing" },
      ];
      const metadataString = JSON.stringify(metadataObject).replace(
        /"/g,
        '\\"'
      );
      const finalMetadata = `"${metadataString}"`;
      if (file && floorId) {
        formData.append("files", file);
        formData.append("floorId", floorId);
        // formData.append("projectId", projectId);
        // formData.append("groupId", groupId);
        formData.append("metadata", finalMetadata);
        const payload = {
          body: formData,
        };
        dispatch(PROJECT_APIS.addNewDrawing(payload));
      }
    } catch (error) {
      console.error("Error occurred while uploading image:", error);
    }
  };

  const handleSave = () => {
    if (isDrawing === true) {
      handleSaveDrawingData();
    } else {
      handleSaveFloorData();
    }
  };

  return (
    <CBox>
      {showTextField && (
        <CBox sx={{ width: "100%", mt: 2 }}>
          <CustomMuiTextField
            inputVariant="standard"
            typeName="text-field"
            inputValue={drwingFloorName}
            label={showImgDragDrop ? "Drawing Name" : "Floor Name"}
            name="drawing"
            onChange={(e: any) => setDrawingFloorName(e.target.value)}
            placeholder={
              showImgDragDrop ? "Enter Drawing Name" : "Enter Floor Name"
            }
          />
        </CBox>
      )}

      {showImgDragDrop && (
        <CBox sx={{ width: "100%", mt: 3 }}>
          <DragAndDrop
            isAcceptAllFileTypes={true}
            setFile={setFile}
            deleteFile={() => {
              setFile("");
            }}
          />
        </CBox>
      )}
      <CBox sx={{ width: "100%", mt: 3, textAlign: "end" }}>
        <LoadingButton
          variant="contained"
          color="primary"
          loading={isfloorCreating}
          onClick={handleSave}
          sx={{
            padding: "5px 8px",
            fontWeight: "700",
            minWidth: { xs: "70px", sm: "80px" },
            fontSize: { xs: 12, sm: 13 },
          }}
        >
          Save
        </LoadingButton>
      </CBox>
    </CBox>
  );
}

export default AddDrawingFloor;
