import { Button } from "@mui/base";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import {
  Avatar,
  Box,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import assets from "assets";
import { GenericMenu } from "components/GenericComponents";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
import {
  DOC_EXT,
  MEDIA_EXT,
  momentdeDateFormat,
} from "components/Utills/Globals";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { PinIcon } from "components/material-ui/icons";
import { useOpenCloseModal } from "hooks";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "redux/action";

interface Props {
  commentData: any;
  initiator: any;
  isPinned: boolean;
  isPinnedView: boolean;
  taskId: string;
  eventId: string;
  isCommentInitiator: boolean;
  createdAt: any;
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
}: Props) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down(1100));
  const commentshowonlarge = useMediaQuery(
    theme.breakpoints.between(1100, 1620)
  );

  const dispatch = useDispatch();
  const boximgref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const handleClose = () => {
    setCurrentImageIndex(0);
    closeModal();
  };

  const handleClick = () => {
    setShowMore((prev) => !prev);
    // if (showMore) {
    //   setShowMore(!true);
    // } else {
    //   setShowMore(true);
    // }
  };

  const handleImgClick = (index: any) => {
    openModal();
    setCurrentImageIndex(index);
  };

  const [doxdata, setdoxData] = useState([]);
  const [Imgdata, setImgData] = useState([]);
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

  useEffect(() => {
    const DoxfilteredData = commentData.files.filter((item: any) =>
      DOC_EXT.includes(item.fileType)
    );
    const ImgfilteredData = commentData.files.filter((item: any) =>
      MEDIA_EXT.includes(item.fileType)
    );
    setdoxData(DoxfilteredData);
    setImgData(ImgfilteredData);

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

  const CommentCardContent = (
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
        marginLeft: isCommentInitiator ? "40%" : "8px",
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
              sx={{ width: "30px", height: "30px" }}
            />

            <Typography
              sx={{
                width: "max-content",
                marginLeft: "7px",
                paddingTop: "5px",
                fontWeight: "700",
                fontSize: "12",
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
            isProjectGroup={true}
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
      <Box
        sx={{
          marginTop: "5px",
          width: "95%",
        }}
      >
        <Box
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
            textAlign: "start",
            overflowWrap: "break-word",
          }}
        >
          <pre
            style={{
              color: "#131516",
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Inter",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
            }}
          >
            {commentData && commentData?.message.length < 370 ? (
              commentData.message
            ) : showMore ? (
              <>
                {`${commentData.message} `}
                <Button
                  onClick={handleClick}
                  style={{
                    marginLeft: "5px",
                    color: "#1976D2",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  View less
                </Button>
              </>
            ) : (
              <>
                {`${commentData.message.substring(0, 370)} ...`}
                <Button
                  onClick={handleClick}
                  style={{
                    marginLeft: "5px",
                    color: "#1976D2",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  View more
                </Button>
              </>
            )}
          </pre>
        </Box>
      </Box>
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
                  cursor: "pointer",
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
                    borderRadius: "10px",
                    width: "100%",
                    position: "absolute",
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
      {doxdata.length >= 1 ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <ReadMoreWrapper
            count={doxdata?.length}
            title=""
            data={doxdata}
            type="file"
            download={false}
          />
        </Box>
      ) : null}
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            float: "right",
            fontSize: "12px",
            color: "#605C5C",
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
      {isOpen && Imgdata.length > 0 && (
        <ImgsViewerSlider
          imgs={Imgdata.map((image: any) => image.fileUrl)}
          currImg={currentImageIndex}
          isOpen={isOpen}
          onClose={handleClose}
        />
      )}
    </Box>
  );

  return <div>{CommentCardContent}</div>;
};

export default CommentCard;
