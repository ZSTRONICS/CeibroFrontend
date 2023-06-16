import React from "react";
import {
  CDateTime,
  CommentDescription,
  CommentName,
  FileName,
  Heading,
} from "components/CustomTags";
import { Box, Grid, Divider, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import {
  CustomStack, TaskStatus,
} from "components/TaskComponent/Tabs/TaskCard";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { CButton } from "components/Button";
import { theme } from "theme";
import { getColorByStatus } from "config/project.config";
import FilePreviewer from "components/Utills/ChatChip/FilePreviewer";

function ViewRejectionComments(props: any) {
  const taborMobileView = useMediaQuery(theme.breakpoints.down("sm"));
const {cardData }= props

const AttachmentPreview=(file:any)=>{
  let type = file.fileType.replace('.', '')
  const preview = {
    fileType: type,
    fileName: file.fileName,
    url: file.fileUrl,
  };
  return (
    
    <FilePreviewer showControls={false} hideName={true} file={preview} />
  )
}

  return (
    <>
      <Container>
        <CustomStack
          sx={{ paddingBottom: "30px",  width: "376px" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading>{props.subTaskHeading}</Heading>
          {taborMobileView && (
            <CButton
              label={"Close"}
              variant="outlined"
              onClick={props.handleclosecdrawer}
            />
          )}
        </CustomStack>
        <ContentMain className="custom-scrollbar">
          {cardData.length>0 ? 
            cardData.map((item: any) => {
            if(item === undefined){
              return
            }
             return <>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ padding: "17px 13px 4px 4px" }}
                  key={item._id}
                >
                  <Grid item>
                    <CustomStack gap={1.5}>
                     {typeof item.userState !=='undefined' ? <TaskStatus  sx={{
                    background: `${getColorByStatus(item.userState)}`,
                    color: "white",
                    fontWeight: "400",
                    fontSize: "8px",
                    }}>{item.userState}</TaskStatus>:<></>}
                      <CommentName >{item.name}</CommentName>
                    </CustomStack>

                  </Grid>

                  <Grid item>
                    <CustomStack gap={0.4}>
                      <CDateTime>{item.date}</CDateTime>
                      <Divider orientation="vertical" />
                      <CDateTime variant="body2">{item.time}</CDateTime>
                    </CustomStack>
                  </Grid>
                </Grid>
                <Box>
                  <CommentDescription sx={{textAlign:'justify', padding:'5px 12px'}}>{item.message}</CommentDescription>
                  <CustomStack flexWrap='wrap' rowGap={1.2}>
                     {item.allFiles.length>0?item.allFiles.map((file:any)=>{
                      if(file=== undefined){
                        return <></>
                      }
                      return (<>
                      <a href={file.fileUrl} download style={{ textDecoration: 'none',margin:'0 10px' }}>
                      {AttachmentPreview(file)}
                        <FileName
                          key={file._id}
                          sx={{ maxWidth: "100px", width: "100%", color: '#0076C8' }}
                          className="ellipsis"
                        >
                          {file.fileName}
                        </FileName>
                      </a>
                      </>
                      )
                    }):<></>}
                   
                  </CustomStack>
                  <Divider sx={{ width: "100%" }} />
                </Box>
              </>
})
           :
           <CommentName>No data found!</CommentName>}
        </ContentMain>
      </Container>
      {!taborMobileView && (
        <Box onClick={props.handleclosecdrawer}>
          <CloseIcon />
        </Box>
      )}
    </>
  );
}

export default ViewRejectionComments;

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
  background: #f5f7f8;
  border-radius: 50px;
    `
);
