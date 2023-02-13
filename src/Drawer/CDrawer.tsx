import { Drawer } from '@material-ui/core';
import PropTypes from "prop-types";

export default function CDrawer(props: any) {

  return (
    <>
      <Drawer anchor="right"
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
  children: PropTypes.any
};