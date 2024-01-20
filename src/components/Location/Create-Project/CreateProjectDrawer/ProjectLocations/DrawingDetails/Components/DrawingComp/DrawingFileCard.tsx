import { Box, Tooltip, Typography } from "@mui/material";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { momentLocalDateTime, trimFileName } from "components/Utills/Globals";
import { Drawing } from "constants/interfaces";
interface Props {
  drawing: Drawing;
}
function DrawingFileCard({ drawing }: Props) {
  const { _id, fileName, updatedAt } = drawing;
  const localTimeData = momentLocalDateTime(updatedAt);
  return (
    <>
      <Box sx={{ padding: "", width: "100%", }} key={_id}>
        <CustomStack
          sx={{
            gap: 1,
            justifyContent: "space-between",
            alignItems: "center",
            width: '100%',
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Box sx={{ width: '80%' }} >
            <Box sx={{ display: "flex" }}>
              <Tooltip title={fileName}>
                <Heading2
                  sx={{
                    fontWeight: 600,
                    width: 'max-content',
                    maxWidth: "140px",
                    paddingRight: '6px',
                  }}
                  className="textOverflowRow"
                >
                  {trimFileName(fileName)}
                </Heading2>
              </Tooltip>
              <LabelTag>{`(4 tasks)`}</LabelTag>
            </Box>
            <LabelTag>Last update: {localTimeData}</LabelTag>
          </Box>
          <Box sx={{ width: '20%', borderLeft: "1px solid #818181", display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <LabelTag>
              <Typography sx={{ display: 'inline-block' }} >
                1
              </Typography>
              <Typography sx={{ display: 'inline-block', marginLeft: '2px' }} >
                Floor
              </Typography>
            </LabelTag>
          </Box>
        </CustomStack>
      </Box>
    </>
  );
}

export default DrawingFileCard;
