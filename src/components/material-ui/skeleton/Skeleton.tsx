import Skeleton, { SkeletonProps } from "@mui/material/Skeleton";

export function CSkeleton(props: SkeletonProps) {
  return <Skeleton {...props} animation="wave" />;
}
