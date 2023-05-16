import { Stack, Typography } from "@mui/material";
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
export const CDateTime = styled(Typography)`
  font-weight: 600;
  font-size: 11px;
`;
export const FileName = styled(Typography)`
  font-weight: 700;
  font-size: 12px;
  font-family: 'Inter';
  color: #292929;
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
text-transform: capitalize;
font-style: normal;
font-weight: 600;
font-size: 16px;
color: #292929; 
`;
export const DocName = styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
color: #292929;
`;
export const Span=styled('span')`
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 10px;
color: #605C5C;
`
export const CLink=styled('a')`
font-family: 'Inter';
font-style: normal;
`
export const TopBarTitle=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-size: 30px;
font-weight: 500;
`
export const AddStatusTag=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-size: 14px;
font-weight: 500;
color:#ADB5BD;
`
export const SubHeadingTag=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-size: 14px;
font-weight: 700;
color:#656565;
`
export const ProjectAdminRoleTag=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-size: 16px;
font-weight: 600;
color:#000000;
`
export const RoleLabelTag=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-size: 14px;
font-weight: 700;
color:#656565;
`
export const SubLabelTag=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-size: 12px;
font-weight: 500;
color:#605C5C;
`
export const ConfirmDescriptionTag=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-size: 13px;
font-weight: 500;
color:#605C5C;
`
export const GroupMemberNameTag=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-size: 15px;
font-weight: 500;
color:#656565;
`
export const EditMemberNameTag=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-size: 15px;
font-weight: 600;
color:#000000;
`
export const DocumentNameTag=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-size: 14px;
font-weight: 500;
line-height:20px;
color:#000000;
`
export const EditMemberLabelTag=styled(Typography)`
font-family: 'Inter';
font-style: normal;
font-size: 12px;
font-weight: 500;
color:#7D7E80;
`
export const CustomStack = styled(Stack)`
  flex-direction: row;
  align-items: center;
`;
