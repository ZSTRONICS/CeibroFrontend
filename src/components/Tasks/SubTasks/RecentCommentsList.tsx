import { Typography, Divider, makeStyles } from '@material-ui/core'
import { CBox } from 'components/material-ui'
import { TaskStatus } from 'components/TaskComponent/Tabs/TaskCard'
import React, { Fragment } from 'react'

export default function RecentCommentsList(props: any) {
    const comment = props?.comment
    // const [comment, setComment] = useState<[{}]>(props?.comment);
    const classes = useStyles()

    return (
        <>  <CBox mb={2}>
            <CBox display='flex' alignItems='center'>
                <TaskStatus className={classes.status}>Ongoing</TaskStatus>
                <Typography style={{ fontSize: "11px", fontWeight: 600, color: '#7D7E80' }}>
                    {`${comment.firstName} ${comment.lastName}`}
                </Typography>
                &nbsp;
                &nbsp;
                <Typography style={{ fontSize: "9px", color: '#7D7E80' }}>
                    {comment.createdAt}
                </Typography>
            </CBox>
            <Typography className={classes.description}>
                {comment.description}
            </Typography>
            <Divider />
        </CBox></>
    )
}
const useStyles = makeStyles({
    wrapper: {
        padding: '25px 20px',
        backgroundColor: '#F5F7F8'
    },
    heading: {
        fontSize: "12px",
        fontWeight: 600,
        color: '#7D7E80'
    },
    description: {
        fontSize: "12px", fontWeight: 600, color: '#000000', marginBottom: 5
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