import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Skeleton,
} from "@mui/material";
import assets from "assets/assets";
import React, { useState } from "react";

interface IProps {
  title?: string;
  imgSrc: string | ArrayBuffer | null | any;
  cardContent?: React.ReactNode;
  showCancelBtn?: boolean;
  removeImg?: () => void;
  showSkeleton?: boolean;
  showPdf?: boolean;
  isBase64String?: boolean;
  ImageWithComments?: boolean;
  taskApproveModal?: boolean;
}

function ImgCard(props: IProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  let imgUrl: string = props.imgSrc;
  if (props.isBase64String) {
    imgUrl = "data:image/png;base64," + props.imgSrc;
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const cardMargin = props.cardContent ? "unset" : "10px auto";

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: props.ImageWithComments
          ? props.taskApproveModal
            ? "110px"
            : 160
          : "100%",
        height: props.ImageWithComments
          ? props.taskApproveModal
            ? "100px"
            : 130
          : 300,
        margin: cardMargin,
      }}
    >
      {!props.title || "" ? null : (
        <CardHeader
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          avatar={<> </>}
          action={
            <>
              {props.showCancelBtn && (
                <IconButton onClick={props.removeImg}>
                  <assets.CancelIcon />
                </IconButton>
              )}
            </>
          }
          title={
            <Box
              className="ellipsis"
              sx={{
                maxWidth: "270px",
              }}
            >
              {props.title}
            </Box>
          }
        />
      )}
      {props.showSkeleton === true && imageLoaded === false && (
        <Skeleton
          variant="rectangular"
          width={345}
          height={345}
          animation="wave"
        />
      )}
      {props.showPdf && (
        <object
          data={props.imgSrc}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <p>Unable to preview</p>
        </object>
      )}
      <CardMedia
        // sx={{ height: "100px", width: "100px" }}
        // taskApproveModal={props.taskApproveModal}
        onLoad={handleImageLoad}
        component="img"
        height="100%"
        image={imgUrl}
        alt={props.imgSrc}
      />
      {props.cardContent && <CardContent>{props.cardContent}</CardContent>}
    </Card>
  );
}

export default ImgCard;
