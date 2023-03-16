import {
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { DocumentNameTag } from "components/CustomTags";
import { CustomMuiList } from "components/material-ui";
import CustomModal from "components/Modal";
import { momentdeDateFormat } from "components/Utills/Globals/Common";
import { FileInterface } from "constants/interfaces/docs.interface";
import { FolderInterface } from "constants/interfaces/project.interface";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions, { getFolder } from "redux/action/project.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";
import RollOverMenu from "../ProjectMember/RollOverMenu";
import ProjectAccessModal from "./ProjectAccessModal";
import ProjectDocumentMenu from "./ProjectDocsMenu";

interface ProjectDocumentListInt {
  onFolderClick?: (folder: FolderInterface) => any;
}

const ProjectDocumentList: React.FC<ProjectDocumentListInt> = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state?.auth);

  const {
    selectedProject,
    folderList,
    projectWithMembers,
    isOpenProjectDocumentModal,
  } = useSelector((state: RootState) => state?.project);
  const [isOpenAccessModal, setIsOpenAccessModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFolderFile, setSelectedFolderFile] = useState<
    FolderInterface | FileInterface | any
  >({});
  const selectedProjectWithMembers = projectWithMembers
    .filter(
      (projectWithMember: any) =>
        projectWithMember._id.toString() === selectedProject.toString()
    )
    .find((item: any) => item);

  useEffect(() => {
    if (selectedProject) {
      const payload = {
        finallyAction: () => {
          setLoading(false);
        },
        other: { selectedProject },
      };
      setLoading(true);

      dispatch(getFolder(payload));
    }
  }, [selectedProject]);

  const classes = useStyles();

  const handleFolderClick = (folder: FolderInterface) => {
    props.onFolderClick?.(folder);
  };
  // console.log('folderList',folderList);
  const openAccessModal = (e: any, folder: any) => {
    setSelectedFolderFile(folder);
    dispatch(projectActions.openProjectDocumentModal());
  };
  const closeAccessModal = (e: any) => {
    e.stopPropagation();
    dispatch(projectActions.closeProjectDocumentModal());
  };

  return (
    <>
      <TableContainer style={{ height: "100%", overflow: "visible" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={`${classes.tableTitle}`}>Name</TableCell>
              <TableCell className={`${classes.tableTitle}`} align="center">
                Uploaded On
              </TableCell>
              <TableCell className={`${classes.tableTitle}`} align="center">
                Creator
              </TableCell>
              <TableCell className={`${classes.tableTitle}`} align="center">
                Members
              </TableCell>
              <TableCell className={`${classes.tableTitle}`} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <CircularProgress size={20} className={classes.progress} />
            )}

            {folderList.folders.map((row: FolderInterface) => {
              const DateString: string = momentdeDateFormat(row.createdAt);
              return (
                <TableRow key={row._id}>
                  <TableCell onClick={() => handleFolderClick(row)} scope="row">
                    <DocumentNameTag
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {row.name}
                    </DocumentNameTag>
                  </TableCell>
                  <TableCell
                    scope="row"
                    align="center"
                    className={classes.modifyDate}
                  >
                    {DateString}
                  </TableCell>

                  <TableCell
                    scope="row"
                    align="center"
                    className={classes.modifyDate}
                  >
                    {`${row.creator.firstName} ${row.creator.surName}`}
                    {/* {row?.group?.members?.length || 0} member(s) */}
                  </TableCell>
                  <TableCell
                    scope="row"
                    align="center"
                    style={{ padding: 6 }}
                    className={classes.modifyDate}
                  >
                    {row?.access?.length > 0
                      ? `${row?.access?.length} member(s)`
                      : "Only you"}
                    {row.creator === user._id && (
                      <ProjectDocumentMenu
                        folderId={row._id || ""}
                        access={row?.access || []}
                        groupId={row?.group?._id || ""}
                      />
                    )}
                  </TableCell>
                  <TableCell
                    scope="row"
                    align="center"
                    className={classes.modifyDate}
                  >
                    <RollOverMenu
                      edit="Access"
                      showDelBtn={false}
                      handleEdit={(e: any) => openAccessModal(e, row)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            {folderList.files.length > 0 ? (
              folderList.files.map((file: FileInterface) => {
                const DateString: string = momentdeDateFormat(file.createdAt);
                return (
                  <TableRow key={file._id} className={classes.rowContainer}>
                    <TableCell
                      scope="row"
                      // className={classes.name}
                    >
                      <DocumentNameTag>{file.fileName}</DocumentNameTag>
                    </TableCell>
                    <TableCell
                      scope="row"
                      align="center"
                      className={classes.modifyDate}
                    >
                      {DateString}
                    </TableCell>

                    <TableCell
                      scope="row"
                      align="center"
                      className={classes.modifyDate}
                    >
                      Creator Name
                    </TableCell>
                    <TableCell
                      scope="row"
                      align="center"
                      style={{ padding: 6 }}
                      className={classes.modifyDate}
                    >
                      {file.access.length === 0 ? "Only You" : "N/A"}
                    </TableCell>
                    <TableCell
                      scope="row"
                      align="center"
                      className={classes.modifyDate}
                    >
                      <RollOverMenu
                        edit="Access"
                        showDelBtn={false}
                        handleEdit={(e: any) => openAccessModal(e, file)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
        {folderList.folders.length === 0 && folderList.files.length === 0 && (
          <DocumentNameTag
            sx={{ textAlign: "center", color: "rgb(125, 126, 128)", pt: 2.3 }}
          >
            No data found!
          </DocumentNameTag>
        )}
      </TableContainer>

      <CustomModal
        // {{
        //   width: "100%",
        //   maxWidth: "250px",
        //   maxHeight: "455px",
        // }}
        maxWidth="xs"
        showCloseBtn={false}
        title={""}
        isOpen={isOpenProjectDocumentModal}
        handleClose={closeAccessModal}
        children={
          <ProjectAccessModal
            selectedFolderFile={selectedFolderFile}
            selectedProject={selectedProject}
            handleCloseModal={closeAccessModal}
            projectGroup={selectedProjectWithMembers.groups}
            projectMembers={selectedProjectWithMembers.projectMembers}
          />
        }
      />
    </>
  );
};

export default ProjectDocumentList;

const useStyles = makeStyles({
  rowContainer: {
    "& .MuiTableCell-root": {
      padding: "6px",
    },
  },
  table: {
    minWidth: 650,
  },

  nameWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 11,
    borderBottom: "none",
  },
  name: {
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
    padding: 4,
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
    paddingBottom: 5,
    color: colors.textGrey,
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    marginTop: "300px",
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
