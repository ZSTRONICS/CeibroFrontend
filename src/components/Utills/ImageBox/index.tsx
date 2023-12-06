import { Box } from "@mui/material";

interface IProps {
  src: string;
  handleClick?: () => void;
}
export default function ImageBox({ src, handleClick }: IProps) {
  return (
    <Box
      onClick={() => handleClick && handleClick()}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <img
        className="myDIV"
        loading="lazy"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "8px",
          objectFit: "contain",
        }}
        src={src}
        alt="images"
      />
    </Box>
  );
}
