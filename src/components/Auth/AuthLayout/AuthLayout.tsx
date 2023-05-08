import { Grid } from "@material-ui/core";
import { CBox } from "components/material-ui";
import useResponsive from "hooks/useResponsive";
import ImageTile from "../Login/ImageTile";
import useStyles from "../Register/RegisterStyles";

const AuthLayout = (props:any) => {
  const classes = useStyles();
  const isTabletOrMobile = useResponsive('down', 'md', "");

  return (
    <Grid container className={classes.register}>
      <Grid
        item
        xs={12}
        lg={4}
        className={`${classes.form} hide-scrollbar`}
      >
        <CBox className={"logoTitleWrapper"}>
        {props.children}
        </CBox>
      </Grid>

      {!isTabletOrMobile && (
        <Grid item xs={12} md={6} lg={8} className={classes.tileWrapper}>
          <ImageTile />
        </Grid>
      )}
    </Grid>
  );
};

export default AuthLayout;
