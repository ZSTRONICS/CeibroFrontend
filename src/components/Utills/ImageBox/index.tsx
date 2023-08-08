import { Box } from "@mui/system";

interface IProps {
  src: string;
}
export default function ImageBox({ src }: IProps) {
  return (
    <Box>
      <img
        style={{
          height: "80px",
          width: "80px",
          borderRadius: "8px",
        }}
        src={src}
      />
    </Box>
  );
}
