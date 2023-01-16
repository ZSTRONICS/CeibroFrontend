import { Grid, makeStyles } from "@material-ui/core";
import { Box, Divider, Drawer, Link, Typography } from "@mui/material";
import assets from "assets/assets";
import { CBox } from "components/material-ui";
import {
  CounterSpan,
  CustomStack,
  TaskStatus,
} from "components/TaskComponent/Tabs/TaskCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors";
import { RootState } from "../../../redux/reducers";
import DatePicker from "../../Utills/Inputs/DatePicker";
import InputText from "../../Utills/Inputs/InputText";
import SelectDropdown from "../../Utills/Inputs/SelectDropdown";
import CreateSubTask from "../SubTasks/CreateSubTaskDrawer";

function TaskDrawerMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen]: any = useState(false)
  const selectedMenue = useSelector((state: RootState) => state.project.menue);

  const handleClick = (id: number) => {
    // dispatch(projectActions.setMenue(id))
  };
  const dueDate = new Date().toLocaleDateString("de-DE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  
  return (
    <Grid container className={classes.outerWrapper}>
      <Grid className={classes.titleWrapper} item xs={12} md={12}>
        <div className={classes.inputWrapper}>
          <CustomStack gap={1.25}>
            <TaskStatus
              sx={{
                background: "#F1B740",
                fontWeight: "500",
                fontSize: "10px",
              }}
            >
              {"ongoing"}
            </TaskStatus>
            <Typography sx={{ fontSize: "11px", fontWeight: "500" }}>
              {dueDate}
            </Typography>
            <Box
              sx={{
                padding: "0 4px 5px",
              }}
            >
              <CounterSpan>14/2</CounterSpan>
            </Box>
          </CustomStack>
        </div>
        {/* <InputText 
                    placeholder="Enter Task title"
                /> */}
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.inputWrapper}>
          <SelectDropdown title="Project" />
        </div>
      </Grid>

      <Grid item xs={12} md={12}>
        <div className={classes.inputWrapper}>
          <SelectDropdown title="Admin" />
        </div>
      </Grid>

      <Grid item xs={12} md={12}>
        <div className={classes.inputWrapper}>
          <SelectDropdown title="Assign to" />
        </div>
      </Grid>

      <Grid item xs={12} md={10}>
        <div className={classes.dateWrapper}>
          <DatePicker />
        </div>
      </Grid>
      <Divider sx={{ width: "100%", padding: "15px 0" }} />
      <CBox>
        <Link href="#" underline="none"
         onClick={(event) => setOpen(!open)}
         >
          <CBox
            color="#0076C8"
            fontSize={14}
            fontWeight={600}
            display="flex"
            alignItems="center"
            my={1.8}
          >
            {open ? (
              <>
                <assets.KeyboardArrowUpIcon />{" "}
              </>
            ) : (
              <>
                <assets.KeyboardArrowDownIcon />
              </>
            )}
            Advance Options
          </CBox>
        </Link>
        {open
          ? null
          : // <TaskAdvanceOptions />
            ""}
      </CBox>
      {/* <Grid item xs={12} >
                <div className={classes.createSubTask}>
                    <CreateSubTask/>
                </div>
            </Grid> */}
    </Grid>
  );
}

export default TaskDrawerMenu;

const useStyles = makeStyles({
  outerWrapper: {
    padding: "10px 10px",
    // background: colors.white,
  },
  titleWrapper: {
    // padding: "15px 20px"
  },
  inputWrapper: {
    paddingTop: 10,
    paddingLeft: 10,
    ["@media (max-width:600px)"]: {
      paddingLeft: 0,
    },
  },
  projectWrapper: {
    padding: "10px 0px",
  },
  dateWrapper: {
    paddingTop: 10,
    paddingLeft: 10,
    ["@media (max-width:600px)"]: {
      paddingLeft: 0,
    },
  },
  createSubTask: {
    display: "flex",
    justifyContent: "flex-end",
  },
});
