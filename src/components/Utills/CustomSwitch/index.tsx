import { Box, Typography, Switch } from "@mui/material";
import { CreateNewTaskFormType } from "components/Tasks/type";
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
      <Typography>{label}</Typography>
      <Switch
        sx={
          {
            // "& .MuiSwitch-switchBase": {
            //   "&.Mui-checked": {
            //     color: "#fff",
            //     "& + .MuiSwitch-track": {
            //       opacity: 0.9,
            //       backgroundColor: "green",
            //     },
            //   },
            // },
          }
        }
        checked={toggle}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
};

export default CustomSwitch;
