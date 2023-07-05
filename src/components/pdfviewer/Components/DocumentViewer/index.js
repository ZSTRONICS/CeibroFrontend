import React, { Component, useState, useRef } from "react";
import doEach from "lodash/forEach";
// import PropTypes from 'prop-types';
// components
import { Document, Page, pdfjs } from "react-pdf";
import DocumentControl from "./../DocumentControl";
import OutlineControl from "./../../Drawer/Outline";
import ImageMapEditor from "./../../../imagemap/ImageMapEditor";
// material-ui
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ZoomIn, ZoomOut, Refresh, Room, Close } from "@mui/icons-material";
import { ButtonGroup, Icon, Button, Tooltip } from "@mui/material";
import CustomModal from "components/Modal";
import { AutocompleteField } from "components/material-ui/customMuiTextField/simpleTextField";
import { formatDropdownData } from "components/Utills/Globals";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentViewerStyles = () => ({
  scrollContainer: {
    overflow: "auto",
    height: "100%",
    width: "100%",
    padding: "5% 2% 1% 2%",
  },
  viewContainer: {
    // padding: 0,
    borderRadius: 0,
    position: "relative",
    // top: "20%",
    // left: "30%",
    // margin: "50px auto 100px auto",
    // display: "table",
    width: "100%",
    textAlign: "center",
  },
  editorContainer: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
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
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [last, setLast] = useState(0);
  const [percentage, setPercentage] = useState(0.5);
  const [buffer, setBuffer] = useState(0);
  const [first, setFirst] = useState(true);
  const [pageFactory, setPageFactory] = useState(null);
  const [factory, setFactory] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [clickX, setClickX] = useState(null);
  const [clickY, setClickY] = useState(null);
  const [drawingIcons, setDrawingIcons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  let scrollPanel,
    pageRef,
    canvasRef = useRef(null);

  const { classes } = props;

  function onLoadingPage({ loaded, total }) {
    //  state not defined
    let { progress } = props.state;
    let buffer = 10;
    progress = Math.floor((loaded / total) * 100);
    if (progress < 100) {
      buffer = progress + Math.random() * 10;
    }
    setLoadingPage(true);
    setProgress(progress);
    setBuffer(buffer);
  }

  function onDocumentSourceSuccess() {
    setLoadingPage(true);
  }

  function onZoom(percentage) {
    setPercentage(percentage);
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
    setPageFactory(pageFactory);
  }

  function onCreateObject() {
    console.log(scrollPanel);
  }

  function onDocumentLoaded(factory) {
    const { numPages } = factory;
    let totalPage = numPages;
    let page = 1;
    if (totalPage <= 0) {
      page = 0;
    }
    // console.log(factory, page, totalPage);
    setTotalPage(totalPage);
    setLast(totalPage === 1);
    setPage(page);
    setFactory(factory);
  }

  function renderLoadingDocument() {
    return (
      <div className={classes.progressContainer}>
        <LinearProgress
          variant="buffer"
          value={progress}
          valueBuffer={buffer}
        />
      </div>
    );
  }

  function handleZoomIn() {
    if (percentage < 1.5) {
      setPercentage((prevState) => prevState + 0.1);
      setIsZooming(true);
      setTimeout(() => setIsZooming(false), 500);
    }
  }
  function handleZoomOut() {
    if (percentage > 0.5) {
      setPercentage((prevState) => prevState - 0.1);
      setIsZooming(true);
      setTimeout(() => setIsZooming(false), 500);
    }
  }

  const handleMarkerClick = () => {
    setIsActive((prevState) => !prevState);
  };

  function drawMarker(event) {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    const canvasRect = canvas.getBoundingClientRect();
    console.log(canvasRect, "canvas");
    const clickX = event.clientX - canvasRect.left;
    const clickY = event.clientY - canvasRect.top;
    const icon = { x: clickX, y: clickY, tooltip: "" };
    const icons = [...drawingIcons, icon];
    console.log(clickX, clickY, "clickX y");
    setDrawingIcons(icons);
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleAssignTask = () => {
    // payload for Assign Task
    const payload = {
      projectID: "",
      floorID: "",
      drawingID: "",
      iconData: {
        id: "",
        x: "",
        y: "",
        taskUUID: "",
        taskLabel: "",
        pageNo: "",
      },
    };
    const icons = [...drawingIcons];
    setDrawingIcons(icons);
    handleCloseModal();
    console.log("Assign Task");
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
            <Button
              onClick={() => {
                setPercentage(0.5);
              }}
              sx={{ p: 0 }}
            >
              <Icon component={Refresh} />
            </Button>
            <Button onClick={handleMarkerClick} sx={buttonStyle}>
              <Icon component={Room} />
            </Button>
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
            onClick={drawMarker}
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
            {/* <div style={{ position: "relative" }}>
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
                          top: "-10px",
                          right: "-10px",
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
                      <Tooltip title="Marker tooltip">
                        <Icon component={Room} style={{ color: "red" }} />
                      </Tooltip>
                    </div>
                  );
                })}
            </div> */}
            <Page
              inputRef={(r) => {
                pageRef = r;
                // canvasRef.current = r?.canvas;
              }}
              canvasRef={canvasRef}
              // className={classes.pageContainer}
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

  // const { classes } = props;
  let viewContainerStyle = [classes.viewContainer];
  // the user does not pick any file
  if (!props.pdf) {
    viewContainerStyle = [...viewContainerStyle, classes.viewEmptyContainer];
  }

  return (
    <div ref={scrollPanel} className={classes.scrollContainer}>
      <Paper className={viewContainerStyle.join(" ")} elevation={1}>
        {renderMainDocument()}
        {/* {props.file && (
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
        {factory && (
          <OutlineControl
            onChangePage={onPageChanged}
            pdf={factory}
            totalPage={totalPage}
            currentPage={page}
          />
        )} */}
        {pageFactory && (
          <div className={classes.editorContainer}>
            <ImageMapEditor
              totalPage={totalPage}
              currentPage={page}
              onChangePage={onPageChanged}
              page={pageFactory}
              pdf={props.pdf} // pdf arraybuffer object
              file={props.file} // pdf file
              lastPage={last}
              firstPage={first}
              percentage={percentage}
              onCreateObject={onCreateObject}
              onZoom={onZoom}
              readOnly={false}
              encrypt={props.encrypt}
            />
          </div>
        )}

        {
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
        }
      </Paper>
    </div>
  );
};

export default withStyles(DocumentViewerStyles)(DocumentViewer);
