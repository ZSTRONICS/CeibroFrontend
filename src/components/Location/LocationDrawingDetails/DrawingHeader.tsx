import { ArrowBackSharp } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Heading2 } from "components/CustomTags";
import { useHistory } from "react-router-dom";
import DrawingGroupCard from "./DrawingGroupCard";

interface DrawingProps {
  handleChangeCallback: (event: any, type: "group" | "drawing") => void;
  handleback: () => void;
  selectedProject: any;
  selectedGroup: any;
  selectedDrawing: any;
  selectedProjectGroups: any;
  headersize: boolean;
  imageLocation: boolean;
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
    imageLocation,
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
        marginLeft: isMdScreen
          ? "16px"
          : isLgScreen
          ? "-5px"
          : isxlScreen
          ? "5px"
          : "16px",
        marginRight: "16px",
        color: "#818181",
      }}
    />
  );

  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isxlScreen = useMediaQuery(theme.breakpoints.down("xl"));

  const isMdScreenUP = useMediaQuery(theme.breakpoints.up("md"));
  const isLgScreenUP = useMediaQuery(theme.breakpoints.up("lg"));
  const isxlScreenUP = useMediaQuery(theme.breakpoints.up("xl"));

  const history = useHistory();

  return (
    <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
      <Grid
        item
        sx={{
          transition: "all linear 0.30s",
          width: headersize ? (imageLocation ? "52%" : "53.8%") : "41.8%",
        }}
      >
        <Box>
          {renderBox(
            <>
              <IconButton
                sx={{
                  color: "#0076C8",
                  paddingLeft: "25px",
                  paddingRight: "16px",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                // onClick={handleback}
                onClick={() => history.goBack()}
              >
                <ArrowBackSharp />
              </IconButton>
              {renderDivider()}
              <Typography
                sx={{
                  width: isxlScreenUP ? "27%" : isLgScreenUP ? "27%" : "29%",
                }}
                variant="body1"
              >
                {selectedProject &&
                  selectedProject.length > 0 &&
                  selectedProject[0].title}
              </Typography>
              {renderDivider()}
              {renderBox(
                <Select
                  variant="standard"
                  disableUnderline
                  sx={{ width: "100%", height: "52px" }}
                  value={selectedGroup._id || ""}
                  renderValue={() => selectedGroup.groupName}
                  onChange={(e) => handleChangeCallback(e, "group")}
                >
                  <MenuItem value="" sx={{}}>
                    <Box
                      sx={{
                        width: "100%",
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
                "55%"
              )}
            </>
          )}
        </Box>
      </Grid>
      <Grid
        sx={{
          transition: "all linear 0.30s",
          width: headersize ? (imageLocation ? "47%" : "45.3%") : "57.2%",
        }}
      >
        <Box>
          {renderBox(
            <>
              <Box sx={{ width: "85%" }}>
                <Select
                  value={selectedDrawing?._id || ""}
                  variant="standard"
                  disableUnderline
                  sx={{
                    height: "52px",
                    paddingLeft: "16px",
                    backgroundColor: "transparent",
                    width: "99%",
                  }}
                  onChange={(e) => handleChangeCallback(e, "drawing")}
                  renderValue={() => selectedDrawing?.fileName ?? "Not Found"}
                >
                  {renderDrawingSelectOptions(
                    selectedGroup.drawings,
                    "fileName"
                  )}
                </Select>
              </Box>
              {renderDivider()}
              <Typography
                variant="body1"
                sx={{ paddingRight: "16px", whiteSpace: "nowrap" }}
              >
                {`Floor ${selectedDrawing?.floor?.floorName ?? ""}`}
              </Typography>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
