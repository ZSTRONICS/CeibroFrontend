import React, { useState } from 'react'
import { MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import dialCode from './dialCode.json'
import { IPhoneNumber } from './types'


interface IProps {
    inputValue: IPhoneNumber,
    onChange: (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<unknown>) => void
    onBlur?: {
        (e: React.FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    }
}

export const PhoneNumberTextField = (props: IProps) => {
    const { inputValue, onChange, onBlur } = props
    const [dailCode, setDailCode] = useState<string>("+92")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9\b]{0,11}$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            onChange(e);
        }
    };
    const handleCountryCodeChange = (event: SelectChangeEvent<unknown>) => {
        setDailCode(event.target.value as string)
        onChange(event);
    };

    return (
        <OutlinedInput
            name="phoneNumber"
            size="small"
            placeholder="Phone Number"
            sx={{
                paddingLeft: 0,
                width: "100%",
            }}
            value={inputValue.phoneNumber}
            onChange={handleChange}
            onBlur={onBlur}
            inputMode='text'
            id="outlined-adornment-weight"
            startAdornment={
                <Select
                    size="small"
                    value={inputValue.dialCode}
                    name='dialCode'
                    sx={{ marginRight: "10px", borderRadius: "4px 0px 0px 4px" }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={handleCountryCodeChange}
                >
                    {dialCode.map((code) => {
                        return <MenuItem value={code.dial_code}>{code.dial_code}</MenuItem>;
                    })}
                </Select>
            }
        />
    )
}