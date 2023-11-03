import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

interface ReadMoreWrapperProps {
  title: string;
  readMore?: boolean;
  count?: number;
  children?: JSX.Element | JSX.Element[];
}

const ReadMoreWrapper = ({
  title,
  readMore = false,
  count = 3,
  children,
}: ReadMoreWrapperProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "16px 8px 16px 8px",
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
            mt: 1,
            width: "85px",
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
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
            {children??<>NA</>}
          </Box>
          {count && (
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#0076C8",
                  paddingRight: "4px",
                }}
              >
                +{count}
              </Box>
              <IconButton
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{ height: "24px", width: "24px" }}
              >
                {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      {readMore&&<Box
        sx={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "end",
          fontFamily: "Inter",
          fontSize: "12px",
          fontWeight: "400",
          color: "#0076C8",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "View less" : "View more"}
      </Box>}
    </Box>
  );
};

export default ReadMoreWrapper;
