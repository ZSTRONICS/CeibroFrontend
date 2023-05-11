import { Box, Grid } from "@mui/material";
import { CBox } from "components/material-ui";
import useResponsive from "hooks/useResponsive";
import ImageTile from "../Login/ImageTile";
import useStyles from "../Register/RegisterStyles";
import { Typography } from "@mui/material";
import assets from "assets/assets";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";
import CeibroLogo from "components/material-ui/icons/CeibroLogo/CeibroLogo";
import CeibroMobileLogo from "components/material-ui/icons/CeibroLogo/CeibroMobileLogo";

const AuthLayout = (props: any) => {
  const classes = useStyles();
  const isTabletOrMobile = useResponsive("down", "md", "");

  return (
    <Grid container className={classes.register}>
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        px={1.2}
        className={`${classes.form} hide-scrollbar`}
      >
        <CBox className={"logoTitleWrapper"}>
          <div className={classes.logoWrapper}>
            {!isTabletOrMobile ? <CeibroLogo /> : <CeibroMobileLogo />}
          </div>
          <div className={classes.titleWrapper}>
          <div>
            <TopBarTitle className={classes.titleText} sx={{ fontSize: 28, }}>{props.title}</TopBarTitle>
            {props.subTitle && (
              <SubLabelTag sx={{ fontSize: 16 }}>{props.subTitle}</SubLabelTag>
            )}
          </div>
          <Box
          className={classes.contentContainer}
            sx={{
              background: "white",
              padding: "0 6px",
              borderRadius: "10px",
            }}
          >
            {props.children}
          </Box>
          </div>
          
          
        </CBox>
      </Grid>

      {!isTabletOrMobile && (
        <Grid item md={6} lg={8} className={classes.tileWrapper}>
          <ImageTile />
        </Grid>
      )}
    </Grid>
  );
};

export default AuthLayout;
