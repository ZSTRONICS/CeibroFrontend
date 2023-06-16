import { Divider } from '@material-ui/core'
import { CBox } from 'components/material-ui'
import React from 'react'

export default function CenterDivider(props: any) {
    return (
        <div>
            <CBox position='relative'>
                <CBox position='absolute' top='-11px' left='50%' fontSize={14}>
                    {props.label}
                </CBox>
                <Divider />

            </CBox>
        </div>
    )
}
