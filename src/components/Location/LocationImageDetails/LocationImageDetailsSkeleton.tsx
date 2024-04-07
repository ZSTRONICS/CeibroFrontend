import { Box, Skeleton, Typography } from "@mui/material";

const LocationImageDetailsSkeleton = ({ windowActualHeight }: any) => {
  const comments = [1, 2, 3];
  const tags = [1, 2, 3, 4];
  const generateSkeletons = (data: any[], width: string): any => {
    return data.map((item: any, index: any) => (
      <Typography
        key={index}
        width={width}
        sx={{ marginLeft: "1.5%" }}
        component="div"
        variant="h5"
      >
        <Skeleton />
      </Typography>
    ));
  };
  const commentsSkeleton = generateSkeletons(comments, "97%");
  const tagSkeleton = generateSkeletons(tags, "20%");
  return (
    <Box
      sx={{
        height: `${windowActualHeight - 195}px`,
        overflowY: "auto",
      }}
    >
      <Skeleton
        variant="rectangular"
        width="97%"
        sx={{
          margin: "1.5% 1.5% 1.5% 1.5% ",
          borderRadius: "10px",
          height: "55%",
        }}
      >
        <div style={{ paddingTop: "57%" }} />
      </Skeleton>

      <Box
        sx={{
          width: "97%",
          margin: "1.5% 1.5% 1.5% 1.5% ",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography width="40%" component="div" variant="h5">
          <Skeleton />
        </Typography>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {tagSkeleton}
        </Box>
      </Box>
      <Box>{commentsSkeleton}</Box>
      <Skeleton
        variant="rectangular"
        width="97%"
        height="100px"
        sx={{
          marginLeft: "1.5%",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      ></Skeleton>
    </Box>
  );
};
export default LocationImageDetailsSkeleton;
