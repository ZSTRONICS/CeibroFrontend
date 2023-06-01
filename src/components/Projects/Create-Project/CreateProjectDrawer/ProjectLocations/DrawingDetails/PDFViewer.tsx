import React, { useState, ChangeEvent } from "react";
import { Document, Page, pdfjs, PDFDocumentProxy } from "react-pdf";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import * as pdfWorker from "./pdfjs/pdf.worker.js";
import { Button } from "@mui/material";
import { CustomStack } from "components/CustomTags";

//@ts-ignore
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 150px)",
    overflow: "auto",
    border: "1px solid red",
  },
  pdfViewer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  pageContainer: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

const PDFViewer: React.FC = () => {
  const classes = useStyles();

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(1.0);

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
  };
  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => prevScale - 0.1);
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    setPageNumber(1);
  };

  function handlePages(type: "previous" | "next") {
    switch (type) {
      case "previous":
        pageNumber > 1 && setPageNumber(pageNumber - 1);
        break;
      case "next":
        numPages && numPages > pageNumber && setPageNumber(pageNumber + 1);
        break;
    }
  }

  return (
    <Box>
      <Box>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "block" }}
        />
      </Box>
      {selectedFile && (
        <>
          <Box className={classes.root}>
            <CustomStack sx={{alignItems:'flex-start', height:'100%'}}>
              <Button onClick={handleZoomIn}>Zoom In</Button>
              <Button onClick={handleZoomOut}>Zoom Out</Button>
            </CustomStack>
            <Box className={classes.pdfViewer}>
              <Document
                file={selectedFile}
                onLoadSuccess={onDocumentLoadSuccess}
                loading="Loading..."
              >
                <Box key={pageNumber} className={classes.pageContainer}>
                  <Page scale={scale} pageNumber={pageNumber} />
                </Box>
              </Document>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              disabled={pageNumber === 1}
              onClick={() => handlePages("previous")}
            >
              previous
            </Button>
            <p>
              Page {pageNumber} of {numPages}
            </p>
            <Button onClick={() => handlePages("next")}>next</Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PDFViewer;
