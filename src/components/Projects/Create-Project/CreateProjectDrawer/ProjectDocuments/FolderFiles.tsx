import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { FolderFileInterface } from "constants/interfaces/project.interface";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFolderFiles,
  uploadFileToFolder,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";
import { useDropzone } from "react-dropzone";
import FilePreviewer from "components/Utills/ChatChip/FilePreviewer";

interface FolderFilesInt {
  selectedFolderId: string | null;
}

const FolderFiles: React.FC<FolderFilesInt> = (props) => {
  const { selectedProject, folderList, folderFiles } = useSelector(
    (state: RootState) => state?.project
  );

  const { selectedFolderId } = props;

  const dispatch = useDispatch();

  const getFiles = () => {
    if (selectedFolderId) {
      dispatch(
        getFolderFiles({
          other: selectedFolderId,
        })
      );
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const classes = useStyles();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(
        uploadFileToFolder({
          body: formData,
          other: selectedFolderId,
          success: () => {
            getFiles();
          },
        })
      );
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps({
        onClick: (event) => event.stopPropagation(),
      })}
    >
      <input {...getInputProps()} />
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={`${classes.tableTitle}`}>Name</TableCell>
              <TableCell className={`${classes.tableTitle}`} align="right">
                Date modified
              </TableCell>
              <TableCell className={`${classes.tableTitle}`} align="right">
                Members
              </TableCell>
              <TableCell className={`${classes.tableTitle}`} align="right">
                Who can access
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isDragActive ? (
              <DragMessage
                classes={classes}
                showBtn={false}
                message={"Drop your file here ..."}
              />
            ) : (
              <>
                {folderFiles?.length < 1 && (
                  <DragMessage
                    classes={classes}
                    onBtnClick={open}
                    showBtn={true}
                  />
                )}
                {folderFiles?.map((file: FolderFileInterface) => {
                  return (
                    <TableRow key={file?.name}>
                      <TableCell
                        onClick={() => {}}
                        style={{ display: "flex" }}
                        component="th"
                        scope="row"
                      >
                        {/* <img src={assets.usersFolder} className="width-16" /> */}
                        {/* <div style={{ width: 20, height: 20 }}>
                          <FilePreviewer file={file} showControls={false} />
                        </div> */}
                        <Typography className={`${classes.fileName}`}>
                          {file?.name}
                        </Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        className={classes.modifyDate}
                      >
                        {file?.createdAt}
                      </TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        className={classes.modifyDate}
                      ></TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        className={classes.modifyDate}
                      >
                        <Typography className={classes.access}>
                          Only you
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FolderFiles;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  uploadMessage: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  message: {
    fontSize: 14,
    fontWeight: 500,
  },
  nameWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 11,
    borderBottom: "none",
  },
  name: {
    borderBottom: "none",
  },
  fileName: {
    fontSize: 14,
    fontWeight: 500,
    paddingLeft: 5,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  modifyDate: {
    fontSize: 14,
    fontWeight: 500,
    // paddingLeft: 15,
  },
  folderIcon: {
    fontSize: 20,
    paddingRight: 20,
  },
  dateWrapper: {
    padding: 9,
    borderBottom: "none",
  },
  memberWrapper: {
    padding: 10,
    borderBottom: "none",
  },
  file: {
    marginLeft: 62,
  },
  fileActions: {
    color: colors.primary,
  },
  generic: {
    fontSize: 14,
    fontWeight: 500,
  },
  folder: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  tableTitle: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  dragging: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 10,
    width: "100%",
  },
  draggingText: {
    fontSize: 14,
    fontWeight: 500,
  },
  access: {
    fontSize: 14,
    fontWeight: 500,
  },
});

interface DragMessageInt {
  classes: any;
  message?: string;
  showBtn?: boolean;
  onBtnClick?: () => void;
}

const DragMessage: React.FC<DragMessageInt> = ({
  classes,
  message,
  showBtn,
  onBtnClick,
}) => {
  return (
    <TableRow style={{ height: 300 }}>
      <TableCell
        onClick={() => {}}
        component="th"
        scope="row"
        className={classes.name}
      ></TableCell>
      <TableCell
        component="th"
        scope="row"
        align="right"
        className={`${classes.name} ${classes.uploadMessage}`}
      >
        <Typography className={classes.message}>
          {message ? message : "Drop to upload file or choose from computer"}
        </Typography>

        {showBtn && (
          <Button
            style={{ alignItems: "center" }}
            variant="outlined"
            color="primary"
            onClick={onBtnClick}
          >
            Browse...
          </Button>
        )}
      </TableCell>

      <TableCell
        component="th"
        scope="row"
        align="right"
        className={classes.name}
      ></TableCell>
      <TableCell
        component="th"
        scope="row"
        align="right"
        className={classes.name}
      ></TableCell>
    </TableRow>
  );
};
