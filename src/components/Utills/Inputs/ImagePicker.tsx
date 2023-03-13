import { makeStyles } from "@material-ui/core";
import React, { useRef, useState } from "react";
import colors from "../../../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  getProjectDetail,
  updateProjectPicture,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import assets from "assets/assets";
import { toast } from "react-toastify";
import { ProjectInterface } from "constants/interfaces/project.interface";

const ImagePicker = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(
    "https://lh3.googleusercontent.com/proxy/ten4SpJ9QmAd8hrlUGL5gWjVehpKHpO-SJskSTYNRF48cVO69HJdP5NaW_TOGDl2gOKmw1hcFIrlCqRZES_KPYuiGxgQ31L1vqw7o_HVX-uTaPQEq5qWG2jfpYCu"
  );

  const projectOverview: ProjectInterface = useSelector(
    (state: RootState) => state.project.projectOverview
  );

  const { selectedProject } = useSelector((state: RootState) => state.project);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (ref.current !== null) {
      ref.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      const myUrl = URL.createObjectURL(e.target.files[0]);
      setUrl(myUrl);

      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          projectPhoto: myUrl,
          photoFile: e.target?.files[0],
        })
      );

      if (selectedProject) {
        const formdata = new FormData();
        formdata.append("profilePic", e?.target?.files?.[0]);

        dispatch(
          updateProjectPicture({
            body: formdata,
            success: () => {
              dispatch(getProjectDetail());
              toast.success("project pic updated");
            },
            other: selectedProject,
          })
        );
      }
    }
  };

  return (
    <>
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
          margin: "0 auto",
          background: `url(${
            projectOverview.projectPhoto === "undefined"
              ? assets.Defaulttask
              : projectOverview.projectPhoto
          })`,
        }}
      >
        <img className={`w-16 ${classes.icon}`} src={assets.pencilFilled} alt=""/>
      </div>
    </>
  );
};

export default ImagePicker;

const useStyles = makeStyles({
  outerWrapper: {
    borderRadius: "4px",
    border: `1px solid ${colors.purpleGrey}`,
    height: "120px",
    width: "140px",
    position: "relative",
    cursor: "pointer",
    backgroundSize: "cover !important",
    backgroundPosition: "center !important",
  },
  icon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    color: colors.white,
    background: colors.primary,
    padding: 2,
    height: 28,
    width: 28,
  },
  inputFile: {
    visibility: "hidden",
  },
});
