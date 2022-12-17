import React from "react";
import { createStyles, makeStyles, Avatar, Theme } from "@material-ui/core";
import colors from "assets/colors";
import { Box } from '@mui/material'

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
  return (<><Box ml={1}>
    {!url ?
      <Avatar variant="square" className={`${classes.MuiAvatarSquare} ${classes.small}`}>
        {letters}
      </Avatar> : <Avatar alt="avater" src={url} variant="square" className={classes.small} />
    }
  </Box>
  </>
  );
};

export default SeenBy;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: 20,
      height: 20,
      borderRadius: '50% !important',
    },
    MuiAvatarSquare: {
      border: `1px solid ${colors.secondaryGrey}`,
      background: colors.secondaryGrey,
      borderRadius: "4px",
      color: colors.black,
      fontSize: "12px",
      fontWeight: 500,
      textTransform: "uppercase",
    }
  }));
