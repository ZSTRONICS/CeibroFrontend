import React from "react";
import {  makeStyles, Box } from "@material-ui/core";
import colors from "../../../assets/colors";
import Avatar from "@material-ui/core/Avatar";

interface NameAvatarProps {
  firstName: string;
  surName?: string;
  background?: string;
  url?: string;
  variant?: "small" | "large" | "custom";
}

const NameAvatar: React.FC<NameAvatarProps> = (props) => {
  const classes = useStyles();
  const { firstName, surName, url } = props;
  const letters =
    firstName?.[0]?.toUpperCase?.() + (surName?.[0]?.toUpperCase?.() || "");

  return (
    <>
      <Box>
        {!url ?
          <Avatar variant="square" className={classes.MuiAvatarSquare}>
            {letters}
          </Avatar> : <Avatar alt="avater" src={url}  variant="square"  />
        }
      </Box>
    </>
  );
};

export default NameAvatar;

const useStyles =makeStyles({
    MuiAvatarSquare: {
      border: `1px solid ${colors.secondaryGrey}`,
      background: colors.secondaryGrey,
      borderRadius: "4px",
      color: colors.black,
      fontSize: "14px",
      fontWeight: 500,
      textTransform: "uppercase",
    }
  });
