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
              x: icon.x + icon.x * 0.1,
              y: icon.y + icon.y * 0.1,
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
    console.log("drawingIcons", drawingIcons);
    if (percentage > 0.5) {
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
    console.log("drawingIcons", drawingIcons, "percentage", percentage);
  };

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

  /**
   * Calculates the boundaries of the displayed PDF based on the page dimensions, translation values, and zoom level.
   *
   * @param {number} pageWidth - The width of the PDF page.
   * @param {number} pageHeight - The height of the PDF page.
   * @param {number} transX - The translation value along the X-axis.
   * @param {number} transY - The translation value along the Y-axis.
   * @param {number} zoom - The zoom level of the PDF.
   * @return {Object} An object containing the left, top, right, and bottom boundaries of the displayed PDF.
   */

  function calculatePDFBounds(pageWidth, pageHeight, transX, transY, zoom) {
    console.log(
      `PDFView calculatePDFBounds : pdfWidth=${pageWidth} -- pdfHeight=${pageHeight} -- zoom=${zoom} -- transX=${transX} -- transY=${transY}`
    );
    // Calculate the boundaries of the displayed PDF
    const left = transX / zoom; // Calculate the left boundary
    let top = transY / zoom; // Calculate the top boundary
    if (zoom > 1.05) {
      top = transY;
    }
    const right = left + pageWidth * zoom; // Calculate the right boundary
    let bottom = top + pageHeight * zoom; // Calculate the bottom boundary
    if (zoom > 1.05) {
      bottom = pageHeight + transY;
    }
    console.log(
      `PDFView calculatePDFBounds : left=${left} -- top=${top} -- right=${right} -- bottom=${bottom}`
    );
    return {
      left: left,
      top: top,
      right: right,
      bottom: bottom,
    };
  }

  function drawMarker(event) {
    if (!isActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    // console.log("canvasRect>>", canvasRect);

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
    // payload for Assign Task
    // const payload = {
    //   projectID: "",
    //   floorID: "",
    //   drawingID: "",
    //   iconData: {
    //     id: "",
    //     x: "",
    //     y: "",
    //     taskUUID: "",
    //     taskLabel: "",
    //     pageNo: "",
    //   },
    // };
    // const icons = [...drawingIcons];
    // setDrawingIcons(icons);
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
            height: "600px",
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Document
            file={props.file}
            noData={<div />}
            loading={<div />}
            onSourceSuccess={onDocumentSourceSuccess}
            onSourceError={(error) => {
              console.log(error.message);
            }}
            onLoadSuccess={onDocumentLoaded}
            style={{
              transition: "transform 0.3s ease",
              transform: `scale(${percentage})`,
              height: "100%",
            }}
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
              onClick={drawMarker}
              onLoadProgress={onLoadingPage}
              onLoadSuccess={onLoadedPage}
              pageNumber={page}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              scale={percentage}
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
