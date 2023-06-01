import React, { useState, ChangeEvent } from "react";
import { Document, Page, pdfjs, PDFDocumentProxy } from "react-pdf";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import * as pdfWorker from "./pdfjs/pdf.worker.js";
import { Button } from "@mui/material";

//@ts-ignore
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "85vh",
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
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const classes = useStyles();

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    setPageNumber(1);
  };

  function handlePages(type: "previous" | "next") {
    switch (type) {
      case "previous":
        numPages && numPages > pageNumber && setPageNumber(pageNumber - 1);
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
            <Box className={classes.pdfViewer}>
              <Document
                file={selectedFile}
                onLoadSuccess={onDocumentLoadSuccess}
                loading="Loading..."
              >
                <Box key={pageNumber} className={classes.pageContainer}>
                  <Page pageNumber={pageNumber} />
                </Box>
              </Document>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button onClick={() => handlePages("previous")}>previous</Button>
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
