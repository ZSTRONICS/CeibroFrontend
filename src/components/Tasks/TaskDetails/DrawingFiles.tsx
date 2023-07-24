import { Box } from "@mui/material";
import assets from "assets/assets";
import FileBox from "components/Utills/FileBox";

export default function DrawingFiles() {
  return (
    <Box>
      <FileBox
        title="Location"
        files={[{ fileName: "Drawing files is in here",_id:"",comment:"",fileTag:"",fileUrl:"",hasComment:false,moduleId:"",moduleType:"",uploadStatus:"" }]}
        size={"40px"}
      />
      <Box sx={{ margin: "16px" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {/* List of images */}
          {/* <img
            src={assets.visual}
            alt="Image1"
            style={{ width: 250, height: 250 }}
          /> */}
        </Box>
      </Box>
    </Box>
  );
}
