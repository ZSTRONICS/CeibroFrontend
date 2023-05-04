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

export const SimpleTextField = (props: IProps) => {
    const { inputValue, onChange,onBlur } = props
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9\b]{0,11}$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            onChange(e);
        }
    };

    return (
        <OutlinedInput
                    placeholder={"auth.Password"}
                    sx={{
                        width: "100%",
                        maxWidth: 376,
                        position: 'relative',
                        '& .MuiIconButton-edgeEnd': {

                            position: 'absolute',
                            right: 10,
                            zIndex: 999,
                            marginleft: 31,

                        },
                        '& .MuiInputAdornment-positionEnd': {
                            marginLeft: '0px !important'
                        }
                    }}
                    name="password"
                    inputProps={{
                        style: { height: 12, width: "100%" },
                    }}
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={onBlur}

                />
    )
}