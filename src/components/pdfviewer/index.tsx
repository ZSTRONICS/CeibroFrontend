import { makeStyles } from "@material-ui/core/styles";
// components
import PDFViewer from "components/uploadImage/WindowPDFViewer";
import { useEffect } from "react";
import { getPDFPageDimensions } from "./Components/DocumentViewer/utils";
// import PdfViewer from "./Components/DocumentViewer/PdfViewer";

const useStyles = makeStyles({
  documentViewport: {
    overflow: "auto",
    width: "100%",
    height: "100%",
    backgroundColor: "#eeeeee",
  },
});

interface Props {
  selectedDrawingUrl: string;
  setPageDimensions: (dimensions: { width: number; height: number }) => void;
}

const DocumentReader = (props: Props) => {
  const { selectedDrawingUrl, setPageDimensions } = props;
  const classes = useStyles();

  useEffect(() => {
    getPDFPageDimensions(selectedDrawingUrl)
      .then((dimensions) => {
        setPageDimensions(dimensions);
      })
      .catch((e: any) => {
        console.log("error", e);
      });
  }, [selectedDrawingUrl]);
  // const fileUrl =
  //   "https://ceibro-development.s3.eu-north-1.amazonaws.com/task/task/2023-12-19/CEIBRO-Test_run_2023_11_15__1__1701681729692__1__-_Copy_1702987503302.pdf";
  // const fileUrl ="https://ceibro-development.s3.eu-north-1.amazonaws.com/task/2024-01-05/actual_compressed-compressed_1704452772103.pdf";
  return (
    <div className={classes.documentViewport}>
      <PDFViewer
        src={selectedDrawingUrl}
        onLoad={() => {}}
        onError={() => {}}
      />
    </div>
  );
};

export default DocumentReader;
