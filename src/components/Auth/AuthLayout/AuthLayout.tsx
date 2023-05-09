import { Grid } from "@mui/material";
import { CBox } from "components/material-ui";
import useResponsive from "hooks/useResponsive";
import ImageTile from "../Login/ImageTile";
import useStyles from "../Register/RegisterStyles";
import { Typography } from "@mui/material";
import assets from "assets/assets";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";

const AuthLayout = (props:any) => {
  const classes = useStyles();
  const isTabletOrMobile = useResponsive('down', 'md', "");

  return (
    <Grid container className={classes.register}>
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
       px={2}
        className={`${classes.form} hide-scrollbar`}
      >
        <CBox className={"logoTitleWrapper"}>
        <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>
      <div className={classes.titleWrapper}>
        <TopBarTitle sx={{fontSize:28}}>
          {props.title}
        </TopBarTitle>
       {props.subTitle&& <SubLabelTag sx={{fontSize:16}}>
        {props.subTitle}
        </SubLabelTag>}
      </div>
      
        {props.children}
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
