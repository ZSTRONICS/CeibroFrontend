import React from 'react'
import { MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { PhoneNumberTextField } from './phoneNumberTextField'
import { PasswordTextField } from './paaswordTextField'
import { SimpleTextField } from './simpleTextField'

type inputType = "phone-number" | "email" | "password" | "regular"

interface IProps {
    inputValue: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: {
        (e: React.FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    }
    textType?: inputType,
}

export const CustomMuiTextField = (props: IProps) => {
    const { textType, onChange, inputValue = "", onBlur } = props
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9\b]{0,11}$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            onChange(e);
        }
    };

    {
        switch (textType) {
            case "phone-number":
                return <PhoneNumberTextField onChange={onChange} inputValue={inputValue} onBlur={onBlur} />
            case "password":
                return <PasswordTextField password={inputValue} onChange={onChange} onBlur={onBlur} />
            default:
                return <SimpleTextField onChange={onChange} inputValue={inputValue} onBlur={onBlur}/>
        }
    }


}