import React, { Fragment } from 'react'
import Button from '@mui/material/Button';

export default function CButton(props: any) {
    return (
        <Fragment>
            <Button {...props} type={props.type} autoFocus variant={props.variant} style={props.styles} className={props.className}>
                {props.label}
            </Button>
        </Fragment>
    )
}