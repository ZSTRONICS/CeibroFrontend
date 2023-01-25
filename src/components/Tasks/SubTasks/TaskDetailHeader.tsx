import { Divider, Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core'
import CButton from 'components/Button/Button'
import { CBox } from 'components/material-ui'
import { TaskStatus } from 'components/TaskComponent/Tabs/TaskCard'

export default function TaskDetailHeader() {
    const classes = useStyles()

    return (
        <>
            <CBox display='flex' alignItems='center' justifyContent='space-between'>
                <CBox flex='1 1 0' display='flex' alignItems='center' >
                    {/* <Typography >Draft</Typography>  */}
                    <TaskStatus className={classes.status}>Draft</TaskStatus>

                    <Typography style={{ fontSize: "11px", color: '#7D7E80' }}>
                        Due Date
                    </Typography>
                    &nbsp;
                    <Typography style={{ fontSize: "11px", fontWeight: 600 }}>
                        11.02.2021
                        {/* {subTaskDate} */}
                    </Typography>
                </CBox>
                <CBox flex='1 1 0' display='flex' justifyContent='flex-end'>
                    <CButton label='close' variant='outlined' />
                </CBox>

            </CBox>
            <CBox mt={3}>
                <Typography className={classes.heading} >Title</Typography>
                <Typography className={classes.description} >Magnis dis parturient montes, nascetur Aenean eu leo quam. Pellentesque ornare </Typography>
                <Divider />
            </CBox>
            <CBox mt={1.5}>
                <Typography className={classes.heading} >Project</Typography>
                <Typography className={classes.description} >Paevälja 112-6</Typography>
                <Divider />
            </CBox>
            <CBox mt={1.5}>
                <Typography className={classes.heading} >Assign to</Typography>
                <Typography className={classes.description} >Kristo Vunukainen,Kristo Vunukainen,Kristo Vunukainen,Kristo Vunukainen,Kristo Vunukainen,</Typography>
                <Divider />
            </CBox>
            <CBox mt={1.5}>
                <Typography className={classes.heading} >Description</Typography>
                <Typography className={classes.description} >Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum.Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum.</Typography>
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