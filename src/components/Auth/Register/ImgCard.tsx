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
  imgSrc: string;
  cardContent?: React.ReactNode;
  showCancelBtn?: boolean;
  removeImg?: () => void;
  showSkeleton?:boolean
}

function ImgCard(props: IProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };


  const cardMargin = props.cardContent ? "unset" : "10px auto";
  return (
    <Card sx={{ maxWidth: 345, margin: cardMargin }}>
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
      {props.showSkeleton===true && imageLoaded === false && (
        <Skeleton
          variant="rectangular"
          width={345}
          height={345}
          animation="wave"
        />
      )}

        <CardMedia
          onLoad={handleImageLoad}
          component="img"
          height="100%"
          image={props.imgSrc}
          alt={props.imgSrc}
        />
      {props.cardContent && <CardContent>{props.cardContent}</CardContent>}
    </Card>
  );
}

export default ImgCard;
