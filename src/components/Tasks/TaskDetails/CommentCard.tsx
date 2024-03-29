import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Avatar, Box, CardMedia, Typography } from "@mui/material";
import assets from "assets";
import { GenericMenu } from "components/GenericComponents";
import ImagePhotoViewer from "components/ImgLazyLoad/ImagePhotoViewer";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  MEDIA_EXT,
  momentdeDateFormat,
} from "components/Utills/Globals";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { PinIcon } from "components/material-ui/icons";
import { CommentData, IFile } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "redux/action";
import ShowmoreComponent from "./Showmore";

interface Props {
  commentData: CommentData;
  initiator: UserInfo;
  isPinned: boolean;
  isPinnedView: boolean;
  taskId: string;
  eventId: string;
  isCommentInitiator: boolean;
  createdAt: any;
  isTaskDetail: boolean;
}

const CommentCard = ({
  commentData,
  initiator,
  isPinned,
  isPinnedView,
  isCommentInitiator,
  createdAt,
  taskId,
  eventId,
  isTaskDetail,
}: Props) => {
  const dispatch = useDispatch();
  const boximgref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const handleClose = () => {
    setCurrentImageIndex(0);
    closeModal();
  };

  const handleImgClick = (index: any) => {
    openModal();
    setCurrentImageIndex(index);
  };
  const allDocsFiles = FILTER_DATA_BY_EXT(DOC_EXT, commentData.files);
  const allMediaFiles = FILTER_DATA_BY_EXT(MEDIA_EXT, commentData.files);

  const getVisibleChildrenCount = () => {
    if (!boximgref.current) return 0;
    let count = 0;
    const containerRect = boximgref.current.getBoundingClientRect();
    for (let i = 0; i < boximgref.current.children.length; i++) {
      const childRect = boximgref.current.children[i].getBoundingClientRect();
      if (
        childRect.top >= containerRect.top &&
        childRect.bottom <= containerRect.bottom
      ) {
        count++;
      } else {
        break;
      }
    }
    return count;
  };
  const localCount = getVisibleChildrenCount();

  const handleResize = () => {
    setCount(localCount);
  };
  let Imgdata: IFile[] = [];
  let imagesWithComment: IFile[] = [];
  allMediaFiles.forEach((localFile: IFile) => {
    if (localFile.hasComment && localFile.comment.length > 0) {
      imagesWithComment.push(localFile);
    } else {
      Imgdata.push(localFile);
    }
  });

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [boximgref, commentData.files.length, localCount]);

  const handlePinUnPinTaskComment = () => {
    const payload = {
      other: {
        taskId: taskId,
        eventId: eventId,
        isPinned: isPinned ? false : true,
      },
    };
    dispatch(taskActions.pinUnPinTaskComment(payload));
  };
  const showBg = isPinnedView
    ? "#F4F4F4"
    : !isCommentInitiator
    ? "#F4F4F4"
    : "#CFECFF";

  return (
    <>
      <Box
        sx={{
          padding: "16px ",
          backgroundColor: showBg,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          maxWidth: isPinnedView ? "100%" : "70%",
          width: "max-contnet",
          borderRadius: "15px",
          flexDirection: "column",
          marginTop: "10px",
          marginRight: !isPinnedView ? "10px" : "0px",
          marginLeft: isCommentInitiator ? "40%" : isTaskDetail ? "0px" : "8px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {initiator && (
            <Box
              sx={{
                width: "max-content",
                display: "flex",
              }}
            >
              <Avatar
                alt="avater"
                src={initiator?.profilePic}
                variant="circular"
                sx={{
                  width: "30px",
                  height: "30px",
                  border: "1px solid #E2E4E5",
                }}
              />

              <Typography
                sx={{
                  width: "max-content",
                  marginLeft: "7px",
                  paddingTop: "5px",
                  fontWeight: "700",
                  fontSize: "12px",
                }}
              >
                {`${initiator?.firstName} ${initiator?.surName}`}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              float: "right",
              display: "flex",
            }}
          >
            <Box sx={{ transform: "translateX(10px)" }}>
              {isPinned ? <PinIcon color="#0076C8" /> : <></>}
            </Box>
            <GenericMenu
              icon={
                <assets.MoreVertIcon
                  sx={{
                    color: "#000000",
                    transform: "translateX(10px)",
                  }}
                />
              }
              options={[
                {
                  menuName: isPinned ? "Unpin comment" : "Pin comment",
                  callBackHandler: handlePinUnPinTaskComment,
                },
              ]}
              key={1}
              paddingTop={0}
              disableMenu={false}
            />
          </Box>
        </Box>
        {commentData?.message && (
          <Box
            sx={{
              marginTop: "5px",
              width: "95%",
              fontSize: "14px",
              fontWeight: "500",
              textAlign: "start",
              overflowWrap: "break-word",
            }}
          >
            <ShowmoreComponent data={commentData?.message} count={370} />
          </Box>
        )}
        {commentData && commentData?.files && Imgdata?.length >= 1 ? (
          <>
            <Box
              ref={boximgref}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                overflow: "hidden",
                height: "72px",
                marginTop: "10px",
                border: !isCommentInitiator
                  ? "solid 1px #F4F4F4 "
                  : "solid 1px #CFECFF ",
              }}
            >
              {Imgdata?.map((items: any, index: number) => (
                <div
                  onClick={() => handleImgClick(index)}
                  key={index}
                  style={{
                    position: "relative",
                    width: "70px",
                    height: "70px",
                    marginLeft: index !== 0 ? "10px" : "",
                  }}
                >
                  {Imgdata &&
                  Imgdata?.length - count !== 0 &&
                  index === count - 1 ? (
                    <>
                      <Box
                        sx={{
                          height: "100%",
                          width: "100%",
                          backgroundColor: "black",
                          opacity: "0.6",
                          zIndex: "10",
                          position: "absolute",
                          borderRadius: "10px",
                        }}
                      ></Box>
                      <Box
                        sx={{
                          position: "absolute",
                          zIndex: "15",
                          color: "white",
                          fontSize: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {`+${Imgdata && Imgdata?.length - count}`}
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}

                  <CardMedia
                    component="img"
                    sx={{
                      top: "0px",
                      height: "100%",
                      borderRadius: "8px",
                      border: "1px solid #E2E4E5",
                      width: "100%",
                      position: "absolute",
                      cursor: "pointer",
                    }}
                    image={items.fileUrl}
                  />
                </div>
              ))}
            </Box>
          </>
        ) : (
          ""
        )}
        {allDocsFiles.length >= 1 ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <ReadMoreWrapper
              count={allDocsFiles?.length}
              title=""
              data={allDocsFiles}
              type="file"
              download={false}
            />
          </Box>
        ) : null}
        {imagesWithComment && (
          <ReadMoreWrapper
            isCommentcard={true}
            title=""
            count={imagesWithComment.length}
            type="imageWithDesp"
            data={imagesWithComment}
          />
        )}

        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              float: "right",
              fontSize: "12px",
              color: "#605C5C",
              marginTop: "7px",
            }}
          >
            {momentdeDateFormat(createdAt)}
            {!isPinnedView && (
              <DoneOutlinedIcon
                style={{ fontSize: "18px", transform: "translateY(3px)" }}
              />
            )}
          </Typography>
        </Box>
      </Box>
      {isOpen && Imgdata.length > 0 && (
        <ImagePhotoViewer
          imgs={Imgdata.map((image: any) => image.fileUrl)}
          currImg={currentImageIndex}
          isOpen={isOpen}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default CommentCard;
