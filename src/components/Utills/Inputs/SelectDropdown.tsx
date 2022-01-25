import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core'
import InputHOC from './InputHOC'
import Select from 'react-select'
import chroma from 'chroma-js'
import colors from '../../../assets/colors'
import { handleInputChange } from 'react-select/src/utils'

const options = [
    { value: 'All', label: 'All', color: 'green' },
    { value: 'Project1', label: 'Project 1', color: 'yellow' },
    { value: 'Project2', label: 'Project 2', color: 'brown' }
  ]

export interface dataInterface {
  value: string;
  label: string;
  color?: string;
}

interface My {
    title: string;
    data?: dataInterface[];
    value?: any;
    isMulti?: boolean;
    placeholder?: string;
    handleChange?: null | ((e: any) => void);
}

const SelectDropdown: FC<My> = (props) => {

    const classes = useStyles()
    let myOptions: any = props.data || options;
    console.log('my optins ar', myOptions)
    const { value, isMulti, placeholder } = props

      const colourStyles = {
        control: (styles: any) => ({ 
            ...styles, 
            backgroundColor: 'white', 
            border: 0,
            // This line disable the blue border
            boxShadow: "none",
            flex: 2 
        }),
        option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
          const color = chroma(data.color || colors.darkYellow);
          return {
            ...styles,
            backgroundColor: isDisabled
              ? null
              : isSelected
              ? colors.darkYellow
              : isFocused
              ? color.alpha(0.1).css()
              : null,
            color: isDisabled
              ? '#ccc'
              : isSelected
              ? chroma.contrast(color, 'white') > 2
                ? 'white'
                : 'black'
              : colors.black,
            cursor: isDisabled ? 'not-allowed' : 'default',
      
            ':active': {
              ...styles[':active'],
              backgroundColor:
                !isDisabled && (isSelected ? colors.darkYellow : color.alpha(0.3).css()),
            },
          };
        },
        multiValue: (styles:any, { data }:any) => {
          const color = chroma(colors.darkYellow);
          return {
            ...styles,
            backgroundColor: colors.darkYellow,
          };
        },
        multiValueLabel: (styles: any, { data }:any) => ({
          ...styles,
          color: colors.black,
        }),
        multiValueRemove: (styles: any, { data }:any) => ({
          ...styles,
          color: colors.white,
          cusor: 'pointer',
          ':hover': {
            backgroundColor: colors.darkYellow,
            color: colors.white,
            cusor: 'pointer',
          },
        }),
      };

  
    const handleChange = (e:any) => {
        props.handleChange?.(e);
    }


    return (
        <InputHOC title={props.title}>
            <div className={classes.select}>
                <Select 
                  placeholder={placeholder || "Select"} 
                  isMulti={isMulti || false} 
                  onChange={handleChange} 
                  options={myOptions} 
                  styles={colourStyles}
                  value={value} 
                />
            </div>
        </InputHOC>
    )
}

export default SelectDropdown



const useStyles = makeStyles({
    dropdown: {
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
    select: {
        flex: 3,
        zIndex: 2
    }
})
