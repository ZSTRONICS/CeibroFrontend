import React from "react";
import {createStyles,Avatar, makeStyles, Theme, Box } from "@material-ui/core";
import colors from "assets/colors";

interface SeenByInt {
  url: string | any;
  firstName: string;
  surName: string;
}

const SeenBy: React.FC<SeenByInt> = (props) => {
  const { url, firstName, surName } = props;
  const classes = useStyles();

  const letters =
    firstName?.[0]?.toUpperCase?.() + (surName?.[0]?.toUpperCase?.() || "");
  return (<><Box>
        {!url ?
          <Avatar variant="square" className={`${classes.MuiAvatarSquare} ${classes.small}`}>
            {letters}
          </Avatar> : <Avatar alt="avater" src={url}  variant="square"  className={classes.small}/>
        }
       </Box>
  </>
  );
};

export default SeenBy;

const useStyles =  makeStyles((theme: Theme) =>
createStyles({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  MuiAvatarSquare:{
    border: `1px solid ${colors.secondaryGrey}`,
    background: colors.secondaryGrey,
    borderRadius: "4px",
    color: colors.black,
    fontSize: "14px",
    fontWeight: 500,
    textTransform: "uppercase",
  }
}));
