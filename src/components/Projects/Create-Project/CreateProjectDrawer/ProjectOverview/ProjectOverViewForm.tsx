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

import { makeStyles } from "@material-ui/styles";
import { Grid } from "@mui/material";
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
      <Grid item xs={12}>
        <InputText
          className={classes.input}
          onChange={handleTitleChange}
          name="title"
          placeholder="Enter Project title"
          value={projectOverview.title || ""}
          disabled={projectOverview.isDefault ? true : false}
        />
      </Grid>

      <Grid item xs={12} style={styles.inputWrapper}>
        <InputText
          className={classes.input}
          onChange={handleLocationChange}
          name="location"
          placeholder="Enter a location address"
          value={projectOverview.location || ""}
        />
      </Grid>

      <Grid item xs={12} style={styles.description}>
        <InputTextArea
          onChange={handleDescriptionChange}
          name="description"
          placeholder="Enter project description"
          value={projectOverview.description}
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
    paddingLeft: "25px",
    "@media(max-width:900px)": {
      paddingLeft: "0px",
    },
  },
  input: {
    height: "45px",
  },
});
