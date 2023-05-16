import React from "react";
import { makeStyles } from "@material-ui/core";
import colors from "../../../assets/colors";
import { Box, Avatar } from "@mui/material";
interface NameAvatarProps {
  firstName: string;
  surName?: string;
  background?: string;
  url?: string;
  variant?: "circular" | "rounded" | "square";
  size?: "small";
}

const NameAvatar: React.FC<NameAvatarProps> = (props) => {
  const classes = useStyles();
  const { firstName, surName, url } = props;

  function stringAvatar(name: string) {
    const [firstName, lastName] = name.split(" ");
    const firstInitial = firstName ? firstName[0] : "";
    const lastInitial = lastName ? lastName[0] : "";
    return {
      children: `${firstInitial}${lastInitial}` || "NA",
    };
  }

  return (
    <>
      <Box>
        {url&&url!=='undefined' ? (
          <Avatar
            alt="avater"
            src={url}
            variant={props.variant || "rounded"}
            {...props}
          />
        ) : (
          <Avatar
            variant={props.variant || "rounded"}
            className={classes.MuiAvatarSquare}
            {...props}
            {...stringAvatar(`${firstName} ${surName}`)}
          />
        )}
      </Box>
    </>
  );
};

export default NameAvatar;

const useStyles = makeStyles({
  MuiAvatarSquare: {
    border: `1px solid ${colors.secondaryGrey}`,
    background: colors.secondaryGrey,
    borderRadius: "4px",
    color: colors.black,
    fontSize: "14px",
    fontWeight: 500,
    textTransform: "uppercase",
  },
});
