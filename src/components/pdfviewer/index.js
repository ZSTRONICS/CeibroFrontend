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
    "https://ceibro-development.s3.eu-north-1.amazonaws.com/task/task/2023-12-19/CEIBRO-Test_run_2023_11_15__1__1701681729692__1__-_Copy_1702987503302.pdf";
  // const fileUrl ="https://ceibro-development.s3.eu-north-1.amazonaws.com/task/2024-01-05/actual_compressed-compressed_1704452772103.pdf";
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
