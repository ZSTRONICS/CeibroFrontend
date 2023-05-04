import React from 'react'
import { MenuItem, OutlinedInput, Select } from '@mui/material'


interface IProps {
    inputValue: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: {
        (e: React.FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    }
}

export const PhoneNumberTextField = (props: IProps) => {
    const { inputValue, onChange,onBlur } = props
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9\b]{0,11}$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            onChange(e);
        }
    };

    return (
        <OutlinedInput
            size="small"
            placeholder="Phone Number"
            sx={{
                paddingLeft: 0,
                width: "100%",
                maxWidth: 376
            }}
            value={inputValue}
            onChange={handleChange}
            onBlur={onBlur}
            inputMode='text'
            id="outlined-adornment-weight"
            startAdornment={
                <Select
                    size="small"
                    value={""}
                    sx={{ marginRight: "10px", borderRadius: "4px 0px 0px 4px" }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                >
                    <MenuItem value="">
                        <em>321</em>
                    </MenuItem><MenuItem value="">
                        <em>321</em>
                    </MenuItem>
                    {/* {codes.map((code) => {
              return code.countryCodes.map((cd) => {
                return <MenuItem value={cd}>{cd}</MenuItem>;
              });
            })} */}
                </Select>
            }
        />
    )
}