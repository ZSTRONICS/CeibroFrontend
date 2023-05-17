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
import { useHistory } from "react-router-dom";

const AuthLayout = (props: any) => {
  const classes = useStyles();
  const isTabletOrMobile = useResponsive("down", "md", "");
  const { location } = useHistory();
  const authRoute =
    location.pathname.includes("register") ||
    location.pathname.includes("confirmation");
  const showBg =
    location.pathname.includes("t&c") ||
    location.pathname.includes("profile-setup") ||
    location.pathname.includes("profile-pic");
  return (
    <Grid container className={classes.register}>
      <Grid
        item
        xs={12}
        md={5}
        lg={4}
        px={1.2}
        className={`${classes.form} hide-scrollbar`}
      >
        <CBox className={"logoTitleWrapper"}>
          <div className={classes.logoWrapper}>
            {!isTabletOrMobile ? <CeibroLogo /> : <CeibroMobileLogo />}
          </div>
          <div
            className={`${classes.titleWrapper} ${
              authRoute && classes.titleWrapperWithRoute
            } ${showBg &&classes.titleWrapperbg}`}
          >
            <div>
              <TopBarTitle className={classes.titleText} sx={{ fontSize: 28 }}>
                {props.title}
              </TopBarTitle>
              {props.subTitle && (
                <SubLabelTag sx={{ fontSize: 16 }}>
                  {!isTabletOrMobile && props.subTitle}
                </SubLabelTag>
              )}
            </div>
            <Box
              className={`${classes.contentContainer} ${
                authRoute && classes.contentContainerWithRoute
              } ${
                showBg &&
                classes.contentContainerPosition
              }`}
              sx={{
                background: "white",
                borderRadius: "10px",
              }}
            >
              {props.children}
            </Box>
          </div>
        </CBox>
      </Grid>

      {!isTabletOrMobile && (
        <Grid item md={7} lg={8} className={classes.tileWrapper}>
          <ImageTile />
        </Grid>
      )}
    </Grid>
  );
};

export default AuthLayout;
