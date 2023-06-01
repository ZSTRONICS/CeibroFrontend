import React, { useState } from "react";
import DragAndDrop from "components/DropFileInput/DropFileInput";
import { CBox } from "components/material-ui";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import CButton from "components/Button/Button";

function AddFloor() {
  const [drwingName, setDrawingName] = useState<string>("");
  const [file, setFile] = useState<string | Blob>("");

  const handleSave = () => {
    console.log("save");
  };

  return (
    <CBox>
      <CBox sx={{ width: "100%", mt: 2 }}>
        <CustomMuiTextField
          typeName="text-field"
          inputValue={drwingName}
          label="Drawing Name"
          name="drawing"
          onChange={(e: any) => setDrawingName(e.target.value)}
          placeholder="Enter Drawing Name"
        />
      </CBox>

      <CBox sx={{ width: "100%", mt: 3 }}>
        <DragAndDrop
          setFile={setFile}
          deleteFile={() => {
            setFile("");
          }}
        />
      </CBox>
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

export default AddFloor;
