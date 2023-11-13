import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
import { IFile } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { MutableRefObject, useEffect, useId, useRef, useState } from "react";
import ImageBox from "../ImageBox";
import ImageBoxWithDesp from "../ImageBoxWithDesp";

interface ReadMoreWrapperProps {
  title: string;
  readMore?: boolean;
  count?: number;
  type?: "text" | "image" | "imageWithDesp";
  data?: string | IFile[] | undefined;
  children?: JSX.Element | JSX.Element[];
}
const ImageBoxWrapper = styled(Box)({
  marginRight: "16px",
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [height, setHeight] = useState("auto");
  const [images, setImages] = useState<any | null>(null);
  const [currentImgIndex, setCurrentImageIndex] = useState(0);
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const despRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const imageWithCommentRef = useRef<HTMLDivElement | null>(null);

  const getHeight = (
    compRef: MutableRefObject<HTMLDivElement | null>,
    type: "text" | "image" | "imageWithDesp"
  ) => {
    if (compRef.current) {
      const lineHeight = parseInt(getComputedStyle(compRef.current).lineHeight);
      const maxHeight = type === "text" ? 4 * lineHeight : 152;
      console.log(type,":",maxHeight);
      
      const currentHeight = compRef.current.clientHeight;
      console.log("currentHeight",type,":",currentHeight);
      if (currentHeight > maxHeight+5) {
        setIsReadMore(true);
      } 
      setHeight(maxHeight+'px')
    }
  };

  useEffect(() => {
    if (type === "text") {
      getHeight(despRef, type);
    } else if (type === "image") {
      getHeight(imageRef, type);
    } else if (type === "imageWithDesp") {
      getHeight(imageRef, type);
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
        key={`key${useId()}`}
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
              minWidth: "83px",
              height: "20px",
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
                gap:'16px',
                borderLeft: "1.9px solid #818181",
                maxWidth: "95%",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {type === "text" &&(
                <p
                  ref={despRef}
                  style={{
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#000",
                    maxHeight: `${height}`,
                    overflow: "hidden",
                    wordWrap: "break-word",
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
                  }}
                >
                  {data &&
                    (data as IFile[]).map((file: IFile, index: any) => {
                      return (
                        <ImageBoxWrapper
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
              {children ?? ""}
            </Box>
            <Box sx={{ display: "flex" }}>
              {count && (
                <Box
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#0076C8",
                    paddingRight: "4px",
                  }}
                >
                  +{count}
                </Box>
              )}
              {isReadMore &&  (
                <IconButton
                  onClick={handleMore}
                  sx={{ height: "24px", width: "24px" }}
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
          imgs={images.map((image: any) => ({
            src: image.fileUrl,
            caption: image.fileName,
            srcSet: [`${image.fileUrl} auto`],
          }))}
          currImg={currentImgIndex}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ReadMoreWrapper;
