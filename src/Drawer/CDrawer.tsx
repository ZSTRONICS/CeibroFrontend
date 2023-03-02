import { Drawer, makeStyles } from '@material-ui/core';
import PropTypes from "prop-types";

export default function CDrawer(props: any) {
  const classes = useStyles()
  return (
    <>
      <Drawer {...props} anchor="right"
        className={`${props.showBoxShadow&&classes.outerWrapper}`}
        elevation={props.showBoxShadow&&0}
        hideBackdrop={props.hideBackDrop}
        open={props.opencdrawer}
        onClose={props.handleclosecdrawer}
      >
      {props.children}
      </Drawer>
    </>
  );
}

CDrawer.propTypes = {
  handleclosecdrawer: PropTypes.func,
  opencdrawer: PropTypes.bool,
  children: PropTypes.any,
  showBoxShadow:PropTypes.bool,
  hideBackDrop:PropTypes.bool
};


const useStyles = makeStyles({
  outerWrapper: {
    '& .MuiDrawer-paper':{
      overflowY:'unset',
    },
      maxWidth: 500,
  }
})