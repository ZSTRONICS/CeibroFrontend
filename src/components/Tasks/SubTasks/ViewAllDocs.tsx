
import React from "react";
import {
  Heading,
  CDateTime,
  FileName,
  Span,
  CommentName,
} from "components/CustomTags";
import {
  Box,
  Grid,
  useMediaQuery,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/system";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import CButton from "components/Button/Button";
import { theme } from "theme";
import assets from "assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { FileInterface } from "constants/interfaces/docs.interface";
import {
  DOC_EXT,
  filesizes,
  FILTER_DATA_BY_EXT,
  MEDIA_EXT,
  momentdeDateFormat,
  momentTimeFormat,
} from "components/Utills/Globals/Common";
import docsAction from "redux/action/docs.actions";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import { Tab, TabPanel, TabsList } from "components/TaskComponent/Tabs/Tabs";
import FilePreviewer from "components/Utills/ChatChip/FilePreviewer";


interface Props {
  heading: string,
  handleCloseCDrawer: () => void
  moduleName: string
  moduleId: string
}

function ViewAllDocs(props: Props) {
  const tabOrMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const { getAllDocsByModule, loadinggetAllDocs } = useSelector((files: RootState) => files.docs);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      docsAction.getDocsByModuleNameAndId({
        other: {
          moduleName: props.moduleName,
          moduleId: props.moduleId,
        },
      })
    );
  }, []);

  return (
    <>
      <Container>
        <CustomStack
          sx={{ paddingBottom: "30px" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading>{props.heading}</Heading>
          {tabOrMobileView && (
            <CButton
              label={"Close"}
              variant="outlined"
              onClick={props.handleCloseCDrawer}
            />
          )}
        </CustomStack>
        <ContentMain>
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab sx={{ fontSize: '1rem' }}>All</Tab>
              <Tab sx={{ fontSize: '1rem' }}>Docs</Tab>
              <Tab sx={{ fontSize: '1rem' }}>Media</Tab>
            </TabsList>
            <TabPanel value={0}>
              {DocsContent(loadinggetAllDocs, getAllDocsByModule)}
            </TabPanel>
            <TabPanel value={1}>
              {DocsContent(loadinggetAllDocs, FILTER_DATA_BY_EXT(DOC_EXT, getAllDocsByModule))}
            </TabPanel>
            <TabPanel value={2}>
              {DocsContent(loadinggetAllDocs, FILTER_DATA_BY_EXT(MEDIA_EXT, getAllDocsByModule))}
            </TabPanel>
          </TabsUnstyled>

        </ContentMain>
      </Container>
      {!tabOrMobileView && (
        <Box onClick={props.handleCloseCDrawer}>
          <CloseIcon />
        </Box>
      )}
    </>
  );
}

export default ViewAllDocs;

const DocsContent = (loadinggetAllDocs: boolean, getAllDocsByModule: FileInterface[]) => {

  const ListItemAvat = (file: FileInterface) => {
    let type = file.fileType
    if (DOC_EXT.includes(file.fileType)) {
      type = file.fileType.replace('.', '')
    }
    const preview = {
      fileType: type,
      fileName: file.fileName,
      url: file.fileUrl,
    };

    return (
      <ListItemAvatar>
        <FilePreviewer showControls={false} hideName={true} file={preview} />
      </ListItemAvatar>
    )
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {loadinggetAllDocs ? <ContentList sx={{ mt: 1, mb: 1, textAlign: "center", maxWidth: 478, width: "376px" }}>
          <CircularProgress />
        </ContentList> : <ContentList dense={true} sx={{ maxWidth: 478, width: "376px" }}>
          {getAllDocsByModule.length > 0 ? (
            getAllDocsByModule.map((file: FileInterface) => {
              const docsDate = momentdeDateFormat(file.createdAt);
              const docsTiem = momentTimeFormat(file.createdAt);
              return (
                <ListItem
                  divider
                  sx={{ paddingLeft: "0" }}
                  secondaryAction={
                    <CustomStack
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                      }}
                    >
                      <CDateTime>{docsDate}</CDateTime>
                      <CDateTime
                        sx={{
                          display: "flex",
                          fontSize: "10px",
                          alignItems: "flex-end",
                        }}
                      >
                        {docsTiem}
                      </CDateTime>
                    </CustomStack>
                  }
                >
                  {ListItemAvat(file)}
                  <ListItemText
                    key={file._id}
                    primary={
                      <a href={file.fileUrl} download style={{ textDecoration: 'none' }}>
                        <FileName
                          sx={{ maxWidth: "200px", width: "100%", color: '#0076C8' }}
                          className="ellipsis"
                        >
                          {file.fileName}
                        </FileName>
                      </a>
                    }
                    secondary={
                      <CustomStack
                        sx={{
                          flexDirection: "column",
                          alignItems: "baseline",
                        }}
                      >
                        {/* <Span>Company. N/A</Span> */}

                        {"fileSize" in file ? (
                          <Span>{`Size: ${filesizes(
                            file.fileSize
                          )}`}</Span>
                        ) : (
                          <Span>{`Size: N/A`}</Span>
                        )}
                      </CustomStack>
                    }
                  />
                </ListItem>
              );
            })
          ) : (
            <CommentName>No attachments found!</CommentName>
          )}
        </ContentList>}
      </Grid>
    </Grid>
  )
}

export const Container = styled(Box)(
  ({ theme }) => `
        max-width:476px;
        width:100%;
        margin: 0 auto;
        padding: 26px 10px 25px 23px;
        background: #f5f7f8b0;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    `
);

// height: calc(100vh - 110px);
export const ContentMain = styled(Box)`
  overflow: hidden;
`;
export const ContentList = styled(List)(
  ({ theme }) => `
  height: calc(100vh - 150px);
  overflow: auto;
    `
);
export const CloseIcon = styled(ExpandCircleDownOutlinedIcon)(
  ({ theme }) => `
  position:absolute;
   top:50%;
   left:-22px;
  transform:rotate(270deg);
  font-size:43px;
  color:#7D7E80;
  cursor:pointer;
  background: #f5f7f8;
  border-radius: 50px;
    `
);
