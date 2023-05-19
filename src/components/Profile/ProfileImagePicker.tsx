import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import colors from "../../assets/colors";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UpdateProfilePicture } from "redux/action/auth.action";
import assets from "assets/assets";
import { Grid } from "@mui/material";

interface Props {
  profilePic: string | undefined | null;
}

const ProfileImagePicker: React.FC<Props> = (props) => {
  const { profilePic } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string | null | undefined>();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (profilePic) {
      setUrl(profilePic);
    }
  }, []);

  const handleClick = () => {
    if (ref.current !== null) {
      ref.current.click();
    }
  };

  const handleFileChange =(e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if(e.target.files ){
        const localFile = e.target.files[0];
        setUrl(URL.createObjectURL(localFile));
        formData.append('profilePic', localFile);
        const payload = {
          body: formData,
          onFailAction: (err: any) => {
            if (err) {
              console.error('Failed to upload image');
            }
          },
        };
       dispatch(UpdateProfilePicture(payload));
      }
    } catch (error) {
      console.error('Error occurred while uploading image:', error);
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
        style={{ backgroundImage: `url(${url})` }}
      >
        <img
          src={assets.whitePencil}
          className={`width-16 ${classes.icon}`}
          alt="edit"
        />
      </div>
    </Grid>
  );
};

export default ProfileImagePicker;

const useStyles = makeStyles({
  outerWrapper: {
    marginTop:'8px',
    border: `1px solid ${colors.purpleGrey}`,
    height: 200,
    maxWidth: "100%",
    position: "relative",
    cursor: "pointer",
    backgroundSize: "100% 100%",
    backgroundRepeat:'no-repeat'
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
