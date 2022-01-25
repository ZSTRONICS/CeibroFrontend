import React from 'react'
import { makeStyles } from '@material-ui/core'
import InputHOC from './InputHOC'

interface DatePickerInt {
    onChange?: (e: any) => void;
    value?: any;
}

const DatePicker: React.FC<DatePickerInt> = (props) => {

    const classes = useStyles();

    const handleChange = (e: any) => {
        if(props.onChange) {
            props.onChange(e)
        }
    }

    return (
        <InputHOC title="Due Date">
            <input onChange={handleChange} value={props.value} className={classes.dateInput} type="date" />
        </InputHOC>
    )
}

export default DatePicker



const useStyles = makeStyles({
    dateInput: {
        border: 'none',
        background: 'transparent',
        flex: 3,
        '&:focus': {
            border: 'transparent'
        },
        '&:active': {
            border: 'transparent'
        },
        '&:focus-visible': {
            outline: 'transparent'
        }
    },
})
