import React, { Fragment } from 'react'
import Button from '@mui/material/Button';
import { styled } from "@mui/system";


export default function CButton(props: any) {
    return (
        <Fragment>
            <MButton startIcon={props.startIcon} endIcon={props.endIcon} disableRipple={true} {...props} type={props.type} autoFocus variant={props.variant} style={props.styles} className={props.className}>
                {props.label}
            </MButton>
        </Fragment>
    )
}

 const MButton = styled(Button)(
    ({ theme }) => `
      font-family: Inter;
      text-transform:capitalize;
      `
  );