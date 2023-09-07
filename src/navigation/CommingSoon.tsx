import { Grid } from "@mui/material";
import assets from "assets/assets";
import { Heading, SubHeadingTag } from "components/CustomTags";

function CommingSoon() {
  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{ height: "100vh", padding: "0 8px" }}
    >
      <Grid
        item
        md={5.2}
        sm={4.5}
        p={1}
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{
          width: "100%",
          height: "100%",
          background: `url(${assets.CeibroWaterMark}) no-repeat`,
          backgroundPosition: "center",
          backgroundSize: { xs: "auto auto", md: "100%" },
          backgroundOrigin: "content-box, padding-box",
        }}
      >
        <Heading
          sx={{
            fontSize: { md: "6rem", xs: "3rem" },
          }}
        >
          CEIBRO
        </Heading>
        <SubHeadingTag
          sx={{
            fontSize: { md: "2.2rem !important", xs: "1.5rem !important" },
          }}
        >
          Coming Soon
        </SubHeadingTag>
      </Grid>
      <Grid
        item
        md={6.3}
        sm={7}
        sx={{
          display: { xs: "none", md: "block", sm: "block" },
          width: "100%",
          height: "100%",
          background: `url(${assets.visual}) no-repeat`,
          backgroundSize: "100% 100%",
        }}
      ></Grid>
    </Grid>
  );
}

export default CommingSoon;
