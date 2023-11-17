import { Box } from "@mui/material";

interface IProps {
  src: string;
}
export default function ImageBox({ src }: IProps) {
  return (
    <Box>
      <img
        className="myDIV"
        loading="lazy"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "8px",
          objectFit:'contain'
        }}
        src={src}
        alt="images"
      />
    </Box>
  );
}
