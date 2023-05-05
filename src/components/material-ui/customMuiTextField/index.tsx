import React from 'react'
import { MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { PhoneNumberTextField } from './phoneNumberTextField'
import { PasswordTextField } from './paaswordTextField'
import { SimpleTextField } from './simpleTextField'
import { IPhoneNumber, inputType } from './types'



interface IProps {
    inputValue: string | IPhoneNumber,
    onChange: (e: React.ChangeEvent<HTMLInputElement>| SelectChangeEvent<unknown>) => void
    onBlur?: {
        (e: React.FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    }
    textType?: inputType,
}

export const CustomMuiTextField = (props: IProps) => {
    const { textType, onChange, inputValue = "", onBlur } = props
    {
        switch (textType) {
            case "phone-number":
                return <PhoneNumberTextField onChange={onChange} inputValue={inputValue as IPhoneNumber} onBlur={onBlur} />
            case "password":
                return <PasswordTextField password={inputValue as string} onChange={onChange} onBlur={onBlur} />
            default:
                return <SimpleTextField onChange={onChange} inputValue={inputValue as string} onBlur={onBlur}/>
        }
    }


}