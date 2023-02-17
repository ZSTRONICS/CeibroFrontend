import React from "react";
import { Heading, CDateTime, FileName, Span } from "components/CustomTags";
import {
  Box,
  Grid,
  Divider,
  useMediaQuery,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import CButton from "components/Button/Button";
import { theme } from "theme";
import assets from "assets/assets";
// import { useSelector } from "react-redux";
// import { RootState } from "redux/reducers";

function ViewAllDocs(props: any) {
  const tabOrMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  // const getAllSubtaskRejection = useSelector(
  //   (state: RootState) => state.task.getAllSubtaskRejection
  // );
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
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                All Attachments
              </Typography>
              <ContentList dense={true} sx={{ maxWidth: 478, width: "376px" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12, 13, 14].map(
                  (item: any) => {
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
                            <CDateTime>22/08/2020</CDateTime>
                            <CDateTime
                              sx={{
                                display: "flex",
                                fontSize: "8px",
                                alignItems: "flex-end",
                              }}
                            >
                              12:08AM
                            </CDateTime>
                          </CustomStack>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar variant="square" sizes="">
                            <assets.CloudUploadIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<FileName>File Name</FileName>}
                          secondary={
                            <CustomStack
                              sx={{
                                flexDirection: "column",
                                alignItems: "baseline",
                              }}
                            >
                              <Span>Company. Electrician</Span>
                              <Span>Electrician</Span>
                              <Span>Size:9Mb</Span>
                            </CustomStack>
                          }
                        />
                      </ListItem>
                    );
                  }
                )}
              </ContentList>
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
    `
);
export const ContentMain = styled(Box)(
  ({ theme }) => `
  overflow: hidden;
    `
);
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
  background: white;
  border-radius: 50px;
    `
);
