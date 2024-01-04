import { useRef, useState } from "react";
// import PropTypes from 'prop-types';
// components
import { Document, Page, pdfjs } from "react-pdf";
//  import ImageMapEditor from './../../../imagemap/ImageMapEditor';
import { Button } from "@mui/material";
import CustomModal from "components/Modal";
import { formatDropdownData } from "components/Utills/Globals";
import { AutocompleteField } from "components/material-ui/customMuiTextField/simpleTextField";
import type { PDFDocumentProxy } from "pdfjs-dist";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";
import DocumentControl from "../DocumentControl";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentViewerLocal = (props: any) => {
  const [totalPage, setTotalPages] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [loadingPage, setLoadingPage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(1);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [factory, setFactory] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [drawingIcons, setDrawingIcons] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  let PIN_TAP_THRESHOLD = 25;

  let scrollPanel: any,
    pageRef,
    canvasRef = useRef(null);
  const convasContWidth = scrollPanel && scrollPanel?.current.clientWidth;

  function onDocumentSourceSuccess() {
    setLoadingPage(true);
  }

  function onPageChanged(page: any) {
    setPageNumber(page);
  }

  function onScaleChanged(percentage: number) {
    setPercentage(percentage);
  }

  function onLoadedPage(pageFactory: any) {
    setLoadingPage(false);
    setProgress(0);
    setFactory(pageFactory);
  }

  // function onCreateObject() {
  //   console.log(scrollPanel);
  // }

  function onDocumentLoaded(document: DocumentCallback) {
    const { numPages } = document;
    console.log("numPages", numPages);
    let totalPage = numPages;
    let page = 1;
    if (totalPage <= 0) {
      page = 0;
    }
    // console.log(factory, page, totalPage);
    // setTotalPage(totalPage);
    // setLast(totalPage === 1);
    // setPage(page);
    setFactory(factory);
  }

  function handleZoomIn() {
    if (percentage < 1.5) {
      setPercentage((prevState) => {
        const updatedPrevState = prevState + 0.1;
        setTimeout(() => {
          // Update marker position after scaling
          setDrawingIcons((icons: { x: number; y: number; tooltip: any }[]) =>
            icons.map((icon) => ({
              x: icon.x * (updatedPrevState + 0.1),
              y: icon.y * (updatedPrevState + 0.1),
              tooltip: icon.tooltip,
            }))
          );
        }, 500);
        return updatedPrevState;
      });
    }
  }
  function handleZoomOut() {
    if (percentage > 0.5) {
      setPercentage((prevState) => {
        const updatedPrevState = prevState - 0.1;
        setTimeout(() => {
          // Update marker position after scaling
          setDrawingIcons((icons) =>
            icons.map((icon) => ({
              x: icon.x * (updatedPrevState - 0.1),
              y: icon.y * (updatedPrevState - 0.1),
              tooltip: icon.tooltip,
            }))
          );
        }, 500);
        return updatedPrevState;
      });
    }
  }

  // console.log("drawingIcons", drawingIcons);
  // const handleMarkerClick = () => {
  //   setIsActive((prevState) => !prevState);
  // };

  /**
   * Calculates the distance between two points in a 2D plane.
   * @param {number} x1 - The x-coordinate of the first point.
   * @param {number} y1 - The y-coordinate of the first point.
   * @param {number} x2 - The x-coordinate of the second point.
   * @param {number} y2 - The y-coordinate of the second point.
   * @return {number} The distance between the two points.
   */
  function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /**
   * Determines if the given coordinates are too close to any existing markers.
   * @param {number} x - The x-coordinate of the new marker.
   * @param {number} y - The y-coordinate of the new marker.
   * @param {Array} existingMarkers - An array of existing markers.
   * @return {boolean} Returns true if the coordinates are too close to any existing markers, false otherwise.
   */
  function isTooCloseToOtherMarkers(
    x: number,
    y: number,
    existingMarkers: any[]
  ) {
    for (const marker of existingMarkers) {
      const distance = calculateDistance(x, y, marker.x, marker.y);
      if (distance < PIN_TAP_THRESHOLD) {
        return true;
      }
    }
    return false;
  }

  function drawMarker(event: any) {
    const canvas: any = canvasRef.current;
    if (!canvas || !isActive) return;
    const canvasRect = canvas.getBoundingClientRect();
    const clickX = event.clientX - canvasRect.left;
    const clickY = event.clientY - canvasRect.top;
    // Check for existing markers within a 25px radius
    if (isTooCloseToOtherMarkers(clickX, clickY, drawingIcons)) {
      console.log("Too Close");
      return;
    }
    const icon = { x: clickX, y: clickY, tooltip: "" };
    const icons = [...drawingIcons, icon];
    setDrawingIcons(icons);
    console.log("clickX clickX", clickX, clickX);
    // setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleAssignTask = () => {
    const icons = [...drawingIcons];
    setDrawingIcons(icons);
    handleCloseModal();
  };

  const handleDeleteMarker = (index: number) => {
    const icons = [...drawingIcons];
    icons.splice(index, 1);
    setDrawingIcons(icons);
  };

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setTotalPages(nextNumPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  const onResize = () => {
    return () => {
      setContainerWidth(scrollPanel?.current.clientWidth);
    };
  };
  window.addEventListener("resize", onResize);
  return (
    <div ref={scrollPanel} style={{ border: "1px solid red", height: "100%" }}>
      <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          key={`page_${pageNumber + 1}`}
          pageNumber={pageNumber}
          width={
            containerWidth
              ? Math.min(containerWidth, convasContWidth)
              : convasContWidth
          }
        />
      </Document>
      <DocumentControl
        currentPage={pageNumber}
        totalPage={totalPage}
        onChangePage={onPageChanged}
        percentage={percentage}
        onScaleChanged={onScaleChanged}
        pdf={factory}
        file={props.file}
      />
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
                options={formatDropdownData(props.newTask, "", "_id", "topic")}
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
    </div>
  );
};

export default DocumentViewerLocal;
