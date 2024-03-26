import { makeStyles, withStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import NativeSelect from "@material-ui/core/NativeSelect";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    height: 18,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 14,
    fontWeight: 500,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: "Inter",
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    width: "100%",
  },
}));

const defaultOptions = [
  {
    title: "Microsoft",
    value: "microsoft",
  },
  {
    title: "Amazon",
    value: "amzon",
  },
  {
    title: "Facebook",
    value: "facebook",
  },
];

export default function CustomizedSelects(props) {
  const classes = useStyles();
  const {
    placeholder,
    options = defaultOptions,
    selectedValue,
    handleValueChange,
    handleDisabled,
    showDisabled,
  } = props;

  const handleChange = (event) => {
    props.handleValueChange?.(event.target.value);
  };

  return (
    <FormControl className={classes.margin}>
      <NativeSelect
        id="demo-customized-select-native"
        value={selectedValue}
        onChange={handleChange}
        placeholder={placeholder}
        input={<BootstrapInput />}
        disabled={handleDisabled}
      >
        {showDisabled && <option value="" selected disabled></option>}
        {options &&
          options.map((option) => {
            return (
              <option selected={option.selected} value={option.value}>
                {option.title}
              </option>
            );
          })}
      </NativeSelect>
    </FormControl>
  );
}
