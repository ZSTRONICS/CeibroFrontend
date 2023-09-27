import { Box, CircularProgress, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import assets from "assets/assets";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateProfilePicture } from "redux/action/auth.action";
import colors from "../../assets/colors";

interface Props {
  profilePic: string | undefined | null | any;
}

const ProfileImagePicker: React.FC<Props> = (props) => {
  const { profilePic } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | any>(
    profilePic ? profilePic : assets.blueUser
  );

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  // useEffect(() => {
  //   if (profilePic) {
  //     setImageUrl(profilePic);
  //   }
  // }, [profilePic]);

  const handleClick = () => {
    if (ref.current !== null) {
      ref.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setShowLoader(true);

      const formData = new FormData();
      if (e.target.files) {
        const localFile = e.target.files[0];
        formData.append("profilePic", localFile);
        const payload = {
          body: formData,
          onFailAction: (err: any) => {
            setShowLoader(false);
            if (err) {
              console.error("Failed to upload image");
            }
          },
          success: (res: any) => {
            setShowLoader(false);
            if (res.status === 200) {
              setImageUrl(res.data.profilePic);
            }
          },
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
        className={classes.inputFile}
        type="file"
        onChange={handleFileChange}
      />
      <div
        onClick={handleClick}
        className={classes.outerWrapper}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {showLoader === true && (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={40} />
          </Box>
        )}
        <img
          src={assets.whitePencil}
          className={`width-16 ${classes.icon} imgPicker`}
          alt="edit"
        />
      </div>
    </Grid>
  );
};

export default ProfileImagePicker;

const useStyles = makeStyles({
  outerWrapper: {
    marginTop: "8px",
    border: `1px solid ${colors.purpleGrey}`,
    height: 200,
    maxWidth: "100%",
    position: "relative",
    cursor: "pointer",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    color: colors.white,
    background: colors.primary,
    padding: 2,
  },
  inputFile: {
    visibility: "hidden",
  },
});
