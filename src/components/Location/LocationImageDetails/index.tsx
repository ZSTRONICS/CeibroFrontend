import { Box, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import ImageCarousel from "./ImageCarousel";
import ImageUserDropdown from "./ImageUserDropdown";
import SortByDropdown from "./SortByDropdown";
import "./location-image.css";

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

  useEffect(() => {
    if (isRenderEffect.current) {
      isRenderEffect.current = false;
      allProjects.length === 0 && dispatch(PROJECT_APIS.getAllProjects());
    }
  }, []);

  const projectData = useMemo(() => {
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
                <Box>
                  <Tabs
                    aria-label="basic tabs"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {["Task", "Image"].map((label) => (
                      <Tab
                        label={label}
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
                <Box style={{ width: "auto" }}>
                  <SearchField handleSearch={() => {}} searchText={""} />
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
                    // padding: "0px 16px",
                    textTransform: "capitalize",
                    width: "109px",
                  }}
                >
                  Start Export
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "80px",
                  padding: "16px",
                  borderBottom: "1px solid #818181",
                  marginBottom: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                    width: "calc(100% - 47px)",
                  }}
                >
                  <ImageUserDropdown
                    maxWidth={"180px"}
                    label={"User"}
                    type="user"
                  />
                  <ImageUserDropdown
                    maxWidth={"180px"}
                    label={"Tags"}
                    type="tag"
                  />
                  {/* <ImageUserDropdown maxWidth={"238px"} label={"date"} /> */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DateRangePicker
                      // slots={{ field: SingleInputDateRangeField }}
                      name="allowedRange"
                    /> */}

                    {/* <DateTimePicker
                      label="Form-To"
                      value={""}
                      onChange={() => {}}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          sx={{
                            maxWidth: "180px",
                            width: "100%",
                          }}
                        />
                      )}
                    /> */}
                  </LocalizationProvider>
                  <SortByDropdown />
                </Box>
                <Button
                  sx={{
                    fontSize: "12px",
                    color: "#0076C8",
                    fontWeight: "400",
                    lineHeight: "175%",
                    letterSpacing: "0.15px",
                    padding: "0",
                    textTransform: "unset",
                  }}
                >
                  Clear all
                </Button>
              </Box>

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
                      {tags.map((tag) => (
                        <Box
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
                  <Typography>
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
    </>
  );
};

export default LocationImageDetails;
