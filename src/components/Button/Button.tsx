import React from "react";
import { Button, CircularProgress, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean | undefined;
}
export default function CButton(props: any) {
  return (
    <MButton
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      disableRipple={true}
      {...props}
      type={props.type}
      autoFocus
      variant={props.variant}
      style={props.styles}
      className={props.className}
    >
      {props.label}
    </MButton>
  );
}

// loadingBtn
export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <MButton {...props} disabled={loading}>
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
