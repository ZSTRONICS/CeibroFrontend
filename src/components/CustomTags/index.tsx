import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Heading = styled(Typography)(
  ({ theme }) => `
    font-family: Inter;
    font-weight: 700;
    font-size: 18px;
    `
);
export const CommentName = styled(Typography)(
  ({ theme }) => `
    font-weight: 700;
    font-size: 13px;
    `
);
export const CommentDateTime = styled(Typography)`
  font-weight: 500;
  font-size: 8px;
`;
export const CommentDescription = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  max-width: 431.72px;
  width: 100%;
  padding-bottom:6px;
  padding-left:4px;
  color:#494949;
`;
export const ListUserName = styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 16px;
color: #000000;
`;
