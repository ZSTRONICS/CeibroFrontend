import { Avatar, Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
interface NameAvatarProps {
  firstname: string;
  surname?: string;
  background?: string;
  url?: string;
  variant?: "circular" | "rounded" | "square";
  size?: "small";
}

const NameAvatar: React.FC<NameAvatarProps> = (props) => {
  // const classes = useStyles();
  const { firstname, surname, url } = props;
  function stringAvatar(name: string) {
    const [firstname, lastName] = name.split(" ");
    const firstInitial = firstname ? firstname[0] : "";
    const lastInitial = lastName ? lastName[0] : "";
    return {
      children: `${firstInitial}${lastInitial}` || "NA",
    };
  }

  return (
    <>
      <Box>
        {url ? (
          <Avatar
            id="pic-avatar"
            alt={`${firstname} ${surname}`}
            src={url}
            variant={props.variant || "rounded"}
            {...props}
          />
        ) : (
          <AvatarStyle
            id="name-avatar"
            variant={props.variant || "rounded"}
            {...props}
            {...stringAvatar(`${firstname} ${surname}`)}
          />
        )}
      </Box>
    </>
  );
};

export default NameAvatar;

// const useStyles = makeStyles({
//   MuiAvatarSquare: {
//     border: `1px solid ${colors.secondaryGrey}`,
//     background: colors.secondaryGrey,
//     borderRadius: "4px",
//     color: colors.black,
//     fontSize: "14px",
//     fontWeight: 500,
//     textTransform: "uppercase",
//   },
// });

const AvatarStyle = styled(Avatar)`
  border: 1px solid rgb(222, 226, 230);
  background: rgb(222, 226, 230);
  border-radius: 4px;
  color: black;
  font-size: "14px";
  font-weight: 500;
  text-transform: uppercase;
`;
