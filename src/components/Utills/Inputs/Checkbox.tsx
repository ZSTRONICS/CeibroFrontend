import { Checkbox, CheckboxProps } from "@mui/material";

const CustomCheckbox = (props:CheckboxProps) =>{
  return <Checkbox color="primary" {...props} disableRipple sx={{
    '&.MuiCheckbox-root':{
      color: '#ADB5BD'
    },
    '&.Mui-checked':{
      color: '#1976d2'
    }
  }}/>
}

export default CustomCheckbox;