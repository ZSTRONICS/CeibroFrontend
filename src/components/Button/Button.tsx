import React from "react";
import { Button, CircularProgress, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean | undefined;
}
interface CButtonProps extends ButtonProps {
  label: string;
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
    <MButton {...props} disabled={loading} disableRipple={true}>
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
