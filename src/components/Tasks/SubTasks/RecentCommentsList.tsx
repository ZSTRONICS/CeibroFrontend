import { Divider, makeStyles, Typography } from '@material-ui/core'
import { IconButton, Tooltip } from '@mui/material'
import { CBox } from 'components/material-ui'
import { AttachmentIcon } from 'components/material-ui/icons'
import { CustomBadge, TaskStatus } from 'components/TaskComponent/Tabs/TaskCard'
import { momentdeDateFormat, momentTimeFormat } from 'components/Utills/Globals/Common'
import { getColorByStatus } from 'config/project.config'
import { RecentCommentsInterface } from 'constants/interfaces/subtask.interface'
import CDrawer from 'Drawer/CDrawer'
import { useState } from 'react'
import ViewRejectionComments from './ViewRejectionComments'

interface Props {
  comment: RecentCommentsInterface
}

export default function RecentCommentsList({ comment }: Props) {
  const classes = useStyles()
  const [openViewAllCommentsDrawer, setOpenViewAllCommentsDrawer] = useState<boolean>(false);

  const commentDueDate = momentdeDateFormat(comment.createdAt)
  const commentTime = momentTimeFormat(comment.createdAt);

  const AttachmentsToolTip = () => {
    return comment.files.length > 0 ? (
      <>
        {Array.from(comment.files).map((file: any, index: any) => {
          return (
            <span
              style={{ textTransform: "capitalize" }}
              key={file.name}
            >{`${file.fileName}`}
            </span>
          );
        })}
      </>
    ) : (
      <></>
    );
  };

  const commentCardData = [{
    name: `${comment.sender.firstName} ${comment.sender.surName}`,
    message: comment.message,
    _id: comment._id,
    date: momentdeDateFormat(comment.createdAt),
    time: momentTimeFormat(comment.createdAt),
    userState: comment.userState,
    allFiles: comment.files
  }]
  const openCommentDrawer = () => {
    setOpenViewAllCommentsDrawer((prev: boolean) => !prev);
  };

  return (
    <>
      {" "}
      <CBox mb={1}>
        <CBox display="flex" alignItems="center">
          <TaskStatus
            sx={{
              background: `${getColorByStatus(comment.userState)}`,
              color: "white",
              fontWeight: "500",
              fontSize: "8px",
            }}
          >
            {comment.userState}
          </TaskStatus>
          <Typography
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#7D7E80",
              paddingLeft: "14px",
            }}
          >
            {`${comment.sender.firstName} ${comment.sender.surName}`}
          </Typography>
          &nbsp; &nbsp;
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, color: "#7D7E80" }}
          >
            {commentDueDate}
          </Typography>
          &nbsp; &nbsp;
          <Divider orientation="vertical" style={{ height: 10, width: 2 }} />
          &nbsp; &nbsp;
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, color: "#7D7E80" }}
          >
            {commentTime}
          </Typography>
          &nbsp; &nbsp;
          <CBox
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            // mt={0.85}
            sx={{ '& .MuiIconButton-root:hover': { backgroundColor: 'none' } }}
          >
            {/* <IconButton disableRipple onClick={openCommentDrawer}
               sx={{'& .MuiBadge-anchorOriginTopRightRectangle':{right:'-5px'}, '& .MuiBadge-badge':{fontSize:'9px !important'}}}
              > */}
            <IconButton onClick={openCommentDrawer}>
              <AttachmentIcon />
            </IconButton>
            <CustomBadge
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              overlap="circular"
              color="primary"
              badgeContent={
                <Tooltip title={AttachmentsToolTip()}>
                  {comment.files.length > 0 ? (
                    <div>{comment.files.length}</div>
                  ) : (
                    <div>{0}</div>
                  )}
                </Tooltip>
              }
            >
              {/* < AttachFileOutlinedIcon sx={{fontSize: "1.2rem",rotate: "45deg"}} color="primary" /> */}
            </CustomBadge>
            {/* </IconButton> */}
          </CBox>
        </CBox>
        <Typography className={classes.description}>
          {comment.message}
        </Typography>
        <Divider />
      </CBox>
      <CDrawer
        showBoxShadow={true}
        hideBackDrop={true}
        opencdrawer={openViewAllCommentsDrawer}
        handleclosecdrawer={openCommentDrawer}
        children={
          <ViewRejectionComments
            subTaskHeading="All Comments"
            handleclosecdrawer={openCommentDrawer}
            cardData={commentCardData}
          />
        }
      />
    </>
  );
}

const useStyles = makeStyles({
  // wrapper: {
  //     // padding: '25px 20px',
  //     backgroundColor: '#F5F7F8'
  // },
  heading: {
    fontSize: "12px",
    fontWeight: 600,
    color: '#7D7E80'
  },
  description: {
    fontSize: "14px", fontWeight: 500, color: '#494949', marginBottom: 5
  },

  status: {
    fontSize: 10,
    color: '#fff !important',
    backgroundColor: '#F1B740',
    borderRadius: '3px !important',
    width: '100%',
    maxWidth: '49px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 19,
    marginRight: '5px !important',

  }

})