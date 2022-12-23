import { IconButton, makeStyles } from '@material-ui/core';
import Popover from '@mui/material/Popover';
import { CBox } from 'components/material-ui';
import React from "react";
import assets from '../../assets/assets'



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
            borderRadius: '4px 0px 0px',
            // '&:after': {
            //     content: '"."',
            //     display: 'block',
            //     position: 'absolute',
            //     zIndex: 1,
            //     color: '#605C5C',
            //     top: '-3px',
            //     width: '77%',
            //     left: '66px',
            //     // left: '0px',
            //     // right: '65px',
            //     height: '2px',


            // },
        }
    },

});
