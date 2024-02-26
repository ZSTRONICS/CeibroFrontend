import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import ImageCardWithComment from "components/Location/LocationImageDetails/ImageCardWithComment";
import ImageBox from ".";

interface ImageUploadProps {
  selectedImages: File[];
  onClearFile: (file: any, type: string) => void;
  isComment?: boolean;
  imgwithcomment?: boolean;
}

function ImagesToUpload(props: ImageUploadProps) {
  const {
    onClearFile,
    selectedImages,
    isComment = false,
    imgwithcomment,
  } = props;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: imgwithcomment ? "space-between" : null,
          flexDirection: imgwithcomment ? "row" : null,
          mt: 1,
          mb: 2,
          gap: 5,
        }}
      >
        {imgwithcomment ? null : (
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "12px",
              color: "#605C5C",
              // pr: 1.2,
            }}
          >
            Images
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            columnGap: "16px",
            padding: "8px 8px 8px 16px",
            overflow: "auto",
            borderLeft: imgwithcomment ? null : "1.9px solid #818181",
            "&::-webkit-scrollbar": {
              height: "0.4rem",
            },
            "&::-webkit-scrollbar-track": {
              WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              borderRadius: "0.2rem",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
            },
          }}
        >
          {selectedImages.map((file, i) => {
            return (
              <Box
                key={i}
                sx={{
                  position: "relative",
                }}
              >
                {imgwithcomment ? (
                  <ImageCardWithComment img={URL.createObjectURL(file)} />
                ) : isComment ? (
                  <img
                    className="myDIV"
                    loading="lazy"
                    style={{
                      height: "90px",
                      width: "90px",
                      borderRadius: "8px",
                    }}
                    src={URL.createObjectURL(file)}
                    alt="images"
                  />
                ) : (
                  <ImageBox src={URL.createObjectURL(file)} />
                )}
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    onClearFile(file, "image");
                  }}
                  sx={{
                    top: "0",
                    right: imgwithcomment ? "-5px" : "0",
                    backgroundColor: "#0075D0",
                    color: "#fff",
                    width: imgwithcomment ? "20px" : "16px",
                    height: imgwithcomment ? "20px" : "16px",
                    position: "absolute",
                  }}
                  disableRipple
                >
                  <ClearOutlinedIcon sx={{ width: "16px", height: "16px" }} />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Divider
        sx={{
          my: 1.25,
          borderColor: "#9e9e9e",
          borderRadius: "4px",
          opacity: "0.9",
          background: "#F4F4F4",
          filter: "blur(2px)",
        }}
      />
    </>
  );
}

export default ImagesToUpload;
