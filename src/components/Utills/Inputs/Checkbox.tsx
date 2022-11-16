import { Checkbox, CheckboxProps, makeStyles } from "@material-ui/core";
import colors from "../../../assets/colors";

const CustomCheckbox = (props:CheckboxProps) =>{
  const classes = useStyles();
  return <Checkbox color="default" {...props} className={classes.rootCheckboxStyle}/>
}

export default CustomCheckbox;

const useStyles = makeStyles({
  rootCheckboxStyle: {
    color: colors.darkYellow,
    "&$checked": {
      color: colors.darkYellow,
    },
    width: 16,
    height: 16,
    padding: 5,
  },
});
