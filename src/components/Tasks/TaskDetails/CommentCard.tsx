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
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { PinIcon } from "components/material-ui/icons";
import { IFile } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { useEffect, useRef, useState } from "react";

interface Props {
  docs?: string | IFile[] | File[] | [];
}

const CommentCard = ({ docs }: Props) => {
  const array = docs && [docs[0], docs[0], docs[0], docs[0], docs[0], docs[0]];
  const [showMore, setShowMore] = useState<boolean>(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isFiltericonShow = useMediaQuery(theme.breakpoints.down(1366));
  const isLarge = useMediaQuery(theme.breakpoints.up(1400));
  const isMeduim = useMediaQuery(theme.breakpoints.down(1400));
  const isSmall = useMediaQuery(theme.breakpoints.down(1100));
  const commentshowonlarge = useMediaQuery(
    theme.breakpoints.between(1100, 1620)
  );

  const arr = [
    {
      title: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ullam, error similique obcaecati iste omnis? Quae, quisquam pariatur. Eos nulla quis, voluptatibus ducimus ab officia facere est velit odit ipsam!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ullam, error similique obcaecati iste omnis? Quae, quisquam pariatur. Eos nulla quis, voluptatibus ducimus ab officia facere est velit odit ipsam!`,
      creator: "Jaanus Kutson",
      media: [
        {
          img: "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
        },
        {
          img: "https://images.pexels.com/photos/20309830/pexels-photo-20309830/free-photo-of-common-buckeye-junonia-coenia.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        {
          img: "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
        },
        {
          img: "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
        },
        {
          img: "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
        },
        {
          img: "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
        },
      ],
    },
  ];

  const boximgref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const handleClose = () => {
    setCurrentImageIndex(0);
    closeModal();
  };

  const handleClick = () => {
    if (showMore) {
      setShowMore(!true);
    } else {
      setShowMore(true);
    }
  };

  const handleImgClick = (index: any) => {
    openModal();
    setCurrentImageIndex(index);
  };

  const getVisibleChildrenCount = () => {
    if (!boximgref?.current) {
      return;
    }
    const container = boximgref?.current;
    const containerRect = container?.getBoundingClientRect();

    let count = 0;

    for (let i = 0; i < container?.children?.length; i++) {
      const child = container?.children[i];
      const childRect = child.getBoundingClientRect();
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

  const handleResize = () => {
    const Count = getVisibleChildrenCount();
    if (Count) {
      setCount(Count);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  const renderedArray = arr.map((items, index) => {
    const { title, creator, media } = items;
    return (
      <Box
        key={index}
        sx={{
          padding: "16px ",
          backgroundColor: "#F4F4F4",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          maxWidth: "65%",
          width: "max-contnet",
          borderRadius: "15px",
          flexDirection: "column",
          marginTop: "10px",
          marginLeft: "4px",
          // transform: "translateY(-200px)",
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
          <Box
            sx={{
              width: "max-content",
              display: "flex",
            }}
          >
            <Avatar
              alt="avater"
              src={
                "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8"
              }
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
              {creator}
            </Typography>
          </Box>
          <Box
            sx={{
              float: "right",
            }}
          >
            <PinIcon color="#0076C8" />
            <GenericMenu
              icon={
                <assets.MoreVertIcon
                  sx={{
                    color: "#000000",
                    transform: "translateX(18px)",
                  }}
                />
              }
              isProjectGroup={true}
              options={[
                {
                  menuName: "Unpin comment",
                  callBackHandler: () => {},
                },
              ]}
              key={1}
              paddingTop={0}
              disableMenu={false}
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: "5px" }}>
          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#131516",
              textAlign: "start",
              fontWeight: "500",
            }}
          >
            {title !== undefined && title.length > 0
              ? showMore
                ? title
                : title !== undefined && title.length > 270
                ? `${title.substring(
                    0,
                    isSmall ? 60 : commentshowonlarge ? 150 : 270
                  )}...`
                : `${title.substring(
                    0,
                    isSmall ? 60 : commentshowonlarge ? 150 : 270
                  )}`
              : ""}
          </Typography>
          {title && title.length > 270 && (
            <Box
              sx={{
                textAlign: "right",
                padding: "10px 0",
              }}
            >
              <button
                className="btn"
                onClick={handleClick}
                style={{
                  color: "#0076C8",
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "175%",
                  letterSpacing: "0.15px",
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "none",
                  cursor: "pointer",
                }}
              >
                {!showMore ? "View more" : "View less"}
              </button>
            </Box>
          )}
        </Box>
        <Box
          ref={boximgref}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            overflow: "hidden",
            height: "72px",
            border: "solid 1px #F4F4F4 ",
          }}
        >
          {media?.map((items, index) => {
            return (
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
                {media && media?.length - count !== 0 && index === count - 1 ? (
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
                      {`+${media && media?.length - count}`}
                    </Box>
                  </>
                ) : null}

                <CardMedia
                  component="img"
                  sx={{
                    top: "0px",
                    height: "100%",
                    borderRadius: "10px",
                    width: "100%",
                    position: "absolute",
                  }}
                  image={items.img}
                />
              </div>
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            // marginTop: "5px",
          }}
        >
          {docs && (
            <ReadMoreWrapper
              count={array?.length}
              title=""
              type="file"
              // data={array}
              download={false}
            />
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              float: "right",
              fontSize: "12px",
              color: "#605C5C",
              // marginTop: "8px",
            }}
          >
            12:50{" "}
            <DoneOutlinedIcon
              style={{ fontSize: "18px", transform: "translateY(3px)" }}
            />
          </Typography>
        </Box>
        {isOpen && media.length > 0 && (
          <ImgsViewerSlider
            imgs={media.map((image: any) => image.img)}
            currImg={currentImageIndex}
            isOpen={isOpen}
            onClose={handleClose}
          />
        )}
      </Box>
    );
  });

  return <div>{renderedArray}</div>;
};

export default CommentCard;
