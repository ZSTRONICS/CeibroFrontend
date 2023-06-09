import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Skeleton,
} from "@mui/material";
import assets from "assets/assets";

interface IProps {
  title: string;
  imgSrc: string | ArrayBuffer | null | any;
  cardContent?: React.ReactNode;
  showCancelBtn?: boolean;
  removeImg?: () => void;
  showSkeleton?: boolean;
  showPdf?: boolean;
}

function ImgCard(props: IProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const cardMargin = props.cardContent ? "unset" : "10px auto";
  let mediaContent: JSX.Element | null = null;

  if (props.showSkeleton && !imageLoaded) {
    mediaContent = (
      <Skeleton
        variant="rectangular"
        width={345}
        height={345}
        animation="wave"
      />
    );
  } else if (props.imgSrc && props.showPdf) {
    mediaContent = (
      <object
        data={props.imgSrc}
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>Unable to preview</p>
      </object>
    );
  } else if (props.imgSrc) {
    mediaContent = (
      <CardMedia
        onLoad={handleImageLoad}
        component="img"
        height="100%"
        image={props.imgSrc}
        alt={props.imgSrc}
      />
    );
  }

  return (
    <Card sx={{ maxWidth: "90%", margin: cardMargin }}>
      <CardHeader
        avatar={<> </>}
        action={
          <>
            {props.showCancelBtn && (
              <IconButton aria-label="settings" onClick={props.removeImg}>
                <assets.CancelIcon />
              </IconButton>
            )}
          </>
        }
        title={props.title}
      />
      {mediaContent}
      {props.cardContent && <CardContent>{props.cardContent}</CardContent>}
    </Card>
  );
}

export default ImgCard;
