import { Box, CircularProgress, Grid } from "@mui/material";
import assets from "assets/assets";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { UpdateProfilePicture } from "redux/action/auth.action";
import colors from "../../assets/colors";

interface Props {
  profilePic: string | undefined | null | any;
  profilePicUploading: boolean;
}

const ProfileImagePicker: React.FC<Props> = (props) => {
  const { profilePic, profilePicUploading } = props;
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (ref.current !== null) {
      ref.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target.files) {
        const localFile = e.target.files[0];
        formData.append("profilePic", localFile);
        const payload = {
          body: formData,
        };
        dispatch(UpdateProfilePicture(payload));
      }
    } catch (error) {
      console.error("Error occurred while uploading image:", error);
    }
  };

  return (
    <Grid item xs={6} sm={4} md={2}>
      <input
        ref={ref}
        id="files"
        accept="image/*"
        style={{ visibility: "hidden" }}
        type="file"
        onChange={handleFileChange}
      />
      <div
        onClick={handleClick}
        style={{
          marginTop: "8px",
          border: `1px solid ${colors.purpleGrey}`,
          height: 200,
          maxWidth: "100%",
          position: "relative",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundImage: `url(${profilePic ? profilePic : assets.blueUser})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {profilePicUploading && (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={40} />
          </Box>
        )}
        <svg
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            padding: 2,
            backgroundColor: "whitesmoke",
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
            fill="#0076C8"
          />
        </svg>
      </div>
    </Grid>
  );
};

export default ProfileImagePicker;
