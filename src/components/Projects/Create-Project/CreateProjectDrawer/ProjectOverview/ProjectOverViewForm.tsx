import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import projectActions from "redux/action/project.action";
import { RootState } from "redux/reducers/appReducer";
import InputText from "../../../../Utills/Inputs/InputText";
import { Member } from "constants/interfaces/ProjectRoleMemberGroup.interface";

const ProjectOverViewForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const projectOverview = useSelector(
    (state: RootState) => state.project.projectOverview
  );

  const updateRights = projectOverview.owner.some(
    (item: Member) => String(item._id) === String(user._id)
  );
  const [formData, setFormData] = useState({
    title: projectOverview.title,
    location: projectOverview.location,
    description: projectOverview.description,
  });
  useEffect(() => {
    setFormData({
      title: projectOverview.title,
      location: projectOverview.location,
      description: projectOverview.description,
    });
  }, [projectOverview]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleTitleBlur = (e: any) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        title: formData.title,
      })
    );
  };
  const handleLocationBlur = (e: any) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        location: formData.location,
      })
    );
  };

  const handleDescriptionBlur = (e: any) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        description: formData.description,
      })
    );
  };

  return (
    <Grid container className={classes.outerWrapper}>
      <Grid item xs={12}>
        <InputText
          className={classes.input}
          name="title"
          placeholder="Enter title"
          value={formData.title || ""}
          onChange={handleInputChange}
          onBlur={handleTitleBlur}
          disabled={
            projectOverview.isDefault
              ? true
              : updateRights === true
              ? false
              : true
          }
        />
      </Grid>
      <br />
      <Grid item xs={12} style={styles.inputWrapper}>
        <InputText
          className={classes.input}
          value={formData.location || ""}
          onChange={handleInputChange}
          onBlur={handleLocationBlur}
          name="location"
          placeholder="Enter address"
          disabled={
           updateRights === true
              ? false
              : true
          }
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          sx={{
            "& .css-8q2m5j-MuiInputBase-root-MuiInput-root.Mui-disabled:before":
              {
                borderBottomStyle: "none",
              },
          }}
          id="standard-multiline-flexible"
          placeholder="Enter description"
          multiline
          maxRows={5}
          minRows={5}
          name="description"
          className={classes.textfield}
          style={{
            border: "1px solid #DBDBE5",
            width: "100%",
            marginTop: "20px",
            backgroundColor: "white",
            borderRadius: "4px",
            padding: "10px",
          }}
          variant="standard"
          onBlur={handleDescriptionBlur}
          value={formData.description || ""}
          onChange={handleInputChange}
          disabled={
            updateRights === true
              ? false
              : true
          }
        />
      </Grid>
    </Grid>
  );
};

export default ProjectOverViewForm;

const styles = {
  inputWrapper: {
    marginTop: 15,
  },
  description: {
    marginTop: 15,
    width: "100%",
    maxWidth: "900px",
  },
};
const useStyles = makeStyles({
  outerWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "25px",
    "@media(max-width:900px)": {
      paddingLeft: "0px",
    },
  },
  input: {
    height: "45px",
  },
  textArea: {
    // width: "100%",
    padding: 15,
    borderRadius: 5,
  },
  textfield: {
    // FOR DEV SERVER
    "& .css-17g51r8:hover:not(.Mui-disabled)::before": {
      borderBottom: "none",
    },

    "& .css-17g51r8::before": {
      borderBottom: "none",
    },
    "& .css-17g51r8::after": {
      borderBottom: "none",
    },
    // FOR LOCAL
    "& :hover:not(.Mui-disabled)::before": {
      borderBottom: "none",
    },
    "& .css-8q2m5j-MuiInputBase-root-MuiInput-root:after, .MuiInputBase-root-MuiInput-root:after":
      {
        borderBottom: "none",
      },
    "& .css-8q2m5j-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before, .MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before ":
      {
        borderBottom: "none",
      },
    "& .css-8q2m5j-MuiInputBase-root-MuiInput-root:before": {
      borderBottom: "none",
    },
  },

  // titleLabel: {
  //   position: "absolute",
  //   top: "-10px",
  //   backgroundColor: "#fff",
  //   left: 11,
  //   color: "#605C5C",
  //   fontSize: 12,
  //   fontFamily: "Inter",
  //   fontWeight: 600,
  // },
});
