import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import doEach from "lodash/forEach";
// components
import Drawer from "./Drawer";
import DocumentViewer from "./Components/DocumentViewer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";
import projectActions from "redux/action/project.action";

const useStyles = makeStyles({
  documentViewport: {
    overflow: "auto",
    width: "100%",
    height: "100%",
    backgroundColor: "#eeeeee",
  },
});

const DocumentReader = (props) => {
  const dispatch = useDispatch();
  const { loadDrawing, selectedDrawing } = useSelector(
    (state: RootState) => state.project
  );

  const classes = useStyles();
  const [pdf, setPdf] = useState(null);
  const [pdfBuffer, setPdfBuffer] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    if (loadDrawing) {
      console.log(selectedDrawing, "@@@@@@@@@");
      setPdf(selectedDrawing.drawingUrl);
      dispatch(projectActions.setLoadDrawing(false));
    }
  }, [loadDrawing]);

  const onDocumentUploaded = (pdf, pdfBuffer) => {
    setPdf(pdf);
    setPdfBuffer(pdfBuffer);
    setShowDrawer(false);
  };

  const onDrawer = () => {
    setShowDrawer((prevShowDrawer) => !prevShowDrawer);
  };

  return (
    <div className={classes.documentViewport}>
      {/* <Drawer
        maxSize={props.maxSize || 80000000}
        visible={showDrawer}
        onClose={onDrawer}
        pdf={pdfBuffer}
        onUploaded={onDocumentUploaded}
      /> */}
      <DocumentViewer pdf={pdfBuffer} file={pdf} />
    </div>
  );
};

export default DocumentReader;
