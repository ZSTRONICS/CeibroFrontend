import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";

import CButton from "components/Button/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserById } from "redux/action/user.action";
import colors from "../../assets/colors";
import { createSingleRoom } from "../../redux/action/chat.action";
import taskActions from "../../redux/action/task.action";
import {
  deleteMyConnection,
  getMyConnections,
} from "../../redux/action/user.action";
import { useMediaQuery } from "react-responsive";

interface IViewProfileProps {
  userId: string;
  disabled: boolean;
  connectionId: string;
}

const ViewProfile: React.FunctionComponent<IViewProfileProps> = (props) => {
  const { userId, disabled, connectionId } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [getUser, setGetUser] = useState<any>({});
  const dispatch = useDispatch();
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const handleToggle = () => {
    const payload = {
      success: (val: any) => {
        setGetUser(val.data);
        setOpen(!open);
      },
      other: {
        userId,
      },
    };
    dispatch(getUserById(payload));
  };
  const openTaskModal = () => {
    dispatch(taskActions.openNewTaskModal());
  };

  const handleDelete = () => {
    const id: string = connectionId;
    const payload: any = {
      other: {
        id,
      },
      params: {
        isEmailInvited: false,
      },
      success: () => dispatch(getMyConnections()),
    };
    dispatch(deleteMyConnection(payload));
    handleToggle();
  };

  const startRoom = () => {
    const payload = {
      other: { id: getUser?._id },
      success: () => history.push("chat"),
    };
    dispatch(createSingleRoom(payload));
  };
  const letters =
    getUser.firstName?.[0]?.toUpperCase?.() +
    (getUser.surName?.[0]?.toUpperCase?.() || "");

  // const user = {
  //   image:
  //     "https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg",
  //   name: "Kristo",
  //   surname: "Vaughn",
  //   email: "abc123@gmail.com",
  //   contact: "+372 5679 8908",
  //   company: "My company Ltd.",
  //   vat: "1324343554",
  //   location: "Vesse 12, Tallinn, Harjumaa 12345",
  // };
  let smPoint = 11;
  return (
    <>
      <Button
        sx={{
          textTransform: "capitalize",
          "@media(max-width:960px)": {
            marginTop: "10px",
          },
        }}
        onClick={handleToggle}
        className={`${classes.btn} ${classes.centerBtn}`}
        variant="outlined"
        size={isTabletOrMobile ? "small" : "medium"}
        color="primary"
        disabled={disabled}
      >
        View profile
      </Button>

      <Dialog onClose={handleToggle} open={open}>
        <DialogTitle>
          <div className={classes.titleWrapper}>
            <div className={classes.imgWrapper}>
              Profile
              {/* {getUser?.profilePic && (
                <NameAvatar
                  firstName={getUser?.firstName}
                  surName={getUser?.surName}
                  url={getUser?.profilePic || ""}
                  variant="large"
                />
              )} */}
            </div>
            <CButton label="Close" variant="outlined" onClick={handleToggle} />
          </div>
        </DialogTitle>

        <Divider sx={{ margin: "5px 0 15px 0" }} />
        {/* <DialogContent className={classes.wrapper}> */}
        <Grid
          container
          className={classes.wrapper}
          justifyContent="center"
          rowGap={3}
        >
          <Grid
            item
            container
            className={classes.wrapper}
            justifyContent="center"
          >
            <Grid item className={classes.imgWrapper} md={3}>
              {/* {getUser?.profilePic && ( */}
              {/* <Avatar
                firstName={getUser?.firstName}
                surName={getUser?.surName}
                  className={classes.ProfileAvatar}
                  url={getUser?.profilePic || ""}
                variant="square"
                sx={{ width: "100px", height: "100px" }}
              /> */}
              {/* <NameAvatar
                  firstName={getUser?.firstName}
                  surName={getUser?.surName}
                  url={getUser?.profilePic || ""}
                  variant="large"
                /> */}
              {getUser?.profilePic ? (
                <Avatar
                  alt="avater"
                  src={getUser?.profilePic}
                  variant="rounded"
                  sx={{ width: "100px", height: "100px" }}
                />
              ) : (
                <Avatar
                  variant="rounded"
                  sx={{ width: "100px", height: "100px" }}
                >
                  {letters}
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
                  defaultValue={getUser.firstName ?? "N/A"}
                />
              </Grid>

              <Grid item>
                <TextField
                  outlined-read-only-input
                  // InputProps={{
                  //   readOnly: true,
                  // }}
                  sx={{
                    width: "100%",
                    padding: "0 39px 0 0",
                    marginLeft: "15px",
                  }}
                  id="outlined-basic"
                  size="small"
                  label="Surname"
                  variant="outlined"
                  defaultValue={getUser?.surName ?? "N/A"}
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
              defaultValue={getUser?.email}
            />
          </Grid>
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
              defaultValue={getUser?.phone ?? "N/A"}
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
              defaultValue={getUser?.companyName ?? "N/A"}
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
              label="VAT"
              variant="outlined"
              defaultValue={getUser?.companyVat ?? "N/A"}
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
              label="Location"
              variant="outlined"
              defaultValue={getUser?.companyLocation ?? "N/A"}
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
              label="Work contact number"
              variant="outlined"
              defaultValue={getUser?.companyPhone ?? "N/A"}
            />
          </Grid>

          <Grid
            item
            container
            gap={2}
            justifyContent="flex-end"
            pr={2.5}
            pb={2.6}
          >
            <Button
              className={classes.btn}
              onClick={startRoom}
              variant="contained"
              size="medium"
              color="primary"
              sx={{ textTransform: "capitalize" }}
            >
              Message
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              size="medium"
              color="primary"
              onClick={openTaskModal}
              sx={{ textTransform: "capitalize" }}
            >
              Create task
            </Button>
          </Grid>
        </Grid>

        {/* <Grid container>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Name</Typography>
                <Typography className={classes.value}>
                  {getUser?.firstName}
                </Typography>
              </div>
              <div>
                <Typography className={classes.title}>Surname</Typography>
                <Typography className={classes.value}>
                  {getUser?.surName}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Email</Typography>
                <Typography className={classes.value}>
                  <a className={classes.email} href="#">
                    {getUser?.email}
                  </a>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Contact</Typography>
                <Typography className={classes.value}>
                  {getUser?.phone}
                </Typography>
              </div>
            </Grid>
            <br />
            <br />

            <Grid
              item
              xs={12}
              className={`${classes.companyRow} ${classes.detailRow}`}
            >
              <div>
                <Typography className={classes.title}>Company</Typography>
                <Typography className={classes.value}>
                  {getUser?.companyName}
                </Typography>
              </div>
              <div>
                <Typography className={classes.title}>VAT</Typography>
                <Typography className={classes.value}>
                  {getUser?.companyVat}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Location</Typography>
                <Typography className={classes.value}>
                  {getUser?.companyLocation}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>
                  Company contact number
                </Typography>
                <Typography className={classes.value}>
                  {getUser?.companyPhone}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} className={classes.btnWrapper}>
              {/* <IconButton
                onClick={handleDelete}
                aria-label="delete"
                disableRipple={true}
                size={'small'}
                color="primary"
              >
                <Delete />
              </IconButton>
              <Button
                className={classes.btn}
                onClick={startRoom}
                variant="contained"
                size="medium"
                color="primary"
              >
                Message
              </Button>
              <Button
                className={classes.btn}
                variant="contained"
                size="medium"
                color="primary"
                onClick={openTaskModal}
              >
                Create task
              </Button>
           </Grid>
          </Grid> */}
        {/* </DialogContent> */}
      </Dialog>
    </>
  );
};

export default ViewProfile;

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
