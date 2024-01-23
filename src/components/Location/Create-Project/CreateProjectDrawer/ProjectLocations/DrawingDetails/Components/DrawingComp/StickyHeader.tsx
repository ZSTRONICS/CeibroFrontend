import { AppBar, styled } from "@mui/material";
import { Box } from "@mui/system";

interface HeaderProps {
  title: string;
  children: any;
}

function StickyHeader(props: HeaderProps) {
  return (
    <StyledAppBar position="static">
      <Box sx={{ width: "100%", p: 1, pb: 0.5 }}>{props.children} </Box>
    </StyledAppBar>
  );
}

export default StickyHeader;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  borderBottom: "1px solid #E2E4E5",
  color: "unset",
  background: "white",
}));