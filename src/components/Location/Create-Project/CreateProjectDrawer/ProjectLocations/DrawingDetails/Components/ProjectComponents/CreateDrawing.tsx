import { Box, Button, TextField } from "@mui/material";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import FloorDropDown from "./FloorDropDown";

interface Props {
  drawingFile: any;
  isFloorSelected: boolean;
  handleCreateDrawing: () => void;
  projectFloors: Floor[];
  selectedGroupName: string;
  findSelectedFloor: (selectedFloor: any) => void;
}

function CreateDrawing({
  drawingFile,
  isFloorSelected,
  handleCreateDrawing,
  projectFloors,
  selectedGroupName,
  findSelectedFloor,
}: Props) {
  return (
    <>
      <Box
        sx={{
          padding: "0 10px 14px",
          width: "100%",
          height: "450px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          Direction: "column",
        }}
      >
        <Box>
          <FloorDropDown
            projectFloors={projectFloors}
            findSelectedFloor={findSelectedFloor}
          />
          <Box>
            <TextField
              sx={{
                width: "100%",
                label: {
                  left: "-12px",
                },
              }}
              inputProps={{
                style: { background: "white", paddingLeft: "4px" },
              }}
              variant="filled"
              required={true}
              name="groupName"
              label="Group name"
              placeholder={"group name"}
              value={selectedGroupName || ""}
            />
          </Box>
          <LabelTag>
            Select if you want to add this drawing under some group
          </LabelTag>

          <CustomStack gap={1} pt={2.5}>
            <LabelTag
              sx={{ borderRight: "1px solid #818181", paddingRight: 1.25 }}
            >
              Drawing name
            </LabelTag>
            {drawingFile && (
              <Heading2 sx={{ fontWeight: "500" }}>
                {drawingFile[0]?.name || ""}
              </Heading2>
            )}
          </CustomStack>
        </Box>
        <Button
          variant="contained"
          sx={{
            width: "20%",
            position: "relative",
            left: "60%",
            transform: "translateX(100%)",
          }}
          onClick={handleCreateDrawing}
          disabled={!selectedGroupName || !isFloorSelected}
        >
          Create
        </Button>
      </Box>
    </>
  );
}

export default CreateDrawing;
