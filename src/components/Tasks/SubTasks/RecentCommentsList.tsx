import { Typography, Divider, makeStyles } from '@material-ui/core'
import { IconButton, ListItemAvatar, Tooltip } from '@mui/material'
import CButton from 'components/Button/Button'
import { CBox } from 'components/material-ui'
import { AttachmentIcon } from 'components/material-ui/icons'
import { CustomBadge, TaskStatus } from 'components/TaskComponent/Tabs/TaskCard'
import FilePreviewer from 'components/Utills/ChatChip/FilePreviewer'
import { momentdeDateFormat, momentTimeFormat } from 'components/Utills/Globals/Common'
import { getColorByStatus } from 'config/project.config'
import { FileInterface } from 'constants/interfaces/docs.interface'
import { RecentCommentsInterface } from 'constants/interfaces/subtask.interface'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import React, { Fragment } from 'react'

interface Props {
    comment: RecentCommentsInterface
  }

export default function RecentCommentsList({ comment }: Props) {
    const classes = useStyles()
    const commentDueDate = momentdeDateFormat(comment.createdAt)
    const commentTime = momentTimeFormat(comment.createdAt);

    const AttachmentsToolTip = () => {
      return comment.files.length > 0 ? (
        <>
          {Array.from(comment.files).map((file: any, index: any) => {
            return (
              <div
                style={{ textTransform: "capitalize" }}
                key={file.name}
              >{`${file.fileName}\n `}</div>
            );
          })}
        </>
      ) : (
        <></>
      );
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
                fontSize: "12px",
                fontWeight: 600,
                color: "#7D7E80",
                paddingLeft: "14px",
              }}
            >
              {`${comment.sender.firstName} ${comment.sender.surName}`}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              style={{ fontSize: "9px", fontWeight: 500, color: "#7D7E80" }}
            >
              {commentDueDate}
            </Typography>
            &nbsp; &nbsp;
            <Divider orientation="vertical" style={{ height: 10, width: 2 }} />
            &nbsp; &nbsp;
            <Typography
              style={{ fontSize: "9px", fontWeight: 500, color: "#7D7E80" }}
            >
              {commentTime}
            </Typography>
            &nbsp; &nbsp;
            <CBox
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              mt={0.85}
              sx={{'& .MuiIconButton-root:hover':{backgroundColor:'none'}}}
            >
              <IconButton disableRipple>
                <CustomBadge
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
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
                  < AttachFileOutlinedIcon sx={{fontSize: "1.3rem",rotate: "45deg"}} color="primary" />
                </CustomBadge>
              </IconButton>
            </CBox>
          </CBox>
          <Typography className={classes.description}>
            {comment.message}
          </Typography>
          <Divider />
        </CBox>
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