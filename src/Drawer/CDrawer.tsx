import { Drawer, makeStyles } from '@material-ui/core';
import PropTypes from "prop-types";

export default function CDrawer(props: any) {
  const classes = useStyles()
  return (
    <>
      <Drawer anchor="right"
        className={`${props.showBoxShadow&&classes.outerWrapper}`}
        elevation={props.showBoxShadow&&0}
        hideBackdrop={props.hideBackDrop}
        open={props.openCDrawer}
        onClose={props.handleCloseCDrawer}
      >
      {props.children}
      </Drawer>
    </>
  );
}

CDrawer.propTypes = {
  handleCloseCDrawer: PropTypes.func,
  openCDrawer: PropTypes.bool,
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