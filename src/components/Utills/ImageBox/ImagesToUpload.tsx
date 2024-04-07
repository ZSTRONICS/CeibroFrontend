import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import ImageCardWithComment from "components/Location/LocationImageDetails/ImageCardWithComment";
import { fileType } from "components/Tasks/type";
import ImageBox from ".";

interface ImageUploadProps {
  selectedImages: File[] | ImageWithComment[] | any;
  onClearFile: (file: any, type: fileType) => void;
  isComment?: boolean;
  imgwithcomment?: boolean;
  showLabel: boolean;
  taskApproveModal?: boolean;
  showDivder?: boolean;
  updateImageWithComment: (image: ImageWithComment) => void;
}

function ImagesToUpload(props: ImageUploadProps) {
  const {
    onClearFile,
    selectedImages,
    isComment = false,
    imgwithcomment,
    showLabel,
    showDivder,
    updateImageWithComment,
    taskApproveModal,
  } = props;
  const updatedImgWidthComment = {};

  return (
    <>
      <Box
        sx={{
          // display: "flex",
          // alignItems: "center",
          // justifyContent: imgwithcomment ? "space-between" : null,
          // flexDirection: imgwithcomment ? "row" : null,
          mt: 1,
          mb: 1.2,
          gap: 5,
        }}
      >
        {showLabel && (
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
            flexWrap: imgwithcomment ? "wrap" : "nowrap",
            gap: "12px",
            columnGap: "16px",
            padding: imgwithcomment
              ? "7px 16px 2px 6px"
              : isComment
              ? "6px 0px 0px 0px "
              : "8px 8px 8px 16px",
            overflow: "auto",
            width: "100%",
            // borderLeft: imgwithcomment ? null : "1.9px solid #818181",
            // "&::-webkit-scrollbar": {
            //   height: "0.4rem",
            // },
            "&::-webkit-scrollbar-track": {
              WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              borderRadius: "0.2rem",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
            },
          }}
        >
          {selectedImages.map((file: any, i: any) => {
            const localFile = file.file ? file.file : file;
            return (
              <Box
                key={i}
                sx={{
                  position: "relative",
                  width: imgwithcomment ? "100%" : "auto",
                }}
              >
                {imgwithcomment ? (
                  <ImageCardWithComment
                    taskApproveModal={true}
                    selectedImages={selectedImages}
                    setDescription={(comment) => {
                      file.comment = comment;
                      if (comment.length > 0) {
                        Object.assign(updatedImgWidthComment, {
                          file,
                        });
                        updateImageWithComment(file);
                      }
                    }}
                    img={URL.createObjectURL(localFile)}
                    fileComment={file.comment || ""}
                  />
                ) : isComment ? (
                  <img
                    className="myDIV"
                    loading="lazy"
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "8px",
                    }}
                    src={URL.createObjectURL(localFile)}
                    alt="images"
                  />
                ) : (
                  <ImageBox src={URL.createObjectURL(file)} />
                )}
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    onClearFile(localFile, "image");
                  }}
                  sx={{
                    top: "0",
                    right: imgwithcomment ? "-5px" : "0",
                    backgroundColor: "#0075D0",
                    color: "#fff",
                    width: imgwithcomment ? "20px" : "16px",
                    height: imgwithcomment ? "20px" : "16px",
                    position: "absolute",
                    left: taskApproveModal ? "-0.5%" : null,
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
      {showDivder
        ? !imgwithcomment && (
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
          )
        : null}
    </>
  );
}

export default ImagesToUpload;
