import { Box } from "@mui/material";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";

export default function DrawingFiles() {
  return (
    <Box sx={{ mb: 1 }}>
      <ReadMoreWrapper count={0} title="Location" type="Location" data={[]} />
    </Box>
  );
}
