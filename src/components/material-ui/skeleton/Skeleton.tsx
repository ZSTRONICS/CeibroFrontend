import React from 'react'
import Skeleton from '@mui/material/Skeleton';

export function CSkeleton(props: any) {
  return (
    <Skeleton {...props} animation="wave" />
  )
}
