import React, { useState } from 'react'
import { IconButton, InputAdornment, MenuItem, OutlinedInput, Select } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'


interface IProps {
    password: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: {
        (e: React.FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    }
}

export const PasswordTextField = (props: IProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const { password, onChange,onBlur } = props

    return (
        <OutlinedInput
            placeholder={"Password"}
            type={showPassword ? "text" : "password"}
            sx={{
                width: "100%",
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
            value={password}
            onChange={onChange}
            onBlur={onBlur}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }
        />
    )
}


