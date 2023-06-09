import React, { useState } from "react";
import DragAndDrop from "components/DropFileInput/DropFileInput";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { LoadingButton } from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_APIS } from "redux/action/project.action";
import { RootState } from "redux/reducers";
import { docsAction } from "redux/action";

interface IProps {
  showTextField: boolean;
  showImgDragDrop: boolean;
  isDrawing: boolean;
  isDocUploaded?: boolean;
}

function AddDrawingFloor(props: IProps) {
  const { showImgDragDrop, isDocUploaded, showTextField, isDrawing } = props;

  const { selectedProject, isfloorCreating } = useSelector(
    (state: RootState) => state.project
  );

  const dispatch = useDispatch();
  const [drwingFloorName, setDrawingFloorName] = useState<string>("");
  const [file, setFile] = useState<string | File | any>("");

  const handleSaveFloorData = () => {
    const payload = {
      body: {
        floorName: drwingFloorName,
      },

      other: selectedProject,
    };
    dispatch(PROJECT_APIS.createFloor(payload));
  };

  const handleSaveDrawingData = () => {
    try {
      const formData = new FormData();
      const metadataObject = [{ fileName: file.name, orignalFileName: file.name, tag: "drawing" }];
      const metadataString = JSON.stringify(metadataObject).replace(/"/g, '\\"');
      const finalMetadata = `"[${metadataString}]"`;
      if (file) {
        formData.append("files", file);
        formData.append("moduleName", "Floor");
        // implement selcted floor id
        formData.append("moduleId", "6481f0fd4f6bf0b7299af8f7");
        formData.append("metadata", finalMetadata);
        const payload = {
          body: formData,
        };
        dispatch(docsAction.uploadDocsByModuleNameAndId(payload));
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
