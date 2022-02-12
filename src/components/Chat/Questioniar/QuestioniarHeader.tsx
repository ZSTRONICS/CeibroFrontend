import React from 'react'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GrClose } from 'react-icons/gr'
import { useDispatch } from 'react-redux';
import colors from '../../../assets/colors';
import { closeQuestioniarDrawer } from '../../../redux/action/chat.action';

const ProjectDrawerHeader = () => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeQuestioniarDrawer());
    }

    return (
        <div className={classes.drawerHeader}>
            <div className={classes.headerTitleWrapper}>
                <Typography className={classes.headerTitle}>
                    Questionarie
                </Typography>
            </div>
            <div className={classes.headerIcons} onClick={handleClose}>
                <Typography>
                    Close
                </Typography>
                <GrClose className={classes.icon} /> 
            </div>
        </div>
    )
}

export default ProjectDrawerHeader;

const useStyles = makeStyles({
    drawerHeader: {
        backgroundColor: colors.white,
        height: 80,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    headerTitleWrapper: {
    },
    headerTitle: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 24,
    },
    headerIcons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: colors.primary,
        cursor: 'pointer'
    },
    icon: {
        fontSize: 15,
        color: 'red',
        paddingLeft: 5
    }
})
