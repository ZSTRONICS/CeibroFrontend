import { Box } from "@mui/material";

interface IProps {
  src: string;
  handleClick?: () => void;
  type?: string;
  TaskDetails?: boolean;
}
export default function ImageBox({
  src,
  handleClick,
  type,
  TaskDetails,
}: IProps) {
  return (
    <Box
      onClick={() => handleClick && handleClick()}
      sx={{
        mt: `${type === "imageWithDesp" ? "7px" : "unset"}`,
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <img
        className="myDIV"
        loading="lazy"
        style={{
          width: TaskDetails ? "80px" : "150px",
          height: TaskDetails ? "80px" : "150px",
          borderRadius: "8px",
          objectFit: TaskDetails ? "cover" : "contain",
        }}
        src={src}
        alt="images"
      />
    </Box>
  );
}
