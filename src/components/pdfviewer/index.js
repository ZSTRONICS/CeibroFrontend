import { makeStyles } from "@material-ui/core/styles";
// components
import PDFViewer from "components/uploadImage/WindowPDFViewer";
// import PdfViewer from "./Components/DocumentViewer/PdfViewer";

const useStyles = makeStyles({
  documentViewport: {
    overflow: "auto",
    width: "100%",
    height: "100%",
    backgroundColor: "#eeeeee",
  },
});

const DocumentReader = (props) => {
  // const dispatch = useDispatch();
  // const { loadDrawing, selectedDrawing } = useSelector(
  //   (state) => state.project
  // );

  const classes = useStyles();
  // const fileUrl =
  //   "https://ceibro-development.s3.eu-north-1.amazonaws.com/task/task/2023-12-19/CEIBRO-Test_run_2023_11_15__1__1701681729692__1__-_Copy_1702987503302.pdf";
  // const fileUrl ="https://ceibro-development.s3.eu-north-1.amazonaws.com/task/2024-01-05/actual_compressed-compressed_1704452772103.pdf";
  // const [pdf, setPdf] = useState(props.selectedDrawingUrl);
  // useEffect(() => {
  //   if (pdf) {
  //     setPdf(props.selectedDrawingUrl);
  //   }
  // }, [props.selectedDrawingUrl]);
  // console.log("pdf", pdf);
  return (
    <div className={classes.documentViewport}>
      <PDFViewer
        src={props.selectedDrawingUrl}
        onLoad={() => {}}
        onError={() => {}}
      />
    </div>
  );
};

export default DocumentReader;
