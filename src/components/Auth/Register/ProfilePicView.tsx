import React from 'react'
import { Card, CardHeader, CardMedia, IconButton } from '@mui/material';
import assets from 'assets/assets';

interface IProps{
    title:string
    imgSrc:string
    removeImg:()=>void
}
function ProfilePicView(props: IProps) {
 
  return (
    <Card sx={{ maxWidth: 345,  margin:'10px auto' }}>
    <CardHeader
      avatar={
     <> </>
      }
      action={
        <IconButton aria-label="settings" onClick={props.removeImg}>
          <assets.CancelIcon/>
        </IconButton>
      }
      title={props.title}
    />
    <CardMedia
      component="img"
      height="100%"
      image={props.imgSrc}
      alt={props.imgSrc}
    />
  </Card>
);
}

export default ProfilePicView