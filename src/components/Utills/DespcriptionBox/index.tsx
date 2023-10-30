import { Box, Typography } from "@mui/material";

interface IProps {
  description: string;
}

const DespcriptionBox = ({ description }: IProps) => (
  <Box
    sx={{
      width: "100%",
      padding: "14px 0px 14px 0px",
      gap: 1,
    }}
  >
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "top",
      }}
    >
      <Box
        sx={{
          mt: 1,
          width: "85px",
          height: "20px",
          pr: "87px",
          gap: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#605c5c",
          }}
        >
          Description
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          px: "11px",
          borderLeft: "1.9px solid #818181",
          maxWidth: "95%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontWeight: 500,
            fontSize: "14px",
            color: "#000",
            paddingTop: "5px",
            wordWrap: "break-word",
            // hyphens: "auto",
            // MozHyphens: "auto",
            // msHyphens: "auto",
          }}
        >
          {description === "" ? "N/A" : description}
        </p>
      </Box>
    </Box>
  </Box>
);

export default DespcriptionBox;
