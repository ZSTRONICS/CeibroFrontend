import { Box } from "@mui/material";
import FileBox from "components/Utills/FileBox";

export default function DrawingFiles() {
  return (
    <Box sx={{ mb: 1 }}>
      <FileBox
        title="Location"
        bb={true}
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
