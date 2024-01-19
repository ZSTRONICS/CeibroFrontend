import { Divider, Grid, Typography } from "@mui/material";

interface DrawingFileCardProps {
  fileName: string;
  from: string;
  floorName: string;
}

const DrawingFileCard = (props: DrawingFileCardProps) => {
  const { fileName, from, floorName } = props;
  return (
    <Grid container sx={{ paddingX: "0", paddingY: "8px", marginLeft: 0 }}>
      <Grid
        item
        xs={9}
        sx={{ "& .MuiGrid-item": { paddingLeft: 0 } }}
        alignItems={"center"}
      >
        <Typography
          sx={{ fontFamily: "Inter", fontSize: "12px", fontWeight: 500 }}
        >
          {fileName}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "12px",
            fontWeight: 400,
            color: "#605C5C",
          }}
        >
          {from}
        </Typography>
      </Grid>
      <Grid item xs={1} sx={{ paddingY: "8px" }}>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs={2} container justifyContent={"end"} alignItems={"center"}>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "12px",
            fontWeight: 500,
            color: "#818181",
          }}
        >
          {floorName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DrawingFileCard;
