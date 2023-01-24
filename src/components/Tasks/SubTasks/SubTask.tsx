import React from 'react'
import DatePicker from '../../Utills/Inputs/DatePicker'
import SelectDropdown from '../../Utills/Inputs/SelectDropdown'
import { Grid, makeStyles } from '@material-ui/core'
import { getAllStatus, getColorByStatus } from '../../../config/project.config'
import StatusMenu from '../../Utills/Others/StatusMenu'

const SubTask = () => {

    const classes = useStyles()

    //const allStatus = getAllStatus()

    return (
        <Grid key="subtask-component" item xs={12}>
            <Grid container>
                <Grid item xs={12} md={3} className={classes.datePicker}>
                    <DatePicker/>
                </Grid>

                <Grid item xs={12} md={4} className={classes.datePicker}>
                    <SelectDropdown title="Assigned to" />
                </Grid>

                <Grid item xs={12} md={4} className={classes.datePicker}>
                    <SelectDropdown title="Projects" />
                </Grid>
            </Grid>

            <Grid container className={classes.allStatus}>
                <StatusMenu
                />
            </Grid>

            {/* <SubTaskList/> */}
        </Grid>
    )
}

export default SubTask

const useStyles = makeStyles({
    datePicker: {
        padding: 5
    },
    allStatus: {
        paddingLeft: 5
    },
    statusChip: {
        padding: "10px 10px",
        width: 100,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    assigned: {
        background: getColorByStatus('assigned')
    },
    accepted: {
        background: getColorByStatus('accepted')
    },
    ongoing: {
        background: getColorByStatus('ongoing')
    },
    done: {
        background: getColorByStatus('done')
    },
    draft: {
        background: getColorByStatus('draft')
    },
    approved: {
        background: getColorByStatus('approved')
    },


})
