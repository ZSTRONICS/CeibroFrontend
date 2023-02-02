import { useState } from 'react'

// mui
import { Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { CBox } from 'components/material-ui'

// components
import { AssignedTag, TaskStatus } from 'components/TaskComponent/Tabs/TaskCard'
import { AssignedTo, Member } from 'constants/interfaces/subtask.interface'

interface Props {
    allSubTaskOfTask: any
}

export default function TaskDetailHeader(props: any) {
    const classes = useStyles()
    const [showMore, setShowMore] = useState<boolean>(false);
    const membersList = props?.subtaskDetail?.assignedTo.map((member: AssignedTo) => member.members).flat(1)

    return (
        <>
            <CBox display='flex' alignItems='center' justifyContent='space-between'>
                <CBox flex='1 1 0' display='flex' alignItems='center' >
                    {/* <Typography >Draft</Typography>  */}
                    <TaskStatus className={classes.status}>Draft</TaskStatus>

                    <Typography style={{ fontSize: "11px", color: '#7D7E80' }}>
                        {props?.subtask?.dueDate}
                    </Typography>
                    &nbsp;
                    <Typography style={{ fontSize: "11px", fontWeight: 600 }}>
                        11.02.2021
                        {props?.subtask?.createdAt}
                    </Typography>
                </CBox>

            </CBox>
            <CBox mt={3}>
                <Typography className={classes.heading} >Title</Typography>
                <Typography className={classes.description} >{props?.subtaskDetail?.title}</Typography>
                <Divider />
            </CBox>
            <CBox mt={1.5}>
                <Typography className={classes.heading} >Project</Typography>
                <Typography className={classes.description} >{props?.subtaskDetail?.title}</Typography>
                <Divider />
            </CBox>
            <CBox mt={1.5}>
                <Typography className={classes.heading} >Assign to</Typography>
                <Typography className={classes.description}>

                    {membersList.map((member: Member, i: any) => {
                        if (i === membersList.length - 1) {
                            return (<> {<AssignedTag>{`${member.firstName} ${member.surName}`}</AssignedTag>} </>)
                        } else {
                            return (<>{<AssignedTag>{`${member.firstName} ${member.surName}, `} &nbsp;</AssignedTag>} </>)
                        }
                    })}
                </Typography>
                <Divider />
            </CBox>
            <CBox mt={1.5}>
                <Typography className={classes.heading}> Description </Typography>
                <Typography className={classes.description}>
                    {showMore ? props.subtaskDetail.description : `${props.subtaskDetail.description.substring(0, 550)}`}

                </Typography>
                {props.subtaskDetail.description.length >= 549 ?

                    <Typography className={classes.showHideBtn} onClick={() => setShowMore(!showMore)}>

                        {showMore ? 'show less' : 'show more'}
                    </Typography>
                    : ''}



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
        display: 'flex', fontSize: "12px", fontWeight: 600, color: '#000000', marginBottom: 5
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

    },
    showHideBtn: {
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Intel',
        color: '#5ba6da',
        '&:hover': {
            cursor: 'pointer'
        }
    }

})