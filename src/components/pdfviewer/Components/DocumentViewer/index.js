import React, { Component } from "react";
import doEach from "lodash/forEach";
// import PropTypes from 'prop-types';
// components
import { Document, Page, pdfjs } from "react-pdf";
import DocumentControl from "./../DocumentControl";
import OutlineControl from "./../../Drawer/Outline";
//  import ImageMapEditor from './../../../imagemap/ImageMapEditor';
// material-ui
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import pdfWorker from "./pdfjs/pdf.worker.js";
import { ZoomIn, ZoomOut, Refresh, Room } from "@mui/icons-material";
import { ButtonGroup, Icon, Button, Tooltip } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentViewerStyles = () => ({
  scrollContainer: {
    // overflow: "auto",
    height: "100%",
    // width: "100%",
    padding: "5%",
  },
  viewContainer: {
    // padding: 0,
    // borderRadius: 0,
    // position: "absolute",
    // top: "20%",
    // left: "30%",
    // // margin: "50px auto 100px auto",
    // display: "table",
    // width: "auto",
    // textAlign: "center",
  },
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

class DocumentViewer extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(props);
    this.scrollPanel = React.createRef();
    this.canvasRef = React.createRef();

    // self members binding
    const funcs = [
      "onLoadingPage",
      "onLoadedPage",
      "onDocumentSourceSuccess",
      "onDocumentLoaded",
      "onPageChanged",
      "onZoom",
      "onCreateObject",
      "onScaleChanged",
      // render helpers
      "renderMainDocument",
      "renderLoadingDocument",
      "handleZoomIn",
      "handleZoomOut",
      "handleMarkerClick",
      "drawMarker",
    ];
    doEach(funcs, (func) => (this[func] = this[func].bind(this)));
  }

  initialState(props) {
    return {
      totalPage: 0, // total number of page
      page: 1, // default page
      loadingPage: false,
      progress: 0,
      last: 0,
      percentage: 0.5,
      buffer: 0,
      first: true, // is first page
      pageFactory: null, // PDFDocument Page factory object
      factory: null, // PDFDocument factory object
      isZooming: false,
      isActive: false,
      clickX: null,
      clickY: null,
      drawingIcons: [],
    };
  }

  onLoadingPage({ loaded, total }) {
    let { progress } = this.state;
    let buffer = 10;
    progress = Math.floor((loaded / total) * 100);
    if (progress < 100) {
      buffer = progress + Math.random() * 10;
    }
    this.setState({
      loadingPage: true,
      progress,
      buffer,
    });
  }

  onDocumentSourceSuccess() {
    this.setState({
      loadingPage: true,
    });
  }

  onZoom(percentage) {
    this.setState({
      percentage,
    });
  }

  onPageChanged(page) {
    // console.log(page);
    this.setState({
      page,
      last: page === this.state.totalPage,
      first: page === 1,
    });
  }

  onScaleChanged(percentage) {
    this.setState({
      percentage,
    });
  }

  onLoadedPage(pageFactory) {
    this.setState({
      loadingPage: false,
      progress: 0,
      pageFactory,
    });
  }

  onCreateObject() {
    console.log(this.scrollPanel);
  }

  onDocumentLoaded(factory) {
    const { numPages } = factory;
    let totalPage = numPages;
    let page = 1;
    if (totalPage <= 0) {
      page = 0;
    }
    console.log(factory, page, totalPage);
    this.setState({
      totalPage,
      last: totalPage === 1,
      page,
      factory,
    });
  }

  renderLoadingDocument() {
    return (
      <div className={this.props.classes.progressContainer}>
        <LinearProgress
          variant="buffer"
          value={this.state.progress}
          valueBuffer={this.state.buffer}
        />
      </div>
    );
  }
  handleZoomIn() {
    this.state.percentage < 1.5 &&
      this.setState({
        percentage: this.state.percentage + 0.1,
        isZooming: true,
      });
    setTimeout(() => this.setState({ isZooming: false }), 500);
  }
  handleZoomOut() {
    this.state.percentage > 1 &&
      this.setState({
        percentage: this.state.percentage - 0.1,
        isZooming: true,
      });
    setTimeout(() => this.setState({ isZooming: false }), 500);
  }

  handleMarkerClick = () => {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
  };

  drawMarker(event) {
    const canvas = this.canvasRef.current;
    if (!canvas || !this.state.isActive) return;
    const canvasRect = canvas.getBoundingClientRect();
    console.log(canvasRect, "canvas");
    const clickX = event.clientX - canvasRect.left;
    const clickY = event.clientY - canvasRect.top;
    const icon = { x: clickX, y: clickY, tooltip: "" };
    const icons = [...this.state.drawingIcons, icon];
    console.log(clickX, clickY, "clickX y");
    this.setState({ drawingIcons: icons });
  }

  renderMainDocument() {
    const { classes } = this.props;
    const { isActive, clickX, clickY, drawingIcons } = this.state;
    const buttonStyle = {
      padding: 0,
      color: isActive ? "black" : "",
    };

    if (!this.props.pdf) {
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
            <Button onClick={this.handleZoomIn} sx={{ p: 0 }}>
              <Icon component={ZoomIn} />
            </Button>
            <Button onClick={this.handleZoomOut} sx={{ p: 0 }}>
              <Icon component={ZoomOut} />
            </Button>
            <Button
              onClick={() => {
                this.setState({ percentage: 1 });
              }}
              sx={{ p: 0 }}
            >
              <Icon component={Refresh} />
            </Button>
            <Button onClick={this.handleMarkerClick} sx={buttonStyle}>
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
            file={this.props.file}
            noData={<div />}
            loading={<div />}
            onClick={this.drawMarker}
            onSourceSuccess={this.onDocumentSourceSuccess}
            onSourceError={(error) => {
              console.log(error.message);
            }}
            onLoadSuccess={this.onDocumentLoaded}
            style={{
              transition: "transform 0.3s ease",
              transform: `scale(${this.state.percentage})`,
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
                        zIndex: 9999,
                      }}
                    >
                      <Tooltip title={"Marker tooltip"}>
                        <Icon component={Room} style={{ color: "red" }} />
                      </Tooltip>
                    </div>
                  );
                })}
            </div>
            <Page
              inputRef={(r) => {
                this.pageRef = r;
                // this.canvasRef.current = r?.canvas;
              }}
              canvasRef={this.canvasRef}
              // className={classes.pageContainer}
              onLoadProgress={this.onLoadingPage}
              onLoadSuccess={this.onLoadedPage}
              pageNumber={this.state.page}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              scale={this.state.percentage}
            />
          </Document>
        </div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    let viewContainerStyle = [classes.viewContainer];
    // the user does not pick any file
    if (!this.props.pdf) {
      viewContainerStyle = [...viewContainerStyle, classes.viewEmptyContainer];
    }
    const { factory, pageFactory, percentage } = this.state;
    return (
      <div ref={this.scrollPanel} className={classes.scrollContainer}>
        <Paper className={viewContainerStyle.join(" ")} elevation={1}>
          {this.renderMainDocument()}
          {
            <DocumentControl
              currentPage={this.state.page}
              totalPage={this.state.totalPage}
              onChangePage={this.onPageChanged}
              percentage={percentage}
              onScaleChanged={this.onScaleChanged}
              pdf={factory}
              file={this.props.file}
            />
          }
          {factory && (
            <OutlineControl
              onChangePage={this.onPageChanged}
              pdf={factory}
              totalPage={this.state.totalPage}
              currentPage={this.state.page}
            />
          )}
          {/* {
                        pageFactory && 
                        <div className={classes.editorContainer}>
                            <ImageMapEditor
                                totalPage={this.state.totalPage}
                                currentPage={this.state.page}
                                onChangePage={this.onPageChanged}
                                page={pageFactory}
                                pdf={this.props.pdf}    // pdf arraybuffer object
                                file={this.props.file}  // pdf file
                                lastPage={this.state.last}
                                firstPage={this.state.first}
                                percentage={percentage}
                                onCreateObject={this.onCreateObject}
                                onZoom={this.onZoom}
                                readOnly={false}
                                encrypt={this.props.encrypt}
                            />
                        </div>
                    } */}
        </Paper>
      </div>
    );
  }
}

// DocumentViewer.propTypes = {
// 	pdf: PropTypes.object,
// 	file: PropTypes.object,
// 	classes: PropTypes.object.isRequired,
// };

export default withStyles(DocumentViewerStyles)(DocumentViewer);
