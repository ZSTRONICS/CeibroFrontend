import React from "react";
import { makeStyles } from "@material-ui/core";
import { Avatar, Grid, TextField } from "@mui/material";
import colors from "assets/colors";
import { UserInterface } from "constants/interfaces/user.interface";

interface Props{
    userData:UserInterface
}

function ProfileViewGlobal({userData}:Props) {
  const classes = useStyles();
  let smPoint = 11;

  const avatarLetter = userData?.firstName
    && userData.firstName?.[0]?.toUpperCase?.() +
      (userData.surName?.[0]?.toUpperCase?.() || "")
  
  return (
    <>
      <Grid
        container
        className={classes.wrapper}
        justifyContent="center"
        rowGap={3}
        pb={2}
      >
        <Grid
          item
          container
          className={classes.wrapper}
          justifyContent="center"
        >
          <Grid item className={classes.imgWrapper} md={3}>
            {userData.profilePic ? (
              <Avatar
                alt="avater"
                  src={userData.profilePic}
                variant="rounded"
                sx={{ width: "100px", height: "100px" }}
              />
            ) : (
              <Avatar
                variant="rounded"
                sx={{ width: "100px", height: "100px" }}>
                {avatarLetter}
              </Avatar>
            )}
          </Grid>
          <Grid
            item
            container
            flexDirection="column"
            md={9}
            sm={smPoint}
            rowGap={3}
          >
            <Grid item sx={{ marginTop: "5px" }}>
              <TextField
                outlined-read-only-input
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  width: "100%",
                  padding: "0 39px 0 0",
                  marginLeft: "15px",
                }}
                id="outlined-basic"
                size="small"
                label="Name"
                variant="outlined"
                  defaultValue={userData.firstName || "N/A"}
              />
            </Grid>

            <Grid item>
              <TextField
                outlined-read-only-input
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  width: "100%",
                  padding: "0 39px 0 0",
                  marginLeft: "15px",
                }}
                id="outlined-basic"
                size="small"
                label="Surname"
                variant="outlined"
                  defaultValue={userData?.surName || "N/A"}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={smPoint} lg={12} mr={3}>
          <TextField
            outlined-read-only-input
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: "100%" }}
            id="outlined-basic"
            size="small"
            label="Email"
            variant="outlined"
              defaultValue={userData?.email||"N/A"}
          />
        </Grid>
        <Grid md={12} sm={smPoint} mr={3}>
          <TextField
            outlined-read-only-input
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: "100%" }}
            id="outlined-basic"
            size="small"
            label="Company"
            variant="outlined"
              defaultValue={userData?.companyName || "N/A"}
          />
        </Grid>
        {userData?.name&&<Grid md={12} sm={smPoint} mr={3}>
          <TextField
            outlined-read-only-input
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: "100%" }}
            id="outlined-basic"
            size="small"
            label="Work email"
            variant="outlined"
              defaultValue={userData?.workEmail || "N/A"}
          />
        </Grid>}
        <Grid lg={12} sm={smPoint} mr={3}>
          <TextField
            outlined-read-only-input
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: "100%" }}
            id="outlined-basic"
            size="small"
            label="Phone number"
            variant="outlined"
              defaultValue={userData?.phone || "N/A"}
          />
        </Grid>
     
      {!userData?.name&&  <Grid md={12} sm={smPoint} mr={3}>
          <TextField
            outlined-read-only-input
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: "100%" }}
            id="outlined-basic"
            size="small"
            label="VAT"
            variant="outlined"
              defaultValue={userData?.companyVat || "N/A"}
          />
        </Grid>}
        {!userData?.name&& <Grid md={12} sm={smPoint} mr={3}>
          <TextField
            outlined-read-only-input
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: "100%" }}
            id="outlined-basic"
            size="small"
            label="Location"
            variant="outlined"
              defaultValue={userData?.companyLocation || "N/A"}
          />
        </Grid>}
        <Grid md={12} sm={smPoint} mr={3}>
          <TextField
            outlined-read-only-input
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: "100%" }}
            id="outlined-basic"
            size="small"
            label="Work phone"
            variant="outlined"
              defaultValue={userData?.companyPhone|| "N/A"}
          />
        </Grid>
       {userData?.regDate&& <Grid md={12} sm={smPoint} mr={3}>
          <TextField
            outlined-read-only-input
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: "100%" }}
            id="outlined-basic"
            size="small"
            label="Reg. date"
            variant="outlined"
              defaultValue={userData?.regDate|| "N/A"}
          />
        </Grid>}
      </Grid>
    </>
  );
}

export default ProfileViewGlobal;

const useStyles = makeStyles({
  titleWrapper: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 0,
    paddingTop: 2,
    alignItems: "center",
  },
  ProfileAvatar: {
    width: "200px",
    height: "200px",
  },
  wrapper: {
    // border: "1px solid black",
    overflowX: "hidden",
    marginLeft: "20px",
    width: "100%",
    maxWidth: "450px",
  },
  imgWrapper: {
    display: "flex",
    flexDirection: "row",
    // maxWidth: 80,
    // maxHeight: 80,
  },
  img: {
    width: "100%",
  },
  close: {
    color: colors.primary,
    cursor: "pointer",
  },
  btn: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  btnWrapper: {
    // textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `25px 0px`,

    "@media (max-width:960px)": {
      flexDirection: "column",
      flexWrap: "wrap",
    },
    "@media (max-width:450px)": {
      overflow: "hidden",
    },
  },
  detailRow: {
    display: "flex",
    paddingTop: 5,
    gap: 30,
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  value: {
    fontSize: 14,
    fontWeight: 500,
  },
  companyRow: {
    paddingTop: 40,
  },
  email: {
    color: colors.textPrimary,
  },
  centerBtn: {
    "@media (max-width:960px)": {
      marginTop: "20px",
    },
  },
});
