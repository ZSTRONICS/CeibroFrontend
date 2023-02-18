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
  Typography,
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
  filesizes,
  momentdeDateFormat,
  momentTimeFormat,
} from "components/Utills/Globals/Common";
import docsAction from "redux/action/docs.actions";

function ViewAllDocs(props: any) {
  const tabOrMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const { getAllDocsByModule, loadinggetAllDocs } = useSelector((files: RootState) => files.docs);
  
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      docsAction.getDocsByModuleNameAndId({
        other: {
          moduleName: "Task",
          moduleId: props.taskId,
        },
      })
    );
  }, []);

  const ListItemAvat = (fileUrl: any) => {
    return fileUrl ? (
      <ListItemAvatar>
        <Avatar variant="square" alt="img" src={fileUrl} />
      </ListItemAvatar>
    ) : (
      <ListItemAvatar>
        <Avatar variant="square" sizes="">
          <assets.CloudUploadIcon />
        </Avatar>
      </ListItemAvatar>
    );
  };
  return (
    <>
      <Container>
        <CustomStack
          sx={{ paddingBottom: "30px" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading>{props.subTaskHeading}</Heading>
          {tabOrMobileView && (
            <CButton
              label={"Close"}
              variant="outlined"
              onClick={props.handleCloseCDrawer}
            />
          )}
        </CustomStack>
        <ContentMain>
          {/* <Box sx={{ maxWidth: 473 }}> */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {loadinggetAllDocs? <ContentList sx={{ mt: 1, mb: 1,textAlign:"center",maxWidth: 478, width: "376px" }}>
              <CircularProgress/>
              </ContentList>: <ContentList dense={true} sx={{ maxWidth: 478, width: "376px" }}>
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
                        {ListItemAvat(file.fileUrl)}
                        <ListItemText
                          key={file._id}
                          primary={
                            <FileName
                              sx={{ maxWidth: "200px", width: "100%" }}
                              className="ellipsis"
                            >
                              {file.fileName}
                            </FileName>
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
                  <CommentName>There is no file to show</CommentName>
                )}
              </ContentList>}
            </Grid>
          </Grid>
          {/* </Box> */}
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

export const Container = styled(Box)(
  ({ theme }) => `
        max-width:476px;
        width:100%;
        margin: 0 auto;
        padding: 26px 10px 25px 23px;
        background: #F5F7F8;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    `
);
export const ContentMain = styled(Box)`
  overflow: hidden;
`;
export const ContentList = styled(List)(
  ({ theme }) => `
  height: calc(100vh - 110px);
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
