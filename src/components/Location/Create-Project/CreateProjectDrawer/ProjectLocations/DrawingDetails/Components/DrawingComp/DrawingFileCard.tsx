import { Box, Tooltip } from "@mui/material";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { momentLocalDateTime, trimFileName } from "components/Utills/Globals";
import { Drawing } from "constants/interfaces";
import { useHistory, useParams } from "react-router-dom";
interface Props {
  drawing: Drawing;
}

interface IRouteParams {
  projectId: string;
  groupId: string;
}

function DrawingFileCard({ drawing }: Props) {
  const history = useHistory();
  const { projectId, groupId } = useParams<IRouteParams>();
  const { _id, fileName, updatedAt } = drawing;
  const localTimeData = momentLocalDateTime(updatedAt);

  const handleClick = () => {
    history.push(
      `/location/project/${projectId}/group/${groupId}/drawing/${_id}`
    );
  };

  return (
    <>
      <Box sx={{ padding: "10px 16px" }} key={_id}>
        <CustomStack
          onClick={handleClick}
          sx={{
            gap: 1,
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Box>
            <Box sx={{ display: "flex" }}>
              <Tooltip title={fileName}>
                <Heading2
                  sx={{
                    fontWeight: 600,
                    width: "120px",
                  }}
                  className="textOverflowRow"
                >
                  {trimFileName(fileName)}
                </Heading2>
              </Tooltip>

              <LabelTag>{`(4 tasks)`}</LabelTag>
            </Box>

            <LabelTag>Last activity time: {localTimeData}</LabelTag>
          </Box>
          <Box sx={{ gap: 0.5, borderLeft: "1px solid #818181", pl: 1.25 }}>
            <LabelTag>1 Floor</LabelTag>
          </Box>
        </CustomStack>
      </Box>
    </>
  );
}

export default DrawingFileCard;
