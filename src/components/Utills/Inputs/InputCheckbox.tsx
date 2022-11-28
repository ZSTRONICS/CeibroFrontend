import { FC, useState } from "react";
import "./inputText.css";
import { FormControlLabel, makeStyles } from "@material-ui/core";
import CustomCheckbox from "./Checkbox";

interface InputCheckboxInterface {
  checked: boolean;
  label?: string;
  onChange?: (e: boolean) => void;
}

const InputCheckbox: FC<InputCheckboxInterface> = (props) => {
  const { checked, label } = props;
  const classes = useStyles();
  const [check, setChecked] = useState<boolean>(checked);

  const toggle = () => {
    setChecked(!check);
  };

  const handleChange = (e: any) => {
    props.onChange?.(e.target?.checked);
  };

  return (
    <div style={{ width: "60%" }}>
      <FormControlLabel
        control={<CustomCheckbox checked={check} />}
        label={label}
        onClick={toggle}
        classes={{ label: classes.label }}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputCheckbox;

const useStyles = makeStyles({
  label: {
    fontSize: 12,
    fontWeight: 500,
  },
});
