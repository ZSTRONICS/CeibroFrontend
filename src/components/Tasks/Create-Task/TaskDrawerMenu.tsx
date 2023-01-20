import { Grid, makeStyles } from "@material-ui/core";
import { Divider, IconButton, TextField } from "@mui/material";

import { CBox } from "components/material-ui";
import { useDispatch } from "react-redux";


import Autocomplete from "@mui/material/Autocomplete";

import { useState } from "react";
import { AttachmentIcon } from "components/material-ui/icons";
import CustomModal from "components/Modal";
import CButton from "components/Button/Button";
import UploadImage from "components/uploadImage/UploadImage";
import { TaskInterface } from "constants/interfaces/task.interface";
import { UserInfo } from "constants/interfaces/subtask.interface";

interface Props {
  taskMenue: TaskInterface;
}

function TaskDrawerMenu({ taskMenue }: Props) {

  const classes = useStyles();
  const [imageAttach, setImageAttach]: any = useState(false);

  // const {
  //   projectMembers,
  //   projectWithMembers,
  //   allProjectsTitles,
  // } = useSelector((store: RootState) => store.project);
  // console.log(projectWithMembers)

  const { admins, assignedTo, dueDate, project, state, title, description } =
    taskMenue;
  const projectData = [{ label: project.title, id: project._id }];
  const getUserFormatedDataForAutoComplete = (arr: any) => {
    return arr.map((user: UserInfo) => {
      return {
        label: `${user.firstName} ${user.surName}`,
        id: user._id,
      };
    });
  };

  const adminData = getUserFormatedDataForAutoComplete(admins);
  const assignedToData = getUserFormatedDataForAutoComplete(assignedTo);
  const availiableMembers = getUserFormatedDataForAutoComplete(assignedTo);

  // const minDateTime = new Date();
  //const userDate = moment(dueDate, "DDYYYY").toString();
  const selectedProjectValue = { label: project.title, id: project._id }
  return (
    <>
      <Grid container className={classes.outerWrapper}>
        <CBox display="flex" alignItems="center" mt={1}>
          <CBox className={classes.type}>{state}</CBox>
          <CBox color="#000" fontSize={12} fontWeight={600} ml={1}>
            {dueDate}
          </CBox>
        </CBox>
        <Grid item xs={12} md={12} style={{ marginTop: 15 }}>
          <Grid item>
            <TextField
              id="date"
              name="dueDate"
              label="Due date"
              type="date"
              defaultValue={dueDate}
              // defaultValue={moment(dueDate).format("yyyy-mm-dd")}
              // defaultValue={dueDate !=="" ? moment(dueDate).format('DD-MMM-YYYY') : ""}
              size="small"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().slice(0, 10),
              }}
            />
          </Grid>
        </Grid>
        <Grid className={classes.titleWrapper} item xs={12} md={12}>
          <TextField
            size="small"
            name="taskTitle"
            fullWidth
            value={title}
            id="outlined-basic"
            label="Task title"
            placeholder="Enter Task Title"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* <InputText
                    placeholder="Enter Task title"
                /> */}
        </Grid>

        <Grid item xs={12} md={12}>
          <div className={classes.titleWrapper}>
            {state !== "draft" ? (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                defaultValue={selectedProjectValue}
                value={selectedProjectValue}
                options={[]}
                disabled ={true}
                // onChange={(e, value) => {
                //     props.setFieldValue('projects', value !== null ? value : top100Films);
                // }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="project"
                    label="Project"
                    placeholder="select project"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            ) : (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                defaultValue={{ label: project.title, id: project._id }}
                options={projectData}
                // onChange={(e, value) => {
                //     props.setFieldValue('projects', value !== null ? value : top100Films);
                // }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="project"
                    label="Project"
                    placeholder="select project"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          </div>
        </Grid>

        <Grid item xs={12} md={12}>
          <div className={classes.titleWrapper}>
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              value={adminData}
              options={availiableMembers}
              size="small"
              // onChange={(e, value) => {
              //     props.setFieldValue('admins', value !== null ? value : top100Films);
              // }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="admins"
                  label="Admins"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <div className={classes.titleWrapper}>
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              options={availiableMembers}
              size="small"
              value={assignedToData}
              // onChange={(e, value) => {
              //     props.setFieldValue('admins', value !== null ? value : top100Films);
              // }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="assignTo"
                  label="Assign To"
                  placeholder="select memebers(s)"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={12} className={classes.textAreaBox}>
          <TextField
            id="standard-multiline-flexible"
            // label="Multiline"
            placeholder="Enter task description"
            multiline
            maxRows={5}
            minRows={5}
            style={{ padding: "10px 10px" }}
            variant="standard"
            value={description}
            className={classes.textArea}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <CBox className={classes.titleLabel}>Description</CBox>
          <CBox
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            width="100%"
            borderTop="1px solid #DBDBE5"
            px={1.8}
          >
            <CBox display="flex" alignItems="center">
              <IconButton onClick={() => setImageAttach(true)}>
                <AttachmentIcon />
              </IconButton>
              {/* &nbsp;
                            &nbsp; */}
              {/* <MediaIcon /> */}
              {/* &nbsp;
                            &nbsp; */}
              {/* <NotificationIcon /> */}
            </CBox>
          </CBox>
        </Grid>
        <Divider />
        <Grid item xs={12} md={12}>
          <CBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            p="12px 0px 7px 7px"
          >
            <CBox fontSize={14} color="#000" fontWeight={600}>
              Attachment
            </CBox>
            <CBox display="flex">
              <CButton
                label="View All"
                styles={{ fontSize: 12, color: "#0076C8", fontWeight: "bold" }}
              />
              &nbsp;
              <Divider
                sx={{
                  height: 20,
                  marginTop: "auto",
                  marginBottom: "auto",
                  borderColor: "#dbdbe5",
                }}
                orientation="vertical"
              />
              &nbsp;
              <CButton
                label="Add New"
                styles={{ fontSize: 12, color: "#0076C8", fontWeight: "bold" }}
              />
            </CBox>
          </CBox>
        </Grid>
        {/* <Link href="#" underline="none"> */}
        {/* <CBox color='#0076C8' fontSize={14} fontWeight={600} display='flex' alignItems='center' my={1.8}>
          {open ?
          <>
            < assets.KeyboardArrowRightIcon />                                                    </> */}
        {/* :
                                                    <> */}
        {/* < assets.KeyboardArrowDownIcon /> */}
        {/* </> */}
        {/* } */}
        {/* Advance Options */}
        {/* </CBox> */}
        {/* </Link> */}

        {/* <Grid item xs={12} md={10}>
        <div className={classes.dateWrapper}>
          <DatePicker />
        </div>
      </Grid> */}
        {/* <Divider sx={{ width: "100%", padding: "15px 0" }} />
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
      </CBox> */}
        {/* <Grid item xs={12} >
                <div className={classes.createSubTask}>
                    <CreateSubTask/>
                </div>
            </Grid> */}
      </Grid>
      <CustomModal
        isOpen={imageAttach}
        handleClose={() => setImageAttach(false)}
        title={"Attachments"}
        children={<UploadImage />}
      />
    </>
  );
}

export default TaskDrawerMenu;

const useStyles = makeStyles({
  outerWrapper: {
    padding: "10px 10px",
    // background: colors.white,
  },

  titleWrapper: {
    marginTop: 20,
    "& .MuiFormLabel-root": {
      fontSize: "1rem",
      color: "#605C5C",
      fontFamily: "Inter",
      fontWeight: 600,
    },
    // maxHeight: '41px !important',
    "&:hover": {
      // borderColor: '#0a95ff !important',
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#0a95ff !important",
        borderWidth: "1px",
      },
    },
  },
  // projectWrapper: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     padding: '5px 10px',
  //     // paddingTop: "20px",
  //     border: '1px solid #DBDBE5',
  //     // marginTop: 20,
  //     borderRadius: '4px',
  //     '&:hover': {
  //         borderColor: '#0a95ff',
  //         borderWidth: '1px',
  //     }
  // },
  inputWrapper: {
    paddingTop: 10,
    paddingLeft: 10,
    ["@media (max-width:600px)"]: {
      paddingLeft: 0,
    },
  },
  textAreaBox: {
    border: "1px solid #DBDBE5",
    borderRadius: 5,
    marginTop: 20,
    position: "relative",
    "&:hover": {
      borderColor: "#0a95ff",
      borderWidth: "1px",
    },
    "& .css-8q2m5j-MuiInputBase-root-MuiInput-root": {
      "&:before": {
        borderBottom: "none !important",
      },
      "&:after": {
        borderBottom: "none !important",
      },
    },
  },
  textArea: {
    width: "100%",
    padding: 15,
    border: "none",
    borderRadius: 5,
    "& textarea:focus": {
      outline: "none !important",
      borderColor: "none",
      // boxShadow: '0 0 10px #719ECE',
    },
  },
  projectWrapper: {
    padding: "10px 0px",
    display: "flex",
    alignItems: "center",
    width: "100%",

    // paddingTop: "20px",
    // border: '1px solid #DBDBE5',
    // marginTop: 20,
    borderRadius: "4px",
    "&:hover": {
      borderColor: "#0a95ff",
      borderWidth: "1px",
    },
  },
  titleLabel: {
    position: "absolute",
    top: "-10px",
    backgroundColor: "#fff",
    left: 11,
    color: "#605C5C",
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: 600,
  },

  dateWrapper: {
    paddingTop: 10,
    paddingLeft: 10,
    "@media (max-width:600px)": {
      paddingLeft: 0,
    },
  },
  createSubTask: {
    display: "flex",
    justifyContent: "flex-end",
  },
  type: {
    backgroundColor: "#7D7E80",
    borderRadius: 4,
    padding: "5px 10px",
    color: "#fff",
    fontSize: "12px",
  },
});
