import React from "react";
import {  makeStyles } from "@material-ui/core";
import colors from "../../../assets/colors";
import {Avatar} from "@material-ui/core";
import {Box} from '@mui/material'
interface NameAvatarProps {
  firstName: string;
  surName?: string;
  background?: string;
  url?: string;
  variant?: "small" | "large" | "custom" | "rounded" ;
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
          <Avatar variant= "rounded" className={classes.MuiAvatarSquare} >
            {letters}
          </Avatar> : <Avatar alt="avater" src={url}  variant= "rounded" />
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
