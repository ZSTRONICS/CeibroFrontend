import { Box, MenuItem, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Heading = styled(Typography)(
  ({ theme }) => `
    font-family: Inter;
    font-weight: 700;
    font-size: 18px;
    `
);

const SubHeading = styled(Typography)(({ theme }) => ({
  color: "#0076C8",
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "20px",
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));

const DescriptionTag = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  fontWeight: 500,
  lineHeight: "20px",
  letterSpacing: "0em",
  color: "#131516",
  whiteSpace: "pre-wrap",

  [theme.breakpoints.down("md")]: {
    fontSize: 12,
  },
}));

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
  font-family: "Inter";
  color: #292929;
`;
export const CommentDescription = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  max-width: 431.72px;
  width: 100%;
  padding-bottom: 6px;
  padding-left: 4px;
  color: #494949;
`;
export const ListUserName = styled(Typography)`
  font-family: "Inter";
  text-transform: capitalize;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #292929;
`;
export const DocName = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700 !important;
  font-size: 12px !important;
  color: #292929 !important;
`;
const Span = styled("span")`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  color: black;
`;

const BoldLableTag = styled("span")`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  color: #605c5c;
`;
export const CLink = styled("a")`
  font-family: "Inter";
  font-style: normal;
`;
export const TopBarTitle = styled("div")`
  font-family: "Inter";
  font-style: normal;
  font-size: 30px;
  font-weight: 500;
`;
export const AddStatusTag = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  color: #adb5bd;
`;
export const SubHeadingTag = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-size: 14px !important;
  font-weight: 700 !important;
  color: #656565;
`;
export const ProjectAdminRoleTag = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;
export const RoleLabelTag = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-size: 14px;
  font-weight: 700;
  color: #656565;
`;
export const SubLabelTag = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-size: 12px !important;
  font-weight: 500 !important;
  color: #605c5c;
`;
export const ConfirmDescriptionTag = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-size: 13px;
  font-weight: 500;
  color: #605c5c;
`;
export const GroupMemberNameTag = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-size: 15px;
  font-weight: 500;
  color: #656565;
`;
export const EditMemberNameTag = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-size: 15px;
  font-weight: 600;
  color: #000000;
`;
export const DocumentNameTag = styled(Typography)`
  font-family: "Inter";
  font-style: medium;
  font-size: 14px;
  font-weight: 500;
  color: "#131516";
`;
export const EditMemberLabelTag = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-size: 12px;
  font-weight: 500;
  color: #7d7e80;
`;
const CustomStack = styled(Stack)`
  flex-direction: row;
  align-items: center;
`;

const BackToLoginTag = styled(Box)(({ theme }) => ({
  color: "#000000",
  fontFamily: "Inter",
  fontSize: 14,
  fontWeight: 500,
  textAlign: "center",
  position: "absolute",
  bottom: "6%",
  [theme.breakpoints.down("md")]: {
    position: "relative",
    textAlign: "center",
    marginTop: 20,
  },
}));

const MenuItemTag = styled(MenuItem)(({ theme }) => ({
  color: "#000000",
  fontFamily: "Inter",
  fontSize: 14,
  padding: "0 8px 0 8px",
  fontWeight: 500,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {},
}));
export {
  BackToLoginTag,
  BoldLableTag,
  CustomStack,
  DescriptionTag,
  MenuItemTag,
  Span,
  SubHeading
};

