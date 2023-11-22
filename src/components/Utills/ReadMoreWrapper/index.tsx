import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
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
}
const ImageBoxWrapper = styled(Box)({
  marginRight: "10px",
  "&:hover": {
    cursor: "pointer",
  },
});

const ReadMoreWrapper = ({
  title,
  readMore,
  count,
  children,
  type,
  data,
}: ReadMoreWrapperProps) => {
  const [isExpanded, setIsExpanded] = useState(readMore);
  const [isReadMore, setIsReadMore] = useState(false);
  const [height, setHeight] = useState("auto");
  const [images, setImages] = useState<any | null>(null);
  const [currentImgIndex, setCurrentImageIndex] = useState(0);
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const despRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const imageWithCommentRef = useRef<HTMLDivElement | null>(null);
  const [localCount, setLocalCount] = useState<number | null>(null);

  const getHeight = (
    compRef: MutableRefObject<HTMLDivElement | null>,
    type: "text" | "image" | "imageWithDesp"
  ) => {
    if (compRef.current) {
      const lineHeight = parseInt(getComputedStyle(compRef.current).lineHeight);
      const maxHeight = type === "text" ? 4 * lineHeight : 152;
      const currentHeight = compRef.current.clientHeight;
      if (currentHeight > maxHeight + 5) {
        setIsReadMore(true);
      }
      if (!(isExpanded || readMore)) {
        setHeight(maxHeight + "px");
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
      const computedStyle = getComputedStyle(compRef.current);
      const width = compRef.current.offsetWidth;
      const marginLeft = parseFloat(computedStyle.marginLeft);
      const marginRight = parseFloat(computedStyle.marginRight);
      const widthWithMarginAndPadding = width + marginLeft + marginRight;
      return widthWithMarginAndPadding;
    }
    return 0;
  };

  useEffect(() => {
    if (type === "text") {
      getHeight(despRef, type);
    } else if (type === "image") {
      getHeight(imageRef, type);
      const imgContWidth = getWidthWithMarginAndPadding(imageRef);
      if (count && count > 0) {
        if (imgContWidth > 150) {
          setLocalCount(count - Math.floor(imgContWidth / 170));
        }
      }
    } else if (type === "imageWithDesp") {
      getHeight(imageRef, type);
      // getWidthWithMarginAndPadding(imageRef);
    }
  }, [data, despRef.current, imageRef.current, imageWithCommentRef.current]);

  const handleMore = () => {
    setIsExpanded(!isExpanded);
    if (type === "image") {
      !isExpanded ? setHeight("100%") : setHeight("152px");
    } else if (type === "imageWithDesp") {
      !isExpanded ? setHeight("100%") : setHeight("152px");
    } else {
      !isExpanded ? setHeight("100%") : setHeight("84px");
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
                <p
                  ref={despRef}
                  style={{
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#000",
                    maxHeight: `${height}`,
                    overflow: "hidden",
                    wordWrap: "break-word",
                    overflowWrap: "anywhere",
                  }}
                >
                  {data ? String(data) : "N/A"}
                </p>
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
                <FileBox title={title} bt={true} bb={true} files={data} />
              )}
              {children ?? ""}
            </Box>
            <Box sx={{ display: "flex" }}>
              {!isExpanded && localCount && localCount > 0 ? (
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
              {isReadMore && (
                <IconButton
                  onClick={handleMore}
                  sx={{ height: "24px", width: "40px" }}
                >
                  {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
        {isReadMore && (
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
