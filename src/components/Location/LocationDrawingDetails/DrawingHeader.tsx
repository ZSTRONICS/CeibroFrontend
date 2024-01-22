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

interface DrawingProps {
  handleChangeCallback: (event: any, type: "group" | "drawing") => void;
  handleback: () => void;
  selectedProject: any;
  selectedGroup: any;
  selectedDrawing: any;
  selectedProjectGroups: any;
}

export default function DrawingHeader(props: DrawingProps) {
  const {
    handleChangeCallback,
    handleback,
    selectedProject,
    selectedGroup,
    selectedDrawing,
    selectedProjectGroups,
  } = props;

  const renderSelectOptions = (options: string[], getValueKey: string) => {
    return (
      options &&
      options.map((option) => (
        <MenuItem key={option._id} value={option._id}>
          {option[getValueKey]}
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
    <Grid container spacing={2}>
      <Grid item xs={12} md>
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
            {renderBox(
              <Typography variant="body1">
                {selectedProject &&
                  selectedProject.length > 0 &&
                  selectedProject[0].title}
              </Typography>,
              "50%"
            )}
            {renderDivider()}
            {renderBox(
              <Select
                variant="standard"
                disableUnderline
                sx={{ width: "100%", height: "52px", marginRight: "16px" }}
                value={selectedGroup._id || ""}
                onChange={(e) => handleChangeCallback(e, "group")}
              >
                {renderSelectOptions(selectedProjectGroups, "groupName")}
              </Select>,
              "50%"
            )}
          </>
        )}
      </Grid>

      <Grid item xs={12} md={6.5}>
        {renderBox(
          <>
            <Select
              value={selectedDrawing._id || ""}
              variant="standard"
              disableUnderline
              sx={{ width: "100%", height: "52px", paddingLeft: "16px" }}
              onChange={(e) => handleChangeCallback(e, "drawing")}
            >
              {renderSelectOptions(selectedGroup.drawings, "fileName")}
            </Select>
            {renderDivider()}
            <Typography variant="body1" sx={{ paddingRight: "16px" }}>
              Floor
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
}
