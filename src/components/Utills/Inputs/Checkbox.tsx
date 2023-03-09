import { Checkbox, CheckboxProps } from "@mui/material";

const CustomCheckbox = (props:CheckboxProps) =>{
  return <Checkbox color="primary" {...props} disableRipple sx={{
    '&.MuiCheckbox-root':{
      color: '#ADB5BD'
    },
    '&.Mui-checked':{
      color: '#F1B740'
    }
  }}/>
}

export default CustomCheckbox;