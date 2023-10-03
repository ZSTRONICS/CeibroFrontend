import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean | undefined;
}
interface CButtonProps extends ButtonProps {
  label: string | any;
}

const CButton = (props: CButtonProps) => {
  return (
    <MButton
      disableRipple={true}
      {...props}
      autoFocus
      elevation={0}
      className={props.className}
    >
      {props.label}
    </MButton>
  );
};

// loadingBtn
const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <MButton {...props} disableRipple={true}>
      {loading ? <CircularProgress size={20} /> : children}
    </MButton>
  );
};

const MButton = styled<any>(Button)(
  ({ theme }) => `
      font-family: Inter;
      text-transform:capitalize;
      `
);

export { CButton, LoadingButton };
