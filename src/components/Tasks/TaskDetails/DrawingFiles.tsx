import { Box } from "@mui/material";
import assets from "assets/assets";
import FileBox from "components/Utills/FileBox";

export default function DrawingFiles() {
  return (
    <Box>
      <FileBox
        title="Location"
        files={[{ fileName: "Drawing name is in here", fileSize: "" }]}
        size={"40px"}
      />
      <Box sx={{ margin: "16px" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {/* List of images */}
          <img
            src={assets.visual}
            alt="Image1"
            style={{ width: 250, height: 250 }}
          />
          <img
            src={assets.visual}
            alt="Image2"
            style={{ width: 250, height: 250 }}
          />
          {/* Add more image elements as needed */}
        </Box>
      </Box>
    </Box>
  );
}
