import React from "react";
import {
  CDateTime,
  CommentDescription,
  CommentName,
  Heading,
} from "components/CustomTags";
import { Box, Grid, Divider, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import {
  CustomStack,
  TaskStatus,
} from "components/TaskComponent/Tabs/TaskCard";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import CButton from "components/Button/Button";
import { theme } from "theme";
// import { getColorByStatus } from "config/project.config";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { RejectedComment } from "constants/interfaces/rejectionComments.interface";

function ViewRejectionComments(props: any) {
  const taborMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const getAllSubtaskRejection = useSelector(
    (state: RootState) => state.task.getAllSubtaskRejection
  );
  return (
    <>
      <Container>
        <CustomStack
          sx={{ paddingBottom: "30px" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading>{props.subTaskHeading}</Heading>
          {taborMobileView && (
            <CButton
              label={"Close"}
              variant="outlined"
              onClick={props.handleCloseCDrawer}
            />
          )}
        </CustomStack>
        <ContentMain>
          {getAllSubtaskRejection.length>0 ? 
            getAllSubtaskRejection.map((item: RejectedComment) => (
              <>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ padding: "17px 13px 4px 4px" }}
                  key={item._id}
                >
                  <Grid item>
                    <CustomStack gap={1.5}>
                      {/* <TaskStatus  sx={{
              // background: `${getColorByStatus(state)}`,
              background: 'blue',
              color: "white",
              fontWeight: "400",
              fontSize: "8px",
            }}>status</TaskStatus> */}
                      <CommentName>{item.name}</CommentName>
                    </CustomStack>
                  </Grid>

                  <Grid item>
                    <CustomStack gap={0.4}>
                      <CDateTime>no Date</CDateTime>
                      <Divider orientation="vertical" />
                      <CDateTime variant="body2">no time</CDateTime>
                    </CustomStack>
                  </Grid>
                </Grid>
                <Box sx={{ padding: "" }}>
                  <CommentDescription>{item.description}</CommentDescription>
                  <Divider sx={{ width: "100%" }} />
                </Box>
              </>
            ))
           :
           <CommentName>There is no comment</CommentName>}
        </ContentMain>
      </Container>
      {!taborMobileView && (
        <Box onClick={props.handleCloseCDrawer}>
          <CloseIcon />
        </Box>
      )}
    </>
  );
}

export default ViewRejectionComments;

export const Container = styled(Box)(
  ({ theme }) => `
        max-width:466px;
        margin: 0 auto;
        padding: 26px 10px 25px 23px;
    `
);
export const ContentMain = styled(Box)(
  ({ theme }) => `
  height: calc(100vh - 108px);
  overflow: auto;
    `
);
export const CloseIcon = styled(ExpandCircleDownOutlinedIcon)(
  ({ theme }) => `
  position:absolute;
   top:50%;
   left:-17px;
  transform:rotate(270deg);
  font-size:43px;
  color:#7D7E80;
  cursor:pointer;
  background: white;
  border-radius: 50px;
    `
);
