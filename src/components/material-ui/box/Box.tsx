import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export function CBox(props: any) {
  return <MBox {...props} />;
}

const MBox = styled(Box)(
  ({ theme }) => `
      font-family: Inter;
      `
);
