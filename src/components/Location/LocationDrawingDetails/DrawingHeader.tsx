
import { ArrowBackSharp } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { Heading2 } from "components/CustomTags";
import DrawingGroupCard from "./DrawingGroupCard";

interface DrawingProps {
  handleChangeCallback: (event: any, type: "group" | "drawing") => void;
  handleback: () => void;
  selectedProject: any;
  selectedGroup: any;
  selectedDrawing: any;
  selectedProjectGroups: any;
  headersize: boolean;
}

export default function DrawingHeader(props: DrawingProps) {
  const {
    handleChangeCallback,
    handleback,
    selectedProject,
    selectedGroup,
    selectedDrawing,
    selectedProjectGroups,
    headersize,
  } = props;

  const renderDrawingSelectOptions = (options: any[], getValueKey: string) => {
    return (
      options &&
      options.map((option) => (
        <MenuItem key={option?._id} value={option?._id}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>{option[getValueKey]}</Box>
            <Box sx={{ display: "flex" }}>
              {renderDivider()}
              {"Floor "}
              {option.floor?.floorName}
            </Box>
          </Box>
        </MenuItem>
      ))
    );
  };

  const renderGroupOptions = (options: Group[], getValueKey: string) => {
    return (
      options &&
      options?.map((option) => (
        <MenuItem key={option._id} value={option._id}>
          <Box sx={{ width: "100%" }}>
            <DrawingGroupCard
              group={option}
              projectName={selectedProject.title}
            />
          </Box>
        </MenuItem>
      ))
    );
  };

  const renderBox = (content: React.ReactNode, flexWidth?: string) => (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: "white",
        width: flexWidth || "100%",
      }}
    >
      {content}
    </Box>
  );

  const renderDivider = () => (
    <Divider
      orientation="vertical"
      flexItem
      sx={{
        marginTop: "4px",
        marginBottom: "4px",
        marginLeft: "16px",
        marginRight: "16px",
        color: "#818181",
      }}
    />
  );
  return (
    <Grid container gap={1.8}>
      <Grid
        item
        // xs={1}
        // md={6.2}
        // lg={6.2}
        // xl={6.1}
        md={headersize ? 6.2 : 4.7}
        lg={headersize ? 6.2 : 4.3}
        xl={headersize ? 6.1 : 4}
        sx={{ transition: "all linear 0.30s", width: "50%", backgroundColor: 'white' }}
      >
        {renderBox(
          <>
            <IconButton
              sx={{
                color: "#0076C8",
                paddingLeft: "32px",
                paddingRight: "16px",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={handleback}
            >
              <ArrowBackSharp />
            </IconButton>
            {renderDivider()}
            <Typography sx={{ width: "39%", }} variant="body1">
              {selectedProject &&
                selectedProject.length > 0 &&
                selectedProject[0].title}
            </Typography>
            {renderDivider()}
            {renderBox(
              <Select
                variant="standard"
                disableUnderline
                sx={{ width: "100%", height: "52px", marginRight: "16px", }}
                value={selectedGroup._id || ""}
                renderValue={() => selectedGroup.groupName}
                onChange={(e) => handleChangeCallback(e, "group")}
              >
                <MenuItem value="" sx={{}}>
                  <Box
                    sx={{
                      width: "100%",
                      pr: "5px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Heading2
                      sx={{
                        width: "30%",
                        marginLeft: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Groups
                    </Heading2>
                  </Box>
                </MenuItem>
                {renderGroupOptions(selectedProjectGroups, "groupName")}
              </Select>,
              "50%"
            )}
          </>
        )}
      </Grid>
      <Grid
        item
        md={headersize ? 5.6 : 7.1}
        lg={headersize ? 5.6 : 7.5}
        xl={headersize ? 5.7 : 7.8}
        sx={{
          transition: "all linear 0.30s",
          backgroundColor: 'white',
        }}

      >
        {renderBox(
          <>
            <Select
              value={selectedDrawing?._id || ""}
              variant="standard"
              disableUnderline
              sx={{
                width: "100%",
                height: "52px",
                paddingLeft: "16px",
              }}
              onChange={(e) => handleChangeCallback(e, "drawing")}
              renderValue={() => selectedDrawing?.fileName ?? "Not Found"}
            >
              {renderDrawingSelectOptions(selectedGroup.drawings, "fileName")}
            </Select>
            {renderDivider()}
            <Typography
              variant="body1"
              sx={{ paddingRight: "16px", whiteSpace: "nowrap" }}
            >
              {`Floor ${selectedDrawing?.floor?.floorName ?? ""}`}
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
}
