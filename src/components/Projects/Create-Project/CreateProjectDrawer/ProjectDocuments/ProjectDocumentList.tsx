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
import { Tooltip } from "@mui/material";
import { DocumentNameTag } from "components/CustomTags";
import CustomModal from "components/Modal";
import {
  CustomBadge,
  CustomStack,
  AssignedTag,
} from "components/TaskComponent/Tabs/TaskCard";
import { momentdeDateFormat } from "components/Utills/Globals/Common";
import { FileInterface } from "constants/interfaces/docs.interface";
import {
  Creator,
  FolderInterface,
} from "constants/interfaces/project.interface";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions, { getFolder } from "redux/action/project.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";
import RollOverMenu from "../ProjectMember/RollOverMenu";
import ProjectAccessModal from "./ProjectAccessModal";

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
  const AccessMemberList = (membersList: Creator[]) => {
    return (
      <>
        {membersList.map((item: Creator, index) => {
          if (item === undefined) {
            return <></>;
          }
          if (index === membersList.length - 1) {
            return (
              <span
                style={{ textTransform: "capitalize" }}
                key={item._id}
              >{`${item.firstName} ${item.surName}`}</span>
            );
          } else {
            return (
              <span
                style={{ textTransform: "capitalize" }}
                key={item._id}
              >{`${item.firstName} ${item.surName},`}</span>
            );
          }
        })}
      </>
    );
  };

  return (
    <>
      <TableContainer style={{ height: "100%", paddingBottom: "100px" }}>
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
            {/* {loading && (
            <CircularProgress size={20} className={classes.progress} />
          )} */}

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
                  </TableCell>
                  <TableCell
                    scope="row"
                    align="center"
                    style={{ padding: 6 }}
                    className={classes.modifyDate}
                  >
                    {row.access.length > 0 ? (
                      <CustomStack
                        columnGap={0.5}
                        rowGap={1}
                        justifyContent="center"
                      >
                        <AssignedTag>Member</AssignedTag>
                        <CustomBadge
                          overlap="circular"
                          color="primary"
                          badgeContent={
                            <Tooltip title={AccessMemberList(row.access)}>
                              <span>{row.access.length}</span>
                            </Tooltip>
                          }
                        ></CustomBadge>
                      </CustomStack>
                    ) : (
                      "Only you"
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
                    <TableCell scope="row">
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
                      {`${file.uploadedBy.firstName} ${file.uploadedBy.surName}`}
                    </TableCell>
                    <TableCell
                      scope="row"
                      align="center"
                      style={{ padding: 6 }}
                      className={classes.modifyDate}
                    >
                      {file.access.length > 0 ? (
                        <CustomStack
                          columnGap={0.5}
                          rowGap={1}
                          justifyContent="center"
                        >
                          <AssignedTag>Member</AssignedTag>
                          <CustomBadge
                            overlap="circular"
                            color="primary"
                            badgeContent={
                              <Tooltip title={AccessMemberList(file.access)}>
                                <span>{file.access.length}</span>
                              </Tooltip>
                            }
                          ></CustomBadge>
                        </CustomStack>
                      ) : (
                        "N/A"
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
        maxWidth="xs"
        showCloseBtn={false}
        title={"Manage access"}
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
    // marginBottom: "100px",
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
