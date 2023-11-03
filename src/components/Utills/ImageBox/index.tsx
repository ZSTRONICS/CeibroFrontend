import { Box } from "@mui/system";

interface IProps {
  src: string;
}
export default function ImageBox({ src }: IProps) {
  return (
    <Box>
      <img
        style={{
          height: "150px",
          width: "150px",
          borderRadius: "8px",
        }}
        src={src}
      />
    </Box>
  );
}
