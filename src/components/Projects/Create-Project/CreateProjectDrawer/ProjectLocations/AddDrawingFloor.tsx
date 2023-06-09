import React, { useState } from "react";
import DragAndDrop from "components/DropFileInput/DropFileInput";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import CButton from "components/Button/Button";

interface IProps {
  showTextField: boolean;
  showImgDragDrop: boolean;
}

function AddDrawingFloor(props: IProps) {
  const { showImgDragDrop, showTextField } = props;
  const [drwingName, setDrawingName] = useState<string>("");
  const [file, setFile] = useState<string | Blob>("");

  const handleSave = () => {
    console.log("save");
  };

  return (
    <CBox>
      {showTextField && (
        <CBox sx={{ width: "100%", mt: 2 }}>
          <CustomMuiTextField
            typeName="text-field"
            inputValue={drwingName}
            label={showImgDragDrop ? "Drawing Name" :"Floor Name"}
            name="drawing"
            onChange={(e: any) => setDrawingName(e.target.value)}
            placeholder={
              showImgDragDrop ?  "Enter Drawing Name" :"Enter Floor Name"
            }
          />
        </CBox>
      )}

      {showImgDragDrop && (
        <CBox sx={{ width: "100%", mt: 3 }}>
          <DragAndDrop
            setFile={setFile}
            deleteFile={() => {
              setFile("");
            }}
          />
        </CBox>
      )}
      <CBox sx={{ width: "100%", mt: 3, textAlign: "end" }}>
        <CButton
          onClick={handleSave}
          label="Save"
          variant="contained"
          sx={{
            padding: "5px 8px",
            fontWeight: "700",
            minWidth: { xs: "70px", sm: "80px" },
            fontSize: { xs: 12, sm: 13 },
          }}
        />
      </CBox>
    </CBox>
  );
}

export default AddDrawingFloor;
