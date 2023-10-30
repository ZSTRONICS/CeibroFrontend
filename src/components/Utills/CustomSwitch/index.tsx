import { Box, Switch, Typography } from "@mui/material";
import { ChangeEvent } from "react";

interface CustomSwitchProps {
  label: string;
  toggle: boolean;
  handleChange:
    | ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
}
const CustomSwitch = (props: CustomSwitchProps) => {
  const { label, handleChange, toggle } = props;

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      justifyContent="space-between"
    >
      <Typography
        sx={{
          fontFamily: "Inter",
          fontSize: "14px",
          fontWeight: 500,
          color: "black",
        }}
      >
        {label}
      </Typography>
      <Switch
        sx={{
          fontFamily: "Inter",
          width: "42px",
          height: "27px",
          padding: 0,
          "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: "3px 2px",
            transitionDuration: "300ms",
            "&.Mui-checked": {
              transform: "translateX(16px)",
              color: "#fff",
              "& + .MuiSwitch-track": {
                backgroundColor: "#1A8718",
                opacity: 1,
                border: 0,
              },
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 0.3,
            },
          },
          "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 21,
            height: 21,
          },
          "& .MuiSwitch-track": {
            borderRadius: 26 / 2,
            backgroundColor: "#9f9c9cfc",
            opacity: 1,
          },
        }}
        checked={toggle}
        disableRipple
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
};

export default CustomSwitch;
