import { Box } from "@mui/material";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { IFile } from "constants/interfaces";

export default function DrawingFiles() {
  const data: string | IFile[] | File[] | undefined = [];
  return (
    data.length && (
      <Box sx={{ mb: 1 }}>
        <ReadMoreWrapper
          count={0}
          title="Location"
          type="Location"
          data={data}
        />
      </Box>
    )
  );
}
