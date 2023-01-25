import { Typography, Divider, makeStyles } from '@material-ui/core'
import { CBox } from 'components/material-ui'
import { TaskStatus } from 'components/TaskComponent/Tabs/TaskCard'
import React, { Fragment } from 'react'

export default function RecentCommentsList() {
    const classes = useStyles()

    return (
        <>  <CBox mb={2}>
            <CBox display='flex' alignItems='center'>
                <TaskStatus className={classes.status}>Ongoing</TaskStatus>
                <Typography style={{ fontSize: "11px", fontWeight: 600, color: '#7D7E80' }}>
                    Kristo Vunukainen
                </Typography>
                &nbsp;
                &nbsp;
                <Typography style={{ fontSize: "9px", color: '#7D7E80' }}>
                    12.06.2021 | 10:15
                </Typography>
            </CBox>
            <Typography className={classes.description} >Magnis dis parturient montes, nascetur Aenean eu leo quam. Pellentesque ornare </Typography>
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