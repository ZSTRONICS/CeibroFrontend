import { makeStyles } from "@material-ui/core";
import Popover from '@mui/material/Popover';
import React from "react";



function CustomPopover(props: any) {
    const { ButtonId, openGroup, children } = props;
    const classes = useStyles();
    return (
        <>
            <Popover
                className={classes.outerGroupWrapper}
                id={ButtonId}
                // anchorReference={groupEl}
                open={openGroup}
                // anchorEl={groupEl}
                // onClose={handleGroupClose}
                anchorOrigin={{
                    vertical: 90,
                    horizontal: "right",
                }}
            >
                {children}
            </Popover>
        </>
    )
}

export default CustomPopover;
const useStyles = makeStyles({
    outerGroupWrapper: {

    },

});
