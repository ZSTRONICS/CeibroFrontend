import { CircularProgress } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

interface CustomButtonProps extends ButtonProps {
  label?: string;
  icon?: ReactNode;
  loading?: boolean;
}

const CustomButton = ({ label, loading, icon, ...rest }: CustomButtonProps) => {
  return (
    <Button
      id="loadingButton"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "0px",
        textTransform: "capitalize",
        border: "none",
        "& .MuiButtonBase-root .MuiButton-root :hover": {
          backgroundColor: "red",
        },
        "& .MuiButton-startIcon": {
          m: 0,
        },
      }}
      startIcon={icon && !loading ? icon : null}
      {...rest}
    >
      {" "}
      {loading ? (
        <CircularProgress size={20} />
      ) : (
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
