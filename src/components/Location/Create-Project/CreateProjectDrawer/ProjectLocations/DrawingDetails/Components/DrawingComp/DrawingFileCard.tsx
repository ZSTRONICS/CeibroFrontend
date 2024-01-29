import { Box, Tooltip, Typography } from "@mui/material";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { momentLocalDateTime, trimFileName } from "components/Utills/Globals";
import { Drawing } from "constants/interfaces";
import { useHistory, useParams } from "react-router-dom";
interface Props {
  drawing: Drawing;
  taskCount: number;
}

interface IRouteParams {
  projectId: string;
  groupId: string;
}

function DrawingFileCard({ drawing, taskCount }: Props) {
  const history = useHistory();
  const { projectId, groupId } = useParams<IRouteParams>();
  const { _id, fileName, updatedAt, floor } = drawing;
  const localTimeData = momentLocalDateTime(updatedAt);

  const handleClick = () => {
    history.push(
      `/location/project/${projectId}/group/${groupId}/drawing/${_id}`
    );
  };

  return (
    <>
      <Box sx={{ padding: "", width: "100%" }} key={_id}>
        <CustomStack
          onClick={handleClick}
          sx={{
            gap: 1,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Box sx={{ width: "80%", py: 0.5 }}>
            <Box sx={{ display: "flex" }}>
              <Tooltip title={fileName}>
                <Heading2
                  sx={{
                    fontWeight: 600,
                    width: "max-content",
                    minWidth: "80px",
                    paddingRight: "6px",
                  }}
                  className="textOverflowRow"
                >
                  {trimFileName(fileName)}
                </Heading2>
              </Tooltip>
              <LabelTag>{`(${taskCount} tasks)`}</LabelTag>
            </Box>
            <LabelTag>Last update: {localTimeData}</LabelTag>
          </Box>
          <Box
            sx={{
              width: "20%",
              borderLeft: "1px solid #818181",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <LabelTag>
              <Typography sx={{ display: "inline-block" }}>
                {floor.floorName}
              </Typography>
              <Typography sx={{ display: "inline-block", marginLeft: "2px" }}>
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
