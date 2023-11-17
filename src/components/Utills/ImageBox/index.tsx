import { Box } from "@mui/material";

interface IProps {
  src: string;
}
export default function ImageBox({ src }: IProps) {
  return (
    <Box
      sx={
        {
          // maxWidth: "150px",
          // maxHeight: "150px",
          // width: "150px",
          // height: "150px",
        }
      }
    >
      <img
        className="myDIV"
        loading="lazy"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "8px",
        }}
        src={src}
        alt="images"
      />
      {/* <a
        className="hide"
        href={src}
        download
        style={{ color: "unset", position: "absolute", top: 0, right: ".5%" }}
      >
        <FileDownloadIcon />
      </a> */}
    </Box>
  );
}
