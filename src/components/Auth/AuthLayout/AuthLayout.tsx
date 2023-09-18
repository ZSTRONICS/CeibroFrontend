import { Box, Grid } from "@mui/material";
import assets from "assets/assets";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";
import { CBox } from "components/material-ui";
import CeibroLogo from "components/material-ui/icons/CeibroLogo/CeibroLogo";
import CeibroMobileLogo from "components/material-ui/icons/CeibroLogo/CeibroMobileLogo";
import useResponsive from "hooks/useResponsive";
import { useRouteMatch } from "react-router-dom";
import useStyles from "../Register/RegisterStyles";

interface Iprops {
  title: string;
  subTitle?: string | any;
  children: any;
}
const AuthLayout = (props: Iprops) => {
  const classes = useStyles();
  const isTabletOrMobile = useResponsive("down", "md", "");

  const authRoute = useRouteMatch([
    "/register",
    "/forgot-password",
    "/reset-password",
    "/confirmation",
  ]);
  const showBg = useRouteMatch(["/profile-pic", "/profile-setup", "/t&c"]);
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
            } ${showBg && classes.titleWrapperbg}`}
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
              } ${showBg && classes.contentContainerPosition}`}
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
        <Grid
          item
          md={7}
          lg={8}
          sx={{
            width: "100%",
            height: "100vh",
            background: `url(${assets.visualWebp}) no-repeat`,
            backgroundSize: "100% 100vh",
          }}
        ></Grid>
      )}
    </Grid>
  );
};

export default AuthLayout;
