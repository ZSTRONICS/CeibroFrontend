import { Box, Typography, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import assets from "assets";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
import { fileType } from "components/Tasks/type";
import { IFile } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import {
  MutableRefObject,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { getWidthWithMarginAndPadding } from "utills/common";
import FileBox from "../FileBox";
import ImageBox from "../ImageBox";
import ImageBoxWithDesp from "../ImageBoxWithDesp";

interface ReadMoreWrapperProps {
  imgcard?: boolean;
  title: string;
  readMore?: boolean;
  count?: number;
  type: "text" | "image" | "imageWithDesp" | "file" | "Location";
  data?: string | IFile[] | File[] | ImageWithComment[] | [];
  children?: JSX.Element | JSX.Element[];
  callback?: (file: File | any, type: fileType) => void;
  allowExpandedView?: boolean;
  download?: boolean;
}
const ImageBoxWrapper = styled(Box)({
  marginRight: "10px",
});

const ReadMoreWrapper = ({
  imgcard,
  title,
  readMore = false,
  count,
  children,
  type,
  data,
  callback,
  allowExpandedView = true,
  download,
}: ReadMoreWrapperProps) => {
  const [isExpanded, setIsExpanded] = useState(readMore);
  const compHeight = {
    text: "23",
    file: 21,
    image: 151,
    imageWithDesp: 151,
  };
  const [isReadMore, setIsReadMore] = useState(false);
  const [height, setHeight] = useState("auto");
  const [images, setImages] = useState<any | null>(null);
  const [currentImgIndex, setCurrentImageIndex] = useState(0);
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const despRef = useRef<HTMLPreElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const fileCompRef = useRef<HTMLDivElement | null>(null);
  const imageWithCommentRef = useRef<HTMLDivElement | null>(null);
  const [localCount, setLocalCount] = useState<number | null>(null);

  const getHeight = (
    compRef: MutableRefObject<HTMLDivElement | HTMLPreElement | null>,
    type: "text" | "image" | "imageWithDesp" | "file",
    hasExpanded: boolean
  ) => {
    if (compRef.current) {
      const lineHeight = parseInt(getComputedStyle(compRef.current).lineHeight);
      const maxHeight = type === "text" ? 10 * lineHeight : compHeight[type];
      const currentHeight = compRef.current.clientHeight;
      if (currentHeight > maxHeight + 5) {
        setIsReadMore(true);
      }
      if (!(hasExpanded || readMore)) {
        setHeight(maxHeight + "px");
        setIsExpanded(false);
      } else {
        setHeight("100%");
        setIsExpanded(true);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        const localWidth = getWidthWithMarginAndPadding(imageRef);
        if (count && count > 0 && localWidth > 150) {
          setLocalCount(count - Math.floor(localWidth / 160));
        }
      }
      if (fileCompRef.current) {
        const fielsContWidth = getWidthWithMarginAndPadding(fileCompRef);
        if (count && count > 0 && fielsContWidth > 164) {
          setLocalCount(count - Math.floor(fielsContWidth / 165));
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (data) {
      if (type === "text") {
        getHeight(despRef, type, isExpanded);
      } else if (type === "image") {
        getHeight(imageRef, type, isExpanded);
        const imgContWidth = getWidthWithMarginAndPadding(imageRef);
        if (count && count > 0 && imgContWidth > 150) {
          setLocalCount(count - Math.floor(imgContWidth / 160));
        }
      } else if (type === "imageWithDesp") {
        getHeight(imageWithCommentRef, type, isExpanded);
        count && count > 0 && setLocalCount(count - 1);
      } else if (type === "file") {
        if (fileCompRef.current) {
          const compHeight = parseInt(
            getComputedStyle(fileCompRef.current).height
          );
          const fielsContWidth = getWidthWithMarginAndPadding(fileCompRef);
          if (count && count > 0 && fielsContWidth > 164) {
            setLocalCount(count - Math.floor(fielsContWidth / 165));
          }
        }
        getHeight(fileCompRef, type, isExpanded);
      }
    }
  }, [data]);
  const handleMore = () => {
    if (type === "image") {
      getHeight(imageRef, type, !isExpanded);
    } else if (type === "imageWithDesp") {
      getHeight(imageWithCommentRef, type, !isExpanded);
    } else if (type === "file") {
      getHeight(fileCompRef, type, !isExpanded);
    } else {
      getHeight(despRef, "text", !isExpanded);
    }
  };

  const handleClick = (files: any, index: number) => {
    setImages(files);
    setCurrentImageIndex(index);
    openModal();
  };

  return (
    <>
      <Box key={`key${useId()}` + 1} sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "12px",
              color: "#605c5c",
              lineHeight: "16px",
              width: "100%",
              overflowWrap: "anywhere",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                px: "4px",
                maxWidth: "95%",
              }}
            >
              {type === "text" && (
                <pre
                  ref={despRef}
                  style={{
                    fontWeight: 400,
                    fontSize: "14px",
                    fontFamily: "Inter",
                    color: "#000",
                    maxHeight: `${height}`,
                    overflow: "hidden",
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                  }}
                >
                  {data ? String(data) : "N/A"}
                </pre>
              )}
              {type === "image" && data && data.length > 0 && (
                <Box
                  ref={imageRef}
                  sx={{
                    maxHeight: `${height}`,
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {
                    // imgcard
                    //   ? (data as IFile[]).map((file: IFile, index: any) => {
                    //       return (
                    //         <ImageBoxWrapper key={file._id + index}>
                    //           <CardMedia
                    //             component="img"
                    //             sx={{
                    //               height: "100px",
                    //               borderRadius: "5px",
                    //               width: "100px",
                    //               marginLeft: index === 0 ? null : "15px",
                    //             }}
                    //             image={files[0].fileUrl}
                    //             image={
                    //               "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8"
                    //             }
                    //           />
                    //         </ImageBoxWrapper>
                    //       );
                    //     })
                    // :
                    data &&
                      (data as IFile[]).map((file: IFile, index: any) => {
                        return (
                          <ImageBoxWrapper key={file._id + index}>
                            <ImageBox
                              TaskDetails={true}
                              src={file.fileUrl}
                              handleClick={() => {
                                handleClick(data, index);
                              }}
                            />
                          </ImageBoxWrapper>
                        );
                      })
                  }
                </Box>
              )}
              {type === "imageWithDesp" && data && data.length > 0 && (
                <Box
                  ref={imageWithCommentRef}
                  sx={{
                    maxHeight: `${height}`,
                    width: "100%",
                    padding: "10px 0px 16px 0px",
                    display: "flex",
                    flexWrap: "wrap",
                    rowGap: "10px",
                  }}
                >
                  {(data as IFile[]).map((file: IFile, index: any) => {
                    return (
                      <ImageBoxWrapper
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "start",
                        }}
                        key={file._id + index}
                      >
                        <ImageBoxWithDesp
                          TaskDetails={true}
                          src={file.fileUrl}
                          comment={file.comment}
                          handleClick={() => {
                            handleClick(data, index);
                          }}
                        />
                      </ImageBoxWrapper>
                    );
                  })}
                </Box>
              )}
              {type === "file" && (
                <Box
                  ref={fileCompRef}
                  sx={{
                    maxHeight: `${allowExpandedView ? height : "auto"}`,
                  }}
                >
                  <FileBox
                    title={title}
                    files={data}
                    handleClearFile={callback}
                    download={download}
                  />
                </Box>
              )}
              {children ?? ""}
            </Box>
            <Box sx={{ display: "flex" }}>
              {!isExpanded && isReadMore && localCount && localCount > 0 ? (
                <Box
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#0076C8",
                    paddingRight: "4px",
                    display: "flex",
                  }}
                >
                  +{localCount}
                </Box>
              ) : (
                <></>
              )}
              {isReadMore && allowExpandedView && (
                <IconButton
                  onClick={handleMore}
                  sx={{ height: "24px", width: "40px", cursor: "pointer" }}
                >
                  {isExpanded ? (
                    <assets.ExpandMoreIcon sx={{ color: "#0076C8" }} />
                  ) : (
                    <assets.ExpandLessIcon sx={{ color: "#0076C8" }} />
                  )}
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
        {isReadMore && allowExpandedView && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Typography
              sx={{
                cursor: "pointer",
                fontFamily: "Inter",
                fontSize: "12px",
                fontWeight: "400",
                color: "#0076C8",
              }}
              onClick={handleMore}
            >
              {isExpanded ? "View less" : "View more"}
            </Typography>
          </Box>
        )}
      </Box>
      {isOpen && images.length > 0 && (
        <ImgsViewerSlider
          imgs={images.map((image: any) => image.fileUrl)}
          currImg={currentImgIndex}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ReadMoreWrapper;
