import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
// components
import { useDispatch, useSelector } from "react-redux";
import projectActions from "redux/action/project.action";
import DocumentViewer from "./Components/DocumentViewer";

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
  const fileUrl =
    "https://ceibro-development.s3.eu-north-1.amazonaws.com/task/2024-01-04/planfileold_1704361313456.pdf";
  const [pdf, setPdf] = useState(fileUrl);
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
