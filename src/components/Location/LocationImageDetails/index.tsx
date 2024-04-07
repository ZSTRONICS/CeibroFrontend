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
import CustomModal from "components/Modal";
import DocumentReader from "components/pdfviewer";
import { DrawingImageInterface, PinImage } from "constants/interfaces";
import { formatDateWithTime } from "helpers/project.helper";
import { useOpenCloseModal } from "hooks";
import useWindowSize from "hooks/useWindowSize";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useHistory, useParams } from "react-router-dom";
import { PROJECT_APIS } from "redux/action";
import { RootState } from "redux/reducers";
import { HEADER_HEIGHT } from "utills/common";
import SearchField from "../Create-Project/CreateProjectDrawer/ProjectLocations/DrawingDetails/Components/SearchField";
import DrawingHeader from "../LocationDrawingDetails/DrawingHeader";
import { filterData, findData } from "../utils";
import AllImagesSlider from "./AllImagesSlider";
import { SelectedDateType } from "./DateRangePicker";
import ExportList from "./ExportList";
import FilterPopup from "./FilterPopup";
import ImageCarousel from "./ImageCarousel";
import LocationImageDetailsSkeleton from "./LocationImageDetailsSkeleton";
import UploadImgOnDrawing from "./UploadImgOnDrawing";
import "./location-image.css";
interface RouteParams {
  projectId: string;
  groupId: string;
  drawingId: string;
}

const LocationImageDetails = () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 7);
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const [isStartExport, setIsStartExport] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>([]);
  const [selectedRange, setSelectedRange] = useState<SelectedDateType>({
    startDate: startDate,
    endDate: today,
    key: "selection",
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterUsers, setFilterUsers] = useState<UserInfo[]>();
  const [filterTags, setFilterTags] = useState<string[]>();
  // const [filteredDrawingImages, setFilteredDrawingImages] = useState<
  //   DrawingImageInterface[]
  // >([]);
  const [pinImages, setPinImages] = useState<PinImage[]>([]);
  const [selectedPinImage, setSelectedPinImage] = useState<PinImage>();
  const [showMore, setShowMore] = useState(false);
  const { projectId, groupId, drawingId } = useParams<RouteParams>();
  const { allProjects, allGroups, allDrawingImages, loadingAllDrawingImages } =
    useSelector((state: RootState) => state.project);
  const isRenderEffect = useRef<boolean>(true);
  const [size, ratio] = useWindowSize();
  const [windowWidth, windowHeight] = size;
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pdfPageDimension, setPdfPageDimension] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const [drawingNotFound, setDrawingNotFound] = useState<boolean | null>(null);

  const windowActualHeight = windowHeight - (HEADER_HEIGHT + 16);

  useEffect(() => {
    const userMap = new Map();
    const tagMap = new Map();

    const images: PinImage[] = allDrawingImages.flatMap(
      (drawingImages: DrawingImageInterface) => drawingImages.pinImages
    );
    if (images.length > 0) {
      const filteredImages = images.filter(
        (data: PinImage) =>
          new Date(data.createdAt) >= selectedRange.startDate &&
          new Date(data.createdAt) <= selectedRange.endDate
      );
      setPinImages(filteredImages);
      setSelectedPinImage(filteredImages[0]);
      filteredImages.forEach((item: PinImage) => {
        userMap.set(item.uploadedBy._id, item.uploadedBy);
        item.userFileTags.forEach((tag) => tagMap.set(tag, tag));
      });
    }
    const uniqueUsers: UserInfo[] = Array.from(userMap.values());
    const uniqueTags = Array.from(tagMap.values());
    setFilterUsers(uniqueUsers);
    setFilterTags(uniqueTags);
  }, [allDrawingImages]);

  useEffect(() => {
    if (allDrawingImages.length === 0) {
      setPinImages([]);
      return;
    }

    const images: PinImage[] = allDrawingImages.flatMap(
      (drawingImages: DrawingImageInterface) => drawingImages.pinImages
    );

    let filteredImages = images;

    if (selectedUsers.length > 0) {
      filteredImages = filteredImages.filter((data: PinImage) =>
        selectedUsers.some((user: UserInfo) => user._id === data.uploadedBy._id)
      );
    }

    if (selectedTags.length > 0) {
      filteredImages = filteredImages.filter((data: PinImage) =>
        selectedTags.some((tag: string) =>
          data.userFileTags.some((item: string) => tag === item)
        )
      );
    }
    if (selectedRange?.startDate && selectedRange.endDate) {
      filteredImages = filteredImages.filter(
        (data: PinImage) =>
          new Date(data.createdAt) >= selectedRange.startDate &&
          new Date(data.createdAt) <= selectedRange.endDate
      );
    }
    setPinImages(filteredImages);
  }, [
    selectedUsers.length,
    selectedTags.length,
    selectedRange.startDate,
    selectedRange.endDate,
  ]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "934px",
    bgcolor: "background.paper",
    boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.45)",
    borderRadius: "8px",
    overflow: "hidden",
  };

  useEffect(() => {
    if (isRenderEffect.current) {
      isRenderEffect.current = false;
      allProjects.length === 0 && dispatch(PROJECT_APIS.getAllProjects());
      if (drawingId && allDrawingImages.length === 0) {
        dispatch(
          PROJECT_APIS.getAllDrawingImagesById({
            other: {
              drawingId: drawingId,
            },
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    if (!projectId || projectId === "") {
      history.replace(`/location/${allProjects[0]._id}`);
    } else if (!groupId || groupId === "") {
      let selectedGroup: any = findData(allGroups, "_id", groupId);
      history.replace(`/location/${projectId}/${selectedGroup._id}`);
    } else if (!drawingId || drawingId === "") {
      let selectedGroup: any = findData(allGroups, "_id", groupId);
      let selectedDrawing: any = findData(
        selectedGroup.drawings,
        "_id",
        drawingId
      );
      history.replace(
        `/location/${projectId}/group/${groupId}/drawing${
          selectedDrawing?.length > 0 ? "/" + selectedDrawing[0]._id : ""
        }/image`
      );
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
  }, [groupId, drawingId, allProjects, [...allGroups]]);

  const handleGroupAndFileChange = (event: any, type: "group" | "drawing") => {
    switch (type) {
      case "drawing":
        history.push(
          `/location/${projectId}/group/${groupId}/drawing/${event.target.value}/image`
        );
        break;
      case "group":
        let selectedGroup: any = findData(
          projectData.selectedProjectGroups,
          "_id",
          event.target.value
        );
        // if (selectedGroup && selectedGroup.length > 0) {
        if (selectedGroup.drawings[0]?._id) {
          setDrawingNotFound(false);
          history.push(
            `/location/${projectId}/group/${event.target.value}/drawing/${
              selectedGroup.drawings[0]?._id ?? ""
            }/image`
          );
        } else {
          history.push(
            `/location/${projectId}/group/${event.target.value}/drawing/image`
          );
        }
        break;

      default:
        break;
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isFiltericonShow = useMediaQuery(theme.breakpoints.down(1366));
  const isLarge = useMediaQuery(theme.breakpoints.up(1400));
  const isMeduim = useMediaQuery(theme.breakpoints.down(1400));
  const isSmall = useMediaQuery(theme.breakpoints.down(1100));
  const commentshowonlarge = useMediaQuery(
    theme.breakpoints.between(1100, 1620)
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopUpClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopUpClose = () => {
    setAnchorEl(null);
  };

  const handleCarouselChange = (index: number, item: ReactNode) => {
    setSelectedPinImage(pinImages[index]);
  };

  const handleClearAllFilters = () => {
    const images: PinImage[] = allDrawingImages.flatMap(
      (drawingImages: DrawingImageInterface) => drawingImages.pinImages
    );
    setPinImages(images);
    setSelectedUsers([]);
    setSelectedTags([]);
    setSelectedRange({
      startDate: startDate,
      endDate: today,
      key: "selection",
    });
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
        <Grid
          container
          sx={{
            padding: "16px 0",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            sx={{
              width: isLarge ? "53.7%" : isMeduim ? "53.8%" : "54.4%",
            }}
          >
            <Box
              style={{
                backgroundColor: "#fff",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "4px",
                height: `${windowActualHeight - 68}px`,
                paddingBottom: "10px",
                overflow: "hidden",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  padding: "16px",
                  borderBottom: "solid 1px #818181",
                  maxHeight: "55px",
                }}
              >
                <Box>
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
                            `/location/${projectId}/group/${groupId}/drawing/${drawingId}/task`
                          )
                        }
                      />
                    ))}
                  </Tabs>
                </Box>
                <Box
                  style={{
                    width: "100%",
                    transform: "translateY(-10px) translateX(-5px)",
                  }}
                >
                  <SearchField
                    isSmall={isSmallScreen ? true : false}
                    handleSearch={() => {}}
                    searchText={""}
                  />
                </Box>
                <Button
                  disableRipple
                  variant="contained"
                  sx={{
                    fontWeight: "700",
                    borderRadius: "4px",
                    padding: "4px",
                    textTransform: "capitalize",
                    minWidth: "100px",
                    "&:hover": {
                      backgroundColor: "#0076C8",
                    },
                  }}
                  onClick={() => {
                    if (isStartExport) {
                      setOpen(true);
                    }
                    setIsStartExport(!isStartExport);
                  }}
                >
                  {!isStartExport ? "Start Export" : "End Export"}
                </Button>
                <Button
                  disableRipple
                  variant="contained"
                  sx={{
                    textTransform: "unset",
                    padding: "4px 3px",
                    fontWeight: "700",
                  }}
                  onClick={openModal}
                >
                  + Photo
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
                      sx={{
                        color: "rgb(0,118,200)",
                        marginRight: "25px",
                      }}
                      onClick={handlePopUpClick}
                    />
                    <Menu
                      sx={{
                        marginTop: "10px",
                      }}
                      PaperProps={{
                        style: {
                          width: "52.5%",
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
                      <MenuItem
                        sx={{
                          padding: "0px",
                          width: "100%",
                          // overflow: "hidden",
                        }}
                        disableRipple
                      >
                        <FilterPopup
                          ShowPopup={true}
                          handlePopUpClose={handlePopUpClose}
                          isSmall={isMeduim}
                          selectedUsers={selectedUsers}
                          selectedTags={selectedTags}
                          setSelectedTags={setSelectedTags}
                          setSelectedUsers={setSelectedUsers}
                          setSelectedRange={setSelectedRange}
                          selectedRange={selectedRange}
                          handleClearAllFilters={handleClearAllFilters}
                          tags={filterTags ?? []}
                          users={filterUsers ?? []}
                        />
                      </MenuItem>
                    </Menu>
                  </Box>
                  {/* <SortByDropdown /> */}
                </Box>
              ) : (
                <FilterPopup
                  ShowPopup={false}
                  selectedUsers={selectedUsers}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                  setSelectedUsers={setSelectedUsers}
                  setSelectedRange={setSelectedRange}
                  handleClearAllFilters={handleClearAllFilters}
                  selectedRange={selectedRange}
                  tags={filterTags ?? []}
                  users={filterUsers ?? []}
                  isSmall={isMeduim}
                />
              )}
              {!loadingAllDrawingImages ? (
                !allDrawingImages || allDrawingImages?.length <= 0 ? (
                  <Box
                    sx={{
                      height: `${windowActualHeight - 195}px`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                      No data found!
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: `${windowActualHeight - 190}px`,
                      overflowY: "auto",
                      position: "relative",
                      overflowX: "hidden",
                    }}
                  >
                    {pinImages && pinImages.length > 0 && (
                      <Box
                        sx={{
                          height: "70%",
                          overflow: "auto",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            padding: "10px 16px",
                          }}
                        >
                          <ImageCarousel
                            locationimgdetail={true}
                            images={pinImages}
                            handleChange={handleCarouselChange}
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
                              <b>From:</b>
                              {`${selectedPinImage?.uploadedBy.firstName} ${selectedPinImage?.uploadedBy.surName}`}
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
                              {selectedPinImage &&
                                formatDateWithTime(selectedPinImage.updatedAt)}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "24px",
                              width: "max-content",
                              maxWidth: "40%",
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
                                maxWidth: "100%",
                                overflowX: "auto",
                              }}
                            >
                              {selectedPinImage?.userFileTags?.map(
                                (tag, index) => (
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
                                      border: "slid 2px yellow",
                                      width: "max-content",
                                      whiteSpace: "nowrap",
                                      marginBottom: "2px",
                                    }}
                                  >
                                    {tag}
                                  </Box>
                                )
                              )}
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            padding: "0 16px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "13px",
                              lineHeight: "20px",
                              color: "#131516",
                            }}
                          >
                            {selectedPinImage?.comment !== undefined &&
                            selectedPinImage?.comment.length > 0
                              ? showMore
                                ? selectedPinImage?.comment
                                : selectedPinImage?.comment !== undefined &&
                                  selectedPinImage?.comment.length > 270
                                ? `${selectedPinImage?.comment.substring(
                                    0,
                                    isSmall
                                      ? 60
                                      : commentshowonlarge
                                      ? 150
                                      : 270
                                  )}...`
                                : `${selectedPinImage?.comment.substring(
                                    0,
                                    isSmall
                                      ? 60
                                      : commentshowonlarge
                                      ? 150
                                      : 270
                                  )}`
                              : ""}
                          </Typography>
                          {selectedPinImage?.comment &&
                            selectedPinImage.comment.length > 270 && (
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
                            )}
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
                      </Box>
                    )}
                    <Box sx={{ height: "30%" }}>
                      <AllImagesSlider
                        isStartExport={isStartExport}
                        allImages={pinImages ?? []}
                      />
                    </Box>
                  </Box>
                )
              ) : (
                <LocationImageDetailsSkeleton
                  windowActualHeight={windowActualHeight}
                />
              )}
            </Box>
          </Grid>
          <Grid item sx={{ width: isMeduim ? "45.2%" : "45.3%" }}>
            <Box
              sx={{
                ...(!projectData.selectedDrawing?.fileUrl
                  ? {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      height: `${windowActualHeight}px`,
                      // maxHeight: "calc(100vh - 327px)",
                    }
                  : {}),
              }}
            >
              {!drawingNotFound ? (
                projectData.selectedDrawing?.fileUrl ? (
                  <Box
                    sx={{
                      height: `${windowActualHeight - 68}px`,
                      backgroundColor: "white",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <DocumentReader
                      selectedDrawingUrl={projectData.selectedDrawing?.fileUrl}
                      setPageDimensions={setPdfPageDimension}
                    />
                  </Box>
                ) : (
                  <Heading2 sx={{ fontWeight: 600 }}>
                    Drawing file not found!
                  </Heading2>
                )
              ) : (
                <Box
                  sx={{
                    height: `${windowActualHeight}px`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Heading2 sx={{ fontWeight: 600 }}>
                    Drawing file not found!
                  </Heading2>
                </Box>
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
          <ExportList handleClose={handleClose} />
        </Box>
      </Modal>
      {isOpen === true && (
        <CustomModal
          maxWidth={"sm"}
          showFullWidth={true}
          showDivider={true}
          showCloseBtn={false}
          showTitleWithLogo={true}
          title="Add image on drawing"
          isOpen={isOpen}
          handleClose={closeModal}
          children={
            <UploadImgOnDrawing
              pdfPageDimension={pdfPageDimension}
              closeModal={closeModal}
              drawingId={drawingId}
            />
          }
        />
      )}
    </>
  );
};

export default LocationImageDetails;
