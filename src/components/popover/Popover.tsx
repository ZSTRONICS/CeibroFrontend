import { makeStyles } from '@material-ui/core';
import Popover from '@mui/material/Popover';
import React from "react";



function CustomPopover(props: any) {
    const { id, open, anchorEl, handleClose, children } = props;
    const classes = useStyles();
    return (
        <div >
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                className={classes.mainBox}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                {children}
            </Popover>
        </div>
    )
}

export default CustomPopover;
const useStyles = makeStyles({
    mainBox: {

        '& .MuiPaper-root': {
            // top: '124px !important',
            left: '1388px !important',
            top: '70px !important',
            boxShadow: 'none',
            borderRadius: '4px 0px 0px'
        }
    },

});
