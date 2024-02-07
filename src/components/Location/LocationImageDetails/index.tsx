import { FilterAltOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Modal,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { Heading2 } from "components/CustomTags";
import DocumentReader from "components/pdfviewer";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useHistory, useParams } from "react-router-dom";
import { PROJECT_APIS } from "redux/action";
import { RootState } from "redux/reducers";
import SearchField from "../Create-Project/CreateProjectDrawer/ProjectLocations/DrawingDetails/Components/SearchField";
import DrawingHeader from "../LocationDrawingDetails/DrawingHeader";
import { filterData, findData } from "../utils";
import AllImagesSlider from "./AllImagesSlider";
import ExportList from "./ExportList";
import FilterPopup from "./FilterPopup";
import ImageCarousel from "./ImageCarousel";
import SortByDropdown from "./SortByDropdown";
import "./location-image.css";
//////////

// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

//////////////

interface RouteParams {
  projectId: string;
  groupId: string;
  drawingId: string;
}

const LocationImageDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const { projectId, groupId, drawingId } = useParams<RouteParams>();
  const { allProjects, allGroups } = useSelector(
    (state: RootState) => state.project
  );
  const isRenderEffect = useRef<boolean>(true);
  const tags = ["Pipes", "Paint", "Tag 3", "Tag 4", "Tag 5"];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "934px",
    bgcolor: "background.paper",
    boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.45)",
    // p: 4,
    borderRadius: "8px",
    overflow: "hidden",
  };

  useEffect(() => {
    if (isRenderEffect.current) {
      isRenderEffect.current = false;
      allProjects.length === 0 && dispatch(PROJECT_APIS.getAllProjects());
    }
  }, []);

  useEffect(() => {
    if (!projectId || projectId == "") {
      history.replace(`/location/${allProjects[0]._id}`);
    } else if (!groupId || groupId == "") {
      let selectedGroup: any = findData(allGroups, "_id", groupId);
      history.replace(`/location/${projectId}/${selectedGroup._id}`);
    } else if (!drawingId || drawingId == "") {
      let selectedGroup: any = findData(allGroups, "_id", groupId);
      let selectedDrawing: any = findData(
        selectedGroup.drawings,
        "_id",
        drawingId
      );
      if (selectedDrawing && selectedDrawing.length > 0) {
        console.log(selectedDrawing, "selectedDrawing");
        history.replace(
          `/location/project/${projectId}/group/${groupId}/drawing/${selectedDrawing._id}/image`
        );
      } else {
        history.replace(`/location/${projectId}/${groupId}`);
      }
    }
  }, [projectId, groupId, drawingId]);

  const projectData: any = useMemo(() => {
    let selectedProject = filterData(allProjects, "_id", projectId);
    let selectedProjectGroups = filterData(allGroups, "projectId", projectId);
    let selectedGroup: any = findData(allGroups, "_id", groupId);
    let selectedDrawing: any = findData(
      selectedGroup.drawings,
      "_id",
      drawingId
    );

    return {
      selectedProject,
      selectedProjectGroups,
      selectedGroup,
      selectedDrawing,
    };
  }, [groupId, drawingId, allProjects, allGroups]);

  console.log("projectData", projectData);

  const handleGroupAndFileChange = (event: any, type: "group" | "drawing") => {
    switch (type) {
      case "drawing":
        history.push(
          `/location/project/${projectId}/group/${groupId}/drawing/${event.target.value}/image`
        );
        break;
      case "group":
        let selectedGroup: any = findData(
          projectData.selectedProjectGroups,
          "_id",
          event.target.value
        );
        history.push(
          `/location/project/${projectId}/group/${event.target.value}/drawing/${
            selectedGroup.drawings[0]?._id ?? ""
          }/image`
        );
        break;

      default:
        break;
    }
  };

  const tempDesp = `Please use Figma for developing and don't mix it with
                  something. We want 100% same thing like we have in Fig Please
                  use Figma for developing and don't mix it with something. We
                  want 100% same thing like we have in Fig e have in Fige have
                  in Fige have in Please use Figma for developing and don't mix
                  it with something. We want 100% same thing like we have in Fig
                  Please use Figma for developing and don't mix it with
                  something. We want 100% same thing like we have in Fig e have
                  in Fige have in Fige have in Please use Figma for developing
                  and don't mix it with something. We want 100% same thing like
                  we have in Fig Please use Figma for developing and don't mix
                  it with something. We want 100% same thing like we have in Fig
                  e have in Fige have in Fige have in Please use Figma for
                  developing and don't mix it with something. We want 100% same
                  thing like we have in Fig Please use Figma for developing and
                  don't mix it with something. We want 100% same thing like we
                  have in Fig e have in Fige have in Fige have in Please use
                  Figma for developing and don't mix it with something. We want
                  100% same thing like we have in Fig Please use Figma for
                  developing and don't mix it with something. We want 100% same
                  thing like we have in Fig e have in Fige have in Fige have in
                  Please use Figma for developing and don't mix it with`;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isFiltericonShow = useMediaQuery(theme.breakpoints.down(1366));

  const handleChangeValues = () => {};

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopUpClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopUpClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "0 16px",
        }}
      >
        {projectData && (
          <DrawingHeader
            handleChangeCallback={handleGroupAndFileChange}
            handleback={() => history.push(`/location/${projectId}/${groupId}`)}
            selectedProject={projectData.selectedProject}
            selectedProjectGroups={projectData.selectedProjectGroups}
            selectedGroup={projectData.selectedGroup}
            selectedDrawing={projectData.selectedDrawing}
            headersize={true}
            imageLocation={true}
          />
        )}
        <Grid container spacing={2} sx={{ padding: "16px 0" }}>
          <Grid item xs={6.3}>
            <Box
              style={{
                backgroundColor: "#fff",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "4px",
              }}
            >
              <Box
                style={{
                  //   display: "flex",
                  //   alignItems: "center",
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 5.2fr 1fr",
                  gap: "20px",
                  alignItems: "center",
                  padding: "16px",
                  borderBottom: "1px solid #818181",
                }}
              >
                <Box sx={{}}>
                  <Tabs
                    aria-label="basic tabs"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      span: {
                        display: "none",
                      },
                    }}
                    value={1}
                  >
                    {["Task", "Image"].map((label, index) => (
                      <Tab
                        key={label + index}
                        label={label}
                        value={index}
                        style={{
                          color: `${label === "Image" ? "white" : "#818181"}`,
                          textAlign: "center",
                          fontFamily: "Inter",
                          fontSize: "10px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "16px",
                          borderRadius: "4px",
                          backgroundColor: `${label === "Image" && "#818181"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "56px",
                          height: "32px",
                          minHeight: "32px",
                          textTransform: "capitalize",
                          border: "1px solid #818181",
                          padding: "0",
                          minWidth: "auto",
                          maxWidth: "Auto",
                          marginRight: "10px",
                        }}
                        onClick={() =>
                          label === "Task" &&
                          history.push(
                            `/location/project/${projectId}/group/${groupId}/drawing/${drawingId}/task`
                          )
                        }
                      />
                    ))}
                  </Tabs>
                </Box>
                {/* <Box></Box> */}
                <Box style={{ width: "auto" }}>
                  <SearchField
                    isSmall={isSmallScreen ? true : false}
                    handleSearch={() => {}}
                    searchText={""}
                  />
                </Box>
                <Button
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "16px",
                    borderRadius: "4px",
                    backgroundColor: "#0076C8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "32px",

                    textTransform: "capitalize",
                    width: "109px",
                  }}
                  onClick={handleOpen}
                >
                  Start Export
                </Button>
              </Box>
              {isFiltericonShow ? (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    padding: "0 10px 5px 0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <FilterAltOutlined
                      sx={{ color: "rgb(0,118,200)" }}
                      onClick={handlePopUpClick}
                    />
                    <Menu
                      sx={{
                        marginTop: "10px",
                      }}
                      PaperProps={{
                        style: {
                          width: "50%",
                        },
                      }}
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handlePopUpClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem disableRipple>
                        <FilterPopup
                          handleChangeValues={handleChangeValues}
                          ShowPopup={true}
                        />
                      </MenuItem>
                    </Menu>
                  </Box>
                  <SortByDropdown />
                </Box>
              ) : (
                <FilterPopup
                  handleChangeValues={handleChangeValues}
                  ShowPopup={false}
                />
              )}

              <Box
                sx={{
                  maxHeight: "calc(100vh - 355px)",
                  overflowY: "scroll",
                }}
              >
                <Box
                  sx={{ display: "flex", width: "100%", padding: "10px 16px" }}
                >
                  <ImageCarousel
                    images={[
                      "https://react-responsive-carousel.js.org/assets/6.jpeg",
                      "https://react-responsive-carousel.js.org/assets/2.jpeg",
                      "https://react-responsive-carousel.js.org/assets/3.jpeg",
                    ]}
                  />
                </Box>
                <Box
                  sx={{
                    padding: "0 16px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        color: "#605C5C",
                        fontSize: "10px",
                        fontWeight: "400",
                        lineHeight: "16px",
                      }}
                    >
                      <b>From:</b>Jaanus Kütson
                    </Box>
                    <Box
                      component="span"
                      sx={{
                        color: "#131516",
                        fontSize: "10px",
                        fontWeight: "500",
                        lineHeight: "16px",
                      }}
                    >
                      Today 12:47
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      "@media(max-width:1200px)": {
                        gap: "10px",
                      },
                    }}
                  >
                    <Typography
                      component="h6"
                      sx={{
                        color: "#605C5C",
                        fontSize: "12px",
                        fontWeight: "500",
                        lineHeight: "16px",
                      }}
                    >
                      Tags:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                      }}
                    >
                      {tags.map((tag, index) => (
                        <Box
                          key={`tag-${index}`}
                          component="span"
                          sx={{
                            backgroundColor: "#818181",
                            borderRadius: "4px",
                            color: "#fff",
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "16px",
                            padding: "0 6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ padding: "0 16px" }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      lineHeight: "20px",
                      color: "#131516",
                    }}
                  >
                    {showMore ? tempDesp : `${tempDesp.substring(0, 250)}`}
                  </Typography>
                  <Box
                    sx={{
                      textAlign: "right",
                      padding: "10px 0",
                    }}
                  >
                    <button
                      className="btn"
                      onClick={() => setShowMore(!showMore)}
                      style={{
                        color: "#0076C8",
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "175%",
                        letterSpacing: "0.15px",
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "none",
                        cursor: "pointer",
                      }}
                    >
                      {!showMore ? "View more" : "View less"}
                    </button>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: "4px",
                      opacity: "0.9",
                      backgroundColor: "#F4F4F4",
                      filter: "blur(2px)",
                      height: "4px",
                      width: "100%",
                    }}
                  ></Box>
                </Box>
                <AllImagesSlider />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5.7}>
            <Box
              style={{
                backgroundColor: "#fff",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "4px",
              }}
            >
              {projectData.selectedDrawing ? (
                <DocumentReader
                  selectedDrawingUrl={projectData.selectedDrawing.fileUrl}
                />
              ) : (
                <Heading2 sx={{ fontWeight: 600 }}>
                  Drawing file not found!
                </Heading2>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ExportList />
        </Box>
      </Modal>
    </>
  );
};

export default LocationImageDetails;
