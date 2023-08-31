import { Button, Dialog, Divider, Grid } from "@mui/material";
import React from "react";

import { makeStyles } from "@material-ui/core";

import { CButton } from "components/Button";
import { useDispatch } from "react-redux";

import colors from "../../assets/colors";

import assets from "assets/assets";
import { CustomStack, TopBarTitle } from "components/CustomTags";
import UserProfileView from "components/Profile/UserProfileView";
import { UserCeibroData } from "constants/interfaces/user.interface";
import useResponsive from "hooks/useResponsive";

interface IViewProfileProps {
  userId?: string;
  disabled: boolean;
  userData?: UserCeibroData | undefined | null;
}

const ViewProfile: React.FunctionComponent<IViewProfileProps> = (props) => {
  const { disabled, userData } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const isTabletOrMobile = useResponsive("down", "md", "");

  const handleToggle = () => {
    setOpen((prev: boolean) => !prev);
  };

  const openTaskModal = () => {
    // dispatch(taskActions.openNewTaskModal());
  };

  return (
    <>
      <Button
        sx={{
          padding: "4px 10px",
          textTransform: "capitalize",
          border: "1px solid #0076C8",
        }}
        onClick={handleToggle}
        variant="outlined"
        size={isTabletOrMobile ? "small" : "medium"}
        color="primary"
        disabled={disabled}
      >
        View profile
      </Button>

      <Dialog
        fullWidth={true}
        maxWidth="xs"
        onClose={handleToggle}
        open={open}
        sx={{
          "& .MuiPaper-root": { margin: { xs: 0.3, md: 2.5 } },
        }}
      >
        <CustomStack
          sx={{ margin: "14.2px 4px 2px 20px" }}
          justifyContent="space-between"
        >
          <TopBarTitle sx={{ fontSize: { xs: 16, md: 24 } }}>
            User profile
          </TopBarTitle>
          <CButton
            label={<assets.CloseIcon />}
            variant="text"
            sx={{ padding: "1px 10px" }}
            onClick={handleToggle}
          />
        </CustomStack>

        <Divider sx={{ margin: "5px 0 15px 0" }} />
        <UserProfileView userData={userData} />
        <Grid
          item
          container
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          px={2.5}
          sx={{ mb: "20%" }}
        >
          <Button
            className={classes.btn}
            variant="contained"
            size="medium"
            color="primary"
            onClick={openTaskModal}
            sx={{ textTransform: "capitalize", width: "80%" }}
          >
            Create task
          </Button>
          <assets.MoreVertOutlinedIcon />
        </Grid>
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
