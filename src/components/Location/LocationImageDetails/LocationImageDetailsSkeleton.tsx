import { Box, Skeleton, Typography } from "@mui/material";

const LocationImageDetailsSkeleton = ({ height }: any) => {
  return (
    <Box
      sx={{
        height: "max-content",
        overflowY: "scroll",
        // height: `${windowActualHeight - 68}px`,
      }}
    >
      <Skeleton
        variant="rectangular"
        width="97%"
        sx={{
          marginLeft: "1.5%",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      >
        <div style={{ paddingTop: "57%" }} />
      </Skeleton>

      <Box
        sx={{
          width: "97%",
          marginLeft: "1.5%",
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
          <Typography
            width="20%"
            sx={{ marginLeft: "1.5%" }}
            component="div"
            variant="h5"
          >
            <Skeleton />
          </Typography>
          <Typography
            width="20%"
            sx={{ marginLeft: "1.5%" }}
            component="div"
            variant="h5"
          >
            <Skeleton />
          </Typography>
          <Typography
            width="20%"
            sx={{ marginLeft: "1.5%" }}
            component="div"
            variant="h5"
          >
            <Skeleton />
          </Typography>
          <Typography
            width="20%"
            sx={{ marginLeft: "1.5%" }}
            component="div"
            variant="h5"
          >
            <Skeleton />
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          width="97%"
          sx={{ marginLeft: "1.5%" }}
          component="div"
          variant="h5"
        >
          <Skeleton />
        </Typography>
        <Typography
          width="97%"
          sx={{ marginLeft: "1.5%" }}
          component="div"
          variant="h5"
        >
          <Skeleton />
        </Typography>
        <Typography
          width="97%"
          sx={{ marginLeft: "1.5%" }}
          component="div"
          variant="h5"
        >
          <Skeleton />
        </Typography>
      </Box>
      <Skeleton
        variant="rectangular"
        width="97%"
        height="100px"
        sx={{
          marginLeft: "1.5%",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      >
        <div style={{ paddingTop: "57%" }} />
      </Skeleton>
    </Box>
  );
};

export default LocationImageDetailsSkeleton;
