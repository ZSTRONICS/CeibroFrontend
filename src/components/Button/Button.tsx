import React, { Fragment } from 'react'
import Button from '@mui/material/Button';
import PropTypes from "prop-types";

export default function CButton(props: any) {
    return (
        <Fragment>
            <Button disableRipple={true} {...props} type={props.type} autoFocus variant={props.variant} style={props.styles} className={props.className}>
                {props.label}
            </Button>
        </Fragment>
    )
}

CButton.propTypes={
    label: PropTypes.string.isRequired,
    variant:PropTypes.string,
    onClick:PropTypes.func,
    styles:PropTypes,
    type: PropTypes,
    className:PropTypes
  }
  