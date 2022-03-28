import { makeStyles } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
// @ts-ignore
import { defaultStyles, FileIcon } from "react-file-icon";
import colors from "../../../assets/colors";

interface FilePreviewerInterface {
  file: any;
  handleClick?: (id: number) => void;
  id?: any;
  showControls: boolean;
}

const FilePreviewer: React.FC<FilePreviewerInterface> = (props) => {
  const { file, showControls } = props;
  console.log("file: ", file);
  const classes = useStyles();

  const handleClick = () => {};
  const handleCancelClick = () => {
    props?.handleClick?.(props.id);
  };

  return (
    <div
      id="ceibro"
      onClick={handleClick}
      className={`file-preview ${classes.wrapper} `}
    >
      {!showControls && (
        <div
          data-name={file.fileName}
          data-url={file.url}
          data-format={file.fileType}
          className={classes.invisibleWrapper}
        ></div>
      )}
      {["png", "jpg", "jpeg"].includes(file?.fileType) ? (
        <img
          data-name={file.fileName}
          data-url={file.url}
          data-format={file.fileType}
          src={file?.url}
        />
      ) : (
        <FileIcon
          {...defaultStyles[file?.fileType]}
          id="file-icon"
          extension={file?.fileType || "Unknown"}
        />
      )}
      {showControls && (
        <Cancel onClick={handleCancelClick} className={classes.crossIcon} />
      )}
      <span className={classes.fileName}>{file?.fileName?.slice(0, 7)}</span>
    </div>
  );
};

export default FilePreviewer;

const useStyles = makeStyles({
  invisibleWrapper: {
    opacity: 0,
    width: 50,
    position: "absolute",
    height: 50,
  },
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  crossIcon: {
    position: "absolute",
    left: -10,
    top: -8,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "20px !important",
    color: colors.btnRed,
    background: colors.white,
    borderRadius: 100,
    width: "20px !important",
    height: "20px !important",
  },
  fileName: {
    fontSize: 12,
    paddingTop: 6,
  },
});
