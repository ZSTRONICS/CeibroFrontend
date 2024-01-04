import { useRef, useState } from "react";
// import PropTypes from 'prop-types';
// components
import { Document, Page, pdfjs } from "react-pdf";
import DocumentControl from "./../DocumentControl";
//  import ImageMapEditor from './../../../imagemap/ImageMapEditor';
// material-ui
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { Close, Refresh, Room, ZoomIn, ZoomOut } from "@mui/icons-material";
import { Button, ButtonGroup, Icon, Tooltip } from "@mui/material";
import CustomModal from "components/Modal";
import { formatDropdownData } from "components/Utills/Globals";
import { AutocompleteField } from "components/material-ui/customMuiTextField/simpleTextField";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentViewerStyles = () => ({
  scrollContainer: {
    height: "100%",
    padding: "2%",
  },
  viewContainer: {},
  editorContainer: {
    position: "absolute",
    top: 0,
    height: "100%",
    left: 0,
  },
  viewEmptyContainer: {
    height: "100%",
  },
  progressContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  pageContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

const DocumentViewer = (props) => {
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [last, setLast] = useState(0);
  const [percentage, setPercentage] = useState(1);
  const [first, setFirst] = useState(true);
  const [factory, setFactory] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [drawingIcons, setDrawingIcons] = useState([]);
  const [markers, setMarkers] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  let scrollPanel,
    pageRef,
    canvasRef = useRef(null);

  const { classes } = props;
  // Function to draw markers on the canvas
  const drawMarkerLocal = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      markers.forEach((marker) => {
        ctx.beginPath();
        ctx.moveTo(marker.x, marker.y - 12);
        ctx.lineTo(marker.x - 8, marker.y);
        ctx.lineTo(marker.x, marker.y + 12);
        ctx.lineTo(marker.x + 8, marker.y);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(marker.x, marker.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
      });
    }
  };

  function onLoadingPage({ loaded, total }) {
    let { progress } = props.state;
    let buffer = 10;
    progress = Math.floor((loaded / total) * 100);
    if (progress < 100) {
      buffer = progress + Math.random() * 10;
    }
    setLoadingPage(true);
    setProgress(progress);
  }

  function onDocumentSourceSuccess() {
    setLoadingPage(true);
  }

  function onPageChanged(page) {
    setPage(page);
    setLast(last);
    setFirst(first);
  }

  function onScaleChanged(percentage) {
    setPercentage(percentage);
  }

  function onLoadedPage(pageFactory) {
    setLoadingPage(false);
    setProgress(0);
    setFactory(pageFactory);
  }

  function onDocumentLoaded(factory) {
    const { numPages } = factory;
    // console.log(factory, page, totalPage);
    setTotalPage(numPages);
    setLast(1);
    setPage(page);
    setFactory(factory);
  }

  function handleZoomIn() {
    if (percentage < 3) {
      setPercentage((prevState) => {
        const updatedPrevState = prevState + 0.1;
        setTimeout(() => {
          setDrawingIcons((icons) =>
            icons.map((icon) => ({
              x: icon.x * 1.1,
              y: icon.y * 1.1,
              // x: icon.x + icon.x * 0.01,
              // y: icon.y + icon.y * 0.01,
              initialX: icon.initialX,
              initialY: icon.initialY,
              tooltip: icon.tooltip,
            }))
          );
        }, 500);
        return updatedPrevState;
      });
    }
  }

  function handleZoomOut() {
    if (percentage > 0.9) {
      setPercentage((prevState) => {
        const updatedPrevState = prevState - 0.1;
        setTimeout(() => {
          // Update marker position after scaling
          setDrawingIcons((icons) =>
            icons.map((icon) => ({
              x: icon.x - icon.x * 0.1,
              y: icon.y - icon.y * 0.1,
              initialX: icon.initialX,
              initialY: icon.initialY,
              tooltip: icon.tooltip,
            }))
          );
        }, 500);
        return updatedPrevState;
      });
    }
  }
  const handleReset = () => {
    setPercentage(1);
    setTimeout(() => {
      // Update marker position after scaling
      setDrawingIcons((icons) =>
        icons.map((icon) => ({
          x: icon.initialX,
          y: icon.initialY,
          initialX: icon.initialX,
          initialY: icon.initialY,
          tooltip: icon.tooltip,
        }))
      );
    }, 500);
  };
  console.log("drawingIcons", drawingIcons, "percentage", percentage);

  // console.log("drawingIcons", drawingIcons);
  const handleMarkerClick = () => {
    setIsActive((prevState) => !prevState);
  };

  /**
   * Calculates the distance between two points in a 2D plane.
   * @param {number} x1 - The x-coordinate of the first point.
   * @param {number} y1 - The y-coordinate of the first point.
   * @param {number} x2 - The x-coordinate of the second point.
   * @param {number} y2 - The y-coordinate of the second point.
   * @return {number} The distance between the two points.
   */
  function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /**
   * Determines if the given coordinates are too close to any existing markers.
   * @param {number} x - The x-coordinate of the new marker.
   * @param {number} y - The y-coordinate of the new marker.
   * @param {Array} existingMarkers - An array of existing markers.
   * @return {boolean} Returns true if the coordinates are too close to any existing markers, false otherwise.
   */
  function isTooCloseToOtherMarkers(x, y, existingMarkers) {
    for (const marker of existingMarkers) {
      const distance = calculateDistance(x, y, marker.x, marker.y);
      if (distance < 25) {
        return true;
      }
    }
    return false;
  }

  function drawMarker(event) {
    if (!isActive || !canvasRef.current) return;
    const canvasRect = event.target.getBoundingClientRect();
    console.log("canvasRect>>", canvasRect);
    const clickX = event.clientX - canvasRect.left;
    const clickY = event.clientY - canvasRect.top;
    // Check for existing markers within a 25px radius
    if (isTooCloseToOtherMarkers(clickX, clickY, markers)) {
      console.log("Too Close");
      return;
    }

    const icon = {
      x: clickX,
      y: clickY,
      initialX: clickX,
      initialY: clickY,
      tooltip: "",
    };
    const icons = [...drawingIcons, icon];
    // setMarkers([...markers, { x: clickX, y: clickY }]);
    setDrawingIcons(icons);
    console.log("clickX clickY", clickX, clickY);
    // setIsOpen(true);
  }

  // useEffect(() => {
  //   drawMarkerLocal();
  // }, [markers]);
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleAssignTask = () => {
    handleCloseModal();
  };

  const handleDeleteMarker = (index) => {
    const icons = [...drawingIcons];
    icons.splice(index, 1);
    setDrawingIcons(icons);
  };

  const renderMainDocument = () => {
    const buttonStyle = {
      padding: 0,
      color: isActive ? "black" : "",
    };

    if (!props.pdf) {
      return <div />;
    }
    return (
      <div>
        <div
          style={{
            padding: "7px",
            display: "flex",
          }}
        >
          <ButtonGroup size="small">
            <Button onClick={handleZoomIn} sx={{ p: 0 }}>
              <Icon component={ZoomIn} />
            </Button>
            <Button onClick={handleZoomOut} sx={{ p: 0 }}>
              <Icon component={ZoomOut} />
            </Button>
            <Button onClick={handleReset} sx={{ p: 0 }}>
              <Icon component={Refresh} />
            </Button>
            {props.newTask !== null && (
              <Button onClick={handleMarkerClick} sx={buttonStyle}>
                <Icon component={Room} />
              </Button>
            )}
          </ButtonGroup>
        </div>
        <div
          style={{
            overflow: "auto",
            maxHeight: "650px",
            minHeight: "450px",
            height: "100%",
          }}
        >
          <Document
            file={props.file}
            loading={<div> Loading pdf file... </div>}
            noData={<div>No pdf file provided</div>}
            onSourceSuccess={onDocumentSourceSuccess}
            onSourceError={(error) => {
              console.log(error.message);
            }}
            onLoadSuccess={onDocumentLoaded}
          >
            <div style={{ position: "relative" }}>
              {drawingIcons.length > 0 &&
                drawingIcons.map((icon, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        top: `${icon.y}px`,
                        left: `${icon.x}px`,
                        transform: "translate(-50%, -50%)",
                        zIndex: 99,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-15px",
                          right: "1px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleDeleteMarker(index);
                        }} // Replace handleIconClose with the appropriate function to handle icon close
                      >
                        <Tooltip title="Close">
                          <Icon
                            component={Close}
                            style={{
                              height: "12px",
                              width: "12px",
                              color: "black",
                              backgroundColor: "white",
                            }}
                          />
                        </Tooltip>
                      </div>
                      <Tooltip title="Marker">
                        <Icon component={Room} style={{ color: "red" }} />
                      </Tooltip>
                    </div>
                  );
                })}
            </div>
            <Page
              inputRef={(r) => {
                pageRef = r;
              }}
              canvasRef={canvasRef}
              pageNumber={page}
              scale={percentage}
              onClick={drawMarker}
              onLoadProgress={onLoadingPage}
              onLoadSuccess={onLoadedPage}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </div>
      </div>
    );
  };

  let viewContainerStyle = [classes.viewContainer];
  // the user does not pick any file
  if (!props.pdf) {
    viewContainerStyle = [...viewContainerStyle, classes.viewEmptyContainer];
  }

  return (
    <div ref={scrollPanel} className={classes.scrollContainer}>
      <Paper className={viewContainerStyle.join(" ")} elevation={1}>
        {renderMainDocument()}
        {props.file && (
          <DocumentControl
            currentPage={page}
            totalPage={totalPage}
            onChangePage={onPageChanged}
            percentage={percentage}
            onScaleChanged={onScaleChanged}
            pdf={factory}
            file={props.file}
          />
        )}

        {props.newTask !== null && (
          <CustomModal
            showCloseBtn={true}
            title={"Assign Task"}
            isOpen={isOpen}
            handleClose={handleCloseModal}
            children={
              <>
                <AutocompleteField
                  placeholder="Select Task"
                  label="Task"
                  options={formatDropdownData(
                    props.newTask,
                    "",
                    "_id",
                    "topic"
                  )}
                  // onChange={handleProjectChange}
                  sx={{
                    width: "100%",
                    border: "1px solid #c4c4c4",
                    borderRadius: "0 4px 4px 0",
                  }}
                  showSideLabel={true}
                  // groupBy={(option)=> option.label}
                />
                <Button
                  sx={{
                    marginTop: "8px",
                    padding: "3px 4px",
                    textTransform: "capitalize",
                  }}
                  variant="contained"
                  onClick={handleAssignTask}
                >
                  Save
                </Button>
              </>
            }
          />
        )}
      </Paper>
    </div>
  );
};

export default withStyles(DocumentViewerStyles)(DocumentViewer);
