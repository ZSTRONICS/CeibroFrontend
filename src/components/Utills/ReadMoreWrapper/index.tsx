import { Box, Typography, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import assets from "assets";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
import { fileType } from "components/Tasks/type";
import { IFile } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { MutableRefObject, useEffect, useId, useRef, useState } from "react";
import FileBox from "../FileBox";
import ImageBox from "../ImageBox";
import ImageBoxWithDesp from "../ImageBoxWithDesp";

interface ReadMoreWrapperProps {
  title: string;
  readMore?: boolean;
  count?: number;
  type?: "text" | "image" | "imageWithDesp" | "file";
  data?: string | IFile[] | File[];
  children?: JSX.Element | JSX.Element[];
  callback?: (file: File | any, type: fileType) => void,
  allowExpandedView?:boolean
}
const ImageBoxWrapper = styled(Box)({
  marginRight: "10px",
  "&:hover": {
    cursor: "pointer",
  },
});

const ReadMoreWrapper = ({
  title,
  readMore = false,
  count,
  children,
  type,
  data,
  callback,
  allowExpandedView=true
}: ReadMoreWrapperProps) => {
  const [isExpanded, setIsExpanded] = useState(readMore);
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

  const compHeight = {
    file: 21,
    image: 152,
    imageWithDesp: 152,
  };

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

  const getWidthWithMarginAndPadding = (
    compRef: MutableRefObject<HTMLDivElement | null>
  ) => {
    if (compRef.current) {
      // const computedStyle = getComputedStyle(compRef.current);
      const width = compRef.current.offsetWidth;
      const widthWithMarginAndPadding = width - 32;
      return widthWithMarginAndPadding;
    }
    return 0;
  };

  useEffect(() => {
    if (type === "text") {
      getHeight(despRef, type, isExpanded);
    } else if (type === "image") {
      getHeight(imageRef, type, isExpanded);
      const imgContWidth = getWidthWithMarginAndPadding(imageRef);
      if (count && count > 0) {
        if (imgContWidth > 150) {
          setLocalCount(count - Math.floor(imgContWidth / 160));
        }
      }
    } else if (type === "imageWithDesp") {
      getHeight(imageWithCommentRef, type, isExpanded);
      count && count > 0 && setLocalCount(count - 1);
    } else if (type === "file") {
      if(fileCompRef.current){
        const compHeight = parseInt(getComputedStyle(fileCompRef.current).height);
        const fileCompWidth = getWidthWithMarginAndPadding(fileCompRef);
        console.log(compHeight,"lineHeight");
        if (count && count > 0) {
          setLocalCount(count - Math.floor(fileCompWidth / 153));
        }
      }
      getHeight(fileCompRef, type, isExpanded);
    }
  }, [
    data,
    despRef.current,
    imageRef.current,
    imageWithCommentRef.current,
    fileCompRef.current,
  ]);

  const handleMore = () => {
    if (type === "image") {
      getHeight(imageRef, type, !isExpanded);
    } else if (type === "imageWithDesp") {
      getHeight(imageWithCommentRef, type, !isExpanded);
    }else if (type === "file"){
      getHeight(fileCompRef, type, !isExpanded);
    }
    else {
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
      <Box
        key={`key${useId()}` + 1}
        sx={{
          width: "100%",
          padding: "8px 0px 8px 0px",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "90px",
              gap: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "16px",
                color: "#605c5c",
                width: "100%",
              }}
            >
              {title}
            </Typography>
          </Box>
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
                px: "16px",
                gap: "16px",
                borderLeft: "1.9px solid #818181",
                maxWidth: "95%",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
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
              {type === "image" && (
                <Box
                  ref={imageRef}
                  sx={{
                    maxHeight: `${height}`,
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {data &&
                    (data as IFile[]).map((file: IFile, index: any) => {
                      return (
                        <ImageBoxWrapper
                          key={file._id + index}
                          onClick={() => handleClick(data, index)}
                        >
                          <ImageBox src={file.fileUrl} />
                        </ImageBoxWrapper>
                      );
                    })}
                </Box>
              )}
              {type === "imageWithDesp" && (
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
                  {data &&
                    (data as IFile[]).map((file: IFile, index: any) => {
                      return (
                        <ImageBoxWrapper
                          sx={{ width: "100%" }}
                          key={file._id + index}
                          onClick={() => handleClick(data, index)}
                        >
                          <ImageBoxWithDesp
                            src={file.fileUrl}
                            comment={file.comment}
                          />
                        </ImageBoxWrapper>
                      );
                    })}
                </Box>
              )}
              {type === "file" && (
                <Box ref={fileCompRef} sx={{maxHeight:`${allowExpandedView?height:'auto'}`}}>
                  <FileBox
                    title={title}
                    files={data}
                    handleClearFile={callback}
                  />
                </Box>
              )}
              {children ?? ""}
            </Box>
            <Box sx={{ display: "flex" }}>
              {!isExpanded &&isReadMore && localCount && localCount > 0 ? (
                <Box
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#0076C8",
                    paddingRight: "4px",
                  }}
                >
                  +{localCount}
                </Box>
              ) : (
                <></>
              )}
              {isReadMore &&allowExpandedView&& (
                <IconButton
                  onClick={handleMore}
                  sx={{ height: "24px", width: "40px" }}
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
        {isReadMore &&allowExpandedView&& (
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "end",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "400",
              color: "#0076C8",
            }}
            onClick={handleMore}
          >
            {isExpanded ? "View less" : "View more"}
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