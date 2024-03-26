import { Box, Typography } from "@mui/material";

interface IProps {
  text: string;
}

const StyledTypographyBox = ({ text }: IProps) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      marginLeft: "16px",
      marginTop: "6px",
    }}
  >
    <Typography
      sx={{
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "20px",
        color: "#000",
        overflowWrap: "anywhere",
      }}
    >
      {text}
    </Typography>
  </Box>
);

export default StyledTypographyBox;
