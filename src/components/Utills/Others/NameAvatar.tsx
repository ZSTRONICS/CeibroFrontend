import { Avatar, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
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
  const { firstname, surname, url } = props;
  function stringAvatar(name: string) {
    const [firstname, lastName] = name.split(" ");
    const firstInitial = firstname ? firstname[0] : "";
    const lastInitial = lastName ? lastName[0] : "";
    return {
      children: `${firstInitial}${lastInitial}` || "NA",
    };
  }
  const avatarProps = {
    variant: props.variant || "rounded",
    alt: `${firstname} ${surname}`,
    ...props,
  };
  return (
    <>
      <Box>
        {url ? (
          <Avatar id="pic-avatar" srcSet={url} {...avatarProps} />
        ) : (
          <AvatarStyle
            id="name-avatar"
            {...stringAvatar(`${firstname} ${surname}`)}
            {...avatarProps}
          />
        )}
      </Box>
    </>
  );
};

export default NameAvatar;

const AvatarStyle = styled(Avatar)`
  background: rgb(222, 226, 230);
  border-radius: 4px;
  color: black;
  letter-spacing: 2px;
  font-family: "Inter";
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
`;
