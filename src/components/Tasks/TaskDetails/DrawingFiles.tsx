import { Box } from "@mui/material";
import FileBox from "components/Utills/FileBox";

export default function DrawingFiles() {
  return (
    <Box>
      <FileBox
        title="Location"
        files={[
          {
            fileName: "N/A",
            _id: "",
            comment: "",
            fileTag: "",
            fileUrl: "",
            hasComment: false,
            moduleId: "",
            moduleType: "",
            uploadStatus: "",
          },
        ]}
        size={""}
      />
    </Box>
  );
}
