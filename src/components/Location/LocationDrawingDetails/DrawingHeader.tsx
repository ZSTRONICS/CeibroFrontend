import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import assets from "assets";
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
    // console.log(options, "options");

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
    <Grid container gap={1.9}>
      <Grid
        item
        xs={12}
        sx={{ transition: "all linear 0.30s", width: "50%" }}
        md
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
              <ArrowBackSharpIcon />
            </IconButton>
            {renderDivider()}
            {/* //// */}
            {/* {renderBox( */}
            <Typography sx={{ width: "37%" }} variant="body1">
              {selectedProject &&
                selectedProject.length > 0 &&
                selectedProject[0].title}
            </Typography>
            {/* "50%"
            )} */}
            {renderDivider()}
            {renderBox(
              <Select
                variant="standard"
                disableUnderline
                sx={{ width: "100%", height: "52px", marginRight: "16px" }}
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
                    <IconButton onClick={() => { }}>
                      <assets.AddIcon sx={{ color: "#0076C8" }} />
                    </IconButton>
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
        md={headersize ? 5.7 : 7.2}
        lg={headersize ? 5.8 : 7.8}
        xl={headersize ? 5.7 : 8}
        sx={{
          transition: "all linear 0.30s",
          // width: headersize ? "50%" : "68%",
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
