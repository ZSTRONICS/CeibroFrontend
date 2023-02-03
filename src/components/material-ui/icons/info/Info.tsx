import React from 'react'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function InfoIcon(props:SvgIconProps|any) {
    return (
            <SvgIcon width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
                <path d="M9.08337 5.41671H10.9167V7.25004H9.08337V5.41671ZM9.08337 9.08337H10.9167V14.5834H9.08337V9.08337ZM10 0.833374C4.94004 0.833374 0.833374 4.94004 0.833374 10C0.833374 15.06 4.94004 19.1667 10 19.1667C15.06 19.1667 19.1667 15.06 19.1667 10C19.1667 4.94004 15.06 0.833374 10 0.833374ZM10 17.3334C5.95754 17.3334 2.66671 14.0425 2.66671 10C2.66671 5.95754 5.95754 2.66671 10 2.66671C14.0425 2.66671 17.3334 5.95754 17.3334 10C17.3334 14.0425 14.0425 17.3334 10 17.3334Z" fill={props.color||"#0076C8"} />
            </SvgIcon>
    )
}
