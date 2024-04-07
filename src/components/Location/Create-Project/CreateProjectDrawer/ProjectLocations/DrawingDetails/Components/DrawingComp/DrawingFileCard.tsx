import { Box, Tooltip, Typography } from "@mui/material";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { momentLocalDateTime, trimFileName } from "components/Utills/Globals";
import { PreviewIcon } from "components/material-ui/icons/attachment/Attachment";
import { Drawing } from "constants/interfaces";
import { useHistory, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { isValidURL } from "utills/common";
interface Props {
  drawing: Drawing;
  taskCount: number;
  handleFilePreview: (drawing: Drawing) => void;
}

interface IRouteParams {
  projectId: string;
  groupId: string;
}

function DrawingFileCard({ drawing, taskCount, handleFilePreview }: Props) {
  const history = useHistory();
  const { projectId, groupId } = useParams<IRouteParams>();
  const { _id, fileName, updatedAt, floor } = drawing;
  const localTimeData = momentLocalDateTime(updatedAt);
  const isValidUrl = isValidURL(drawing.dziFileURL);
  // const dispatch = useDispatch();
  const handleClick = () => {
    if (isValidUrl) {
      history.push(
        `/location/${projectId}/group/${groupId}/drawing/${_id}/task`
      );
    } else {
      // dispatch(
      //   docsAction.getDrawingFileDZIUrls({
      //     other: drawing._id,
      //   })
      // );
      toast.info("Unable to load file", {
        position: "bottom-right",
        autoClose: 4000,
        draggable: true,
        transition: Bounce,
        theme: "light",
      });
    }
  };

  const Task_Details = true;

  return (
    <>
      <Box sx={{ padding: "", width: "100%" }} key={_id}>
        <CustomStack
          sx={{
            gap: 1,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "80%",
              py: 0.5,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={handleClick}
          >
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
                  {trimFileName(Task_Details, fileName)}
                </Heading2>
              </Tooltip>
              <LabelTag>{`(${taskCount} tasks)`}</LabelTag>
            </Box>
            <LabelTag>Last update: {localTimeData}</LabelTag>
          </Box>
          <Box
            sx={{
              width: "20%",

              display: "flex",
              justifyContent: "end",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ borderRight: "1px solid #818181" }}>
              <Typography sx={{ display: "inline-block", fontSize: "12px" }}>
                {floor.floorName}
              </Typography>
              <Typography
                sx={{
                  display: "inline-block",
                  marginRight: "4px",
                  fontSize: "12px",
                }}
              >
                Floor
              </Typography>
            </Box>

            <Box
              onClick={() => handleFilePreview(drawing)}
              sx={{
                marginLeft: "4px",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <PreviewIcon />
            </Box>
          </Box>
        </CustomStack>
      </Box>
    </>
  );
}

export default DrawingFileCard;
