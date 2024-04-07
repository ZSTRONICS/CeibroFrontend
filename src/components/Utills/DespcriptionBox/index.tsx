import { Box, Typography } from "@mui/material";

interface IProps {
  description: string;
  title:string;
  titleWidth?:string
  despFontSize?:string
  despFontWeight?:string|number
}

const DespcriptionBox = ({ description,title,titleWidth,despFontSize,despFontWeight }: IProps) => (
  <Box
    sx={{
      padding: "8px 0px 8px 0px",
      gap: 1,
    }}
  >
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          minWidth: titleWidth??'83px',
          height: "20px",
          gap: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#605c5c",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          // width: "100%",
          px: "11px",
          borderLeft: "1.9px solid #818181",
          maxWidth: "95%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontWeight: despFontWeight??500,
            fontSize: despFontSize??"12px",
            color: "#000",
            wordWrap: "break-word",
          }}
        >
          {description === "" ? "N/A" : description}
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default DespcriptionBox;
