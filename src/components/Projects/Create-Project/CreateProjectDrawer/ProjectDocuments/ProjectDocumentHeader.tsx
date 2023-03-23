import { makeStyles } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import CButton from "components/Button/Button";
import CustomModal from "components/Modal";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import UploadDocs from "components/uploadImage/UploadDocs";
import { FolderInterface } from "constants/interfaces/project.interface";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  getAllDocuments,
  getFolderFiles,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";
import DocumentDrawer from "./DocumentDrawer";

interface headerInterface {
  selectedFolder?: FolderInterface | null;
  handleGoBack: () => any;
  isFolder: boolean;
}

const ProjectDocumentHeader: React.FC<headerInterface> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedProject, folderList } = useSelector(
    (state: RootState) => state?.project);
  const { selectedFolder, handleGoBack, isFolder } = props;
  const [findDoc, setFindDoc] = useState<any>("");

  const [isAttachmentViewOpen, setIsAttachmentViewOpen]: any = useState(false);

  const [selectedAttachments, setSelectedAttachments] = useState<any>({
    moduleId: "",
    moduleName: "Project",
    files: [],
  });

  const handleOpenCloseAttachmentModal = (e: any) => {
    e.stopPropagation();
    setIsAttachmentViewOpen((value: boolean) => !value);
  };

  useEffect(() => {
    if(findDoc===""){
      return
    }else if(findDoc!=="") {
      dispatch(getAllDocuments({ other: { selectedProject, findDoc } }));
    }
  }, [findDoc]);

  // search files inside folder
  useEffect(() => {
    if (selectedFolder && findDoc) {
      dispatch(
        getFolderFiles({
          other: { selectedFolder: selectedFolder?._id, findDoc },
        })
      );
    }
  }, [selectedFolder, findDoc]);

  useEffect(()=>{
    if( findDoc!==""){
      return
    }
    if(findDoc===""){
      dispatch(
        getAllDocuments({
          other: { selectedProject },
        })
      );
    }
  },[findDoc])

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item sx={{ width: "100%", maxWidth: "415px" }}>
          <Paper
            elevation={0}
            component="form"
            sx={{
              p: "1px 10px",
              display: "flex",
              alignItems: "center",
              maxWidth: 415,
              width: "100%",
              border: "1px solid #DBDBE5",
            }}
          >
            <SearchIcon />
            <Divider
              sx={{ height: 28, m: 0.5, pl: 0.5 }}
              orientation="vertical"
            />
            <InputBase
            value={findDoc||""}
            onChange={(e: any) => setFindDoc(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Find document"
              inputProps={{ "aria-label": "Find document" }}
            />
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={7} className={classes.actionWrapper}>
        <InputText
        value={findDoc||""}
          placeholder={isFolder ? "Find folder" : "Find document"}
          onChange={(e: any) => setFindDoc(e.target.value)}
        />
      </Grid> */}
        <Grid item>
          <CustomStack
            gap={2}
            sx={{
              "@media(max-width:702px)": {
                paddingTop: "10px",
              },
            }}
          >
            {isFolder === true && (
              <CButton
                variant="outlined"
                color="primary"
                label="Create folder"
                sx={{
                  fontSize: 12,
                  fontWeight: "700",
                  padding: "8px 16px",
                  textTransform: "unset",
                }}
                onClick={() => {
                  dispatch(projectActions.openProjectDocuments());
                }}
              />
            )}
            <CButton
              variant="outlined"
              color="primary"
              label="Upload file(s)"
              sx={{
                fontSize: 12,
                fontWeight: "700",
                padding: "8px 16px",
                textTransform: "unset",
              }}
              onClick={handleOpenCloseAttachmentModal}
            />
          </CustomStack>
          <DocumentDrawer />
          {/* <div className={classes.viewIcons}>
          <BsGrid style={{ color: colors.primary }} />
          <AiOutlineUnorderedList />
        </div> */}
        </Grid>
      </Grid>

      <Grid className={classes.breadCrums}>
        <Typography onClick={handleGoBack} className={classes.breadCrumsText}>
          Document
        </Typography>{" "}
        &nbsp;/
        {selectedFolder && (
          <Typography className={classes.breadCrumsFolder}>
            &nbsp;{selectedFolder?.name}
          </Typography>
        )}
      </Grid>
      <CustomModal
        showCloseBtn={false}
        isOpen={isAttachmentViewOpen}
        handleClose={(e: any) => {
          handleOpenCloseAttachmentModal(e);
        }}
        title={"Attachments"}
        children={
          <UploadDocs
            selectedAttachments={selectedAttachments}
            showUploadButton={true}
            moduleType={isFolder === true ? "Project" : "ProjectFolder"}
            moduleId={isFolder === true ? selectedProject : selectedFolder?._id}
            handleClose={(e: any, value: any): void => {
              setSelectedAttachments(value);
              setIsAttachmentViewOpen((prev: boolean) => !prev);
            }}
          />
        }
      />
    </>
  );
};

export default ProjectDocumentHeader;

const useStyles = makeStyles({
  breadCrums: {
    paddingTop: 16,
    display: "flex",
  },
  breadCrumsText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.receiverBoxTitle,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  breadCrumsFolder: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
  },
  actionWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    "@media (max-width:960px)": {
      paddingBottom: 10,
    },
  },
  secondActionWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    "@media (max-width:960px)": {
      justifyContent: "space-between",
    },
  },
  actionButton: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  viewIcons: {
    display: "flex",
    justifyContent: "space-between",
    width: "50px",
  },
});
