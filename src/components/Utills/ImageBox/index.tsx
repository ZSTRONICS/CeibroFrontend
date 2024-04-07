import { Box } from "@mui/material";

interface IProps {
  src: string;
  handleClick?: () => void;
  type?: string;
  TaskDetails?: boolean;
  isCommentcard?: boolean;
}
export default function ImageBox({
  src,
  handleClick,
  type,
  TaskDetails,
  isCommentcard,
}: IProps) {
  const ImgWidth = isCommentcard ? "70px" : TaskDetails ? "80px" : "150px";
  const ImgHeight = isCommentcard ? "70px" : TaskDetails ? "80px" : "150px";

  return (
    <Box
      onClick={() => handleClick && handleClick()}
      sx={{
        mt: `${type === "imageWithDesp" ? "7px" : "unset"}`,
        "&:hover": {
          cursor: "pointer",
        },
        borderRadius: "8px",
        border: "1px solid #E2E4E5",
      }}
    >
      <img
        className="myDIV"
        loading="lazy"
        style={{
          width: ImgWidth,
          height: ImgHeight,
          borderRadius: "8px",
          objectFit: TaskDetails ? "cover" : "contain",
        }}
        src={src}
        alt="images"
      />
    </Box>
  );
}
