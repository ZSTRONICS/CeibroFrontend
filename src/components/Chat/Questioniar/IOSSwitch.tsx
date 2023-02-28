import * as React from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Typography } from "@material-ui/core";

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#FF0000" : "#009900",
        opacity: 1,
        border: 0,
      },
      //   '&.Mui-disabled + .MuiSwitch-track': {
      //     opacity: 0.5,
      //   },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
  "& .MuiTypography-root": {
    paddingLeft: 0,
    border: "1px solid",
  },
}));

export default function CustomizedSwitch(props: any) {
  const { onChange, label, disabled } = props;
  return (
    <FormControlLabel
      control={
        <IOSSwitch
          sx={{ m: 1 }}
          defaultChecked={false}
          onChange={onChange}
          disabled={disabled}
        />
      }
      label={
        <Typography style={{ fontSize: "12px", fontWeight: "500" }}>
          {label}
        </Typography>
      }
    />
  );
}
