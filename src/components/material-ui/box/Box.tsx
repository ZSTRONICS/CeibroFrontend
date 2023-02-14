import React from 'react'
import Box from '@mui/material/Box';
import { styled } from "@mui/system";

export function CBox(props: any) {
    return (
        <MBox {...props} />
    )
}

const MBox = styled(Box)(
    ({ theme }) => `
      font-family: Inter;
      `
  );