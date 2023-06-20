import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// components
import DocumentViewer from "./Components/DocumentViewer";
import { useDispatch, useSelector } from "react-redux";
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
    (state) => state.project
  );

  const classes = useStyles();
  const [pdf, setPdf] = useState(null);
  useEffect(() => {
    if (loadDrawing) {
      setPdf(selectedDrawing.drawingUrl);
      dispatch(projectActions.setLoadDrawing(false));
    }
  }, [loadDrawing]);

  return (
    <div className={classes.documentViewport}>
      <DocumentViewer pdf={pdf} file={pdf} newTask={props.newTask} />
    </div>
  );
};

export default DocumentReader;
