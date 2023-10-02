import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

interface CustomButtonProps extends ButtonProps {
  label?: string;
  icon?: ReactNode;
}

const CustomButton = ({ label, icon, ...rest }: CustomButtonProps) => {
  return (
    <Button
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center the icon horizontally
        p: "0px",
        textTransform: "capitalize",
        border: "none",
        "& .MuiButton-startIcon": {
          marginLeft: 0,
          marginRight: 0,
        },
      }}
      startIcon={icon ? icon : null}
      {...rest}
    >
      {label && (
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "16px",
            textAlign: "center",
          }}
        >
          {label}
        </Typography>
      )}
    </Button>
  );
};

export default CustomButton;
