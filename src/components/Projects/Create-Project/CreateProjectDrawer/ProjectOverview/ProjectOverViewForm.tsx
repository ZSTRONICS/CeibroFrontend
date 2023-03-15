// import { Grid } from "@mui/material";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import projectActions from "redux/action/project.action";
// import { RootState } from "redux/reducers";
// import AuthReducer from "redux/reducers/auth.reducer";
// import InputText from "../../../../Utills/Inputs/InputText";
// import InputTextArea from "../../../../Utills/Inputs/InputTextArea";

// const ProjectOverViewForm = () => {
//   const dispatch = useDispatch();
//   const projectOverview = useSelector(
//     (state: RootState) => state.project.projectOverview
//   );

//   // const handleTitleChange = (e: any) => {
//   //   dispatch(
//   //     projectActions.setProjectOverview({
//   //       ...projectOverview,
//   //       title: e.target.value,
//   //     })
//   //   );
//   // };
//   // const handleLocationChange = (e: any) => {
//   //   dispatch(
//   //     projectActions.setProjectOverview({
//   //       ...projectOverview,
//   //       location: e.target.value,
//   //     })
//   //   );
//   // };

//   const handleDescriptionChange = (e: any) => {
//     dispatch(
//       projectActions.setProjectOverview({
//         ...projectOverview,
//         description: e.target.value,
//       })
//     );
//   };

//   return (
//     <Grid container>
//       {/* <Grid
//         item
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           marginTop: "15px",
//           width: "100%",
//           maxWidth: "700px",
//           paddingLeft: "40px",
//         }}
//       >
//         <Grid item
//         // xs={12}
//         >
//           <InputText
//             onChange={handleTitleChange}
//             name="title"
//             placeholder="Enter Project title"
//             value={projectOverview.title || ""}
//             disabled={projectOverview.isDefault ? true : false}
//           />
//         </Grid>

//         <Grid
//           item
//           // xs={12}
//           // style={styles.inputWrapper}
//         >
//           <InputText
//             onChange={handleLocationChange}
//             name="location"
//             placeholder="Enter a location address"
//             value={projectOverview.location || ""}
//           />
//         </Grid>
//       </Grid> */}

//       <Grid
//         item
//         // xs={12}
//         sx={{
//           marginTop: "30px",
//           marginLeft: "45px",
//           width: "100%",
//           maxWidth:"940px",
//           display: "flex",
//           // flexDirection: "row",
//           "@media(max-width:1125px)": {
//             marginLeft: "0px",
//           },
//         }}
//       >
//         <InputTextArea
//           onChange={handleDescriptionChange}
//           name="description"
//           placeholder="Enter project description"
//           value={projectOverview.description}
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default ProjectOverViewForm;

import { colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Grid, TextField } from "@mui/material";
import { CBox } from "components/material-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions from "redux/action/project.action";
import { RootState } from "redux/reducers";
import AuthReducer from "redux/reducers/auth.reducer";
import InputText from "../../../../Utills/Inputs/InputText";
import InputTextArea from "../../../../Utills/Inputs/InputTextArea";

const ProjectOverViewForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const projectOverview = useSelector(
    (state: RootState) => state.project.projectOverview
  );

  const handleTitleChange = (e: any) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        title: e.target.value,
      })
    );
  };
  const handleLocationChange = (e: any) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        location: e.target.value,
      })
    );
  };

  const handleDescriptionChange = (e: any) => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        description: e.target.value,
      })
    );
  };

  return (
    <Grid container className={classes.outerWrapper}>
      <Grid
        item
        xs={12}
        // sx={{
        //   width:"700px",
        // }}
      >
        <InputText
          className={classes.input}
          onChange={handleTitleChange}
          name="title"
          placeholder="Enter Project title"
          value={projectOverview.title || ""}
          disabled={projectOverview.isDefault ? true : false}
        />
      </Grid>
      <br />
      <Grid item xs={12} style={styles.inputWrapper}>
        <InputText
          className={classes.input}
          onChange={handleLocationChange}
          name="location"
          placeholder="Enter a location address"
          value={projectOverview.location || ""}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="standard-multiline-flexible"
          placeholder="Enter project description"
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
          onChange={handleDescriptionChange}
          value={projectOverview.description}
        />
        {/* <CBox className={classes.titleLabel}>Description</CBox> */}

        {/* <InputTextArea
          onChange={handleDescriptionChange}
          name="description"
          placeholder="Enter project description"
          value={projectOverview.description}
        /> */}
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
    "& .css-8q2m5j-MuiInputBase-root-MuiInput-root:after": {
      borderBottom: "none",
    },
    "& .css-8q2m5j-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before":
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
