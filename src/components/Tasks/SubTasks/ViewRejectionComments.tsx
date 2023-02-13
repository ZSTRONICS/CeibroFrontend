import React from "react";
import {
  CommentDateTime,
  CommentDescription,
  CommentName,
  Heading,
} from "components/CustomTags";
import { Box, Grid, Divider } from "@mui/material";
import { styled } from "@mui/system";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
function ViewRejectionComments() {
  return (
    <>
      <Container>
        
        <Heading sx={{ paddingBottom: "30px" }}>Subtask Rejection</Heading>
        {[1, 2, 3, 4,5,6,7,8,9].map((item: any) => (
          <>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{ padding: "17px 13px 4px 4px" }}
            >
              <Grid item>
                <CommentName>Kristo Vunukainen</CommentName>
              </Grid>
              <Grid item>
                <CustomStack gap={0.4}>
                  <CommentDateTime>12.06.2021</CommentDateTime>
                  <Divider orientation="vertical" />
                  <CommentDateTime variant="body2">10:15</CommentDateTime>
                </CustomStack>
              </Grid>
            </Grid>
            <Box sx={{ padding: "" }}>
              <CommentDescription>
                Magnis dis parturient montes, nascetur Aenean eu leo quam.
                Pellente ornare Magnis dis parturient montes, nascetur Aenean eu
                leo quam. Pellente ornare
              </CommentDescription>
              <Divider sx={{ width: "100%" }} />
            </Box>
          </>
        ))}
      </Container>

      <Box>
      <ExpandCircleDownOutlinedIcon sx={{transform:'rotate(270deg)'}}/>
      </Box>
    </>
  );
}

export default ViewRejectionComments;

// width: calc(100vw - 200px);

export const Container = styled(Box)(
  ({ theme }) => `
        max-width:466px;
        margin: 0 auto;
        padding: 26px 10px 25px 23px;
       
    `
);
