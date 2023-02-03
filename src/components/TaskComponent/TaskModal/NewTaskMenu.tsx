import React, { useState } from "react";

// mui-imports
import { Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
// components
import useStyles from "./TaskDrawerStyles";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { Chip } from "@material-ui/core";
import { deDateFormat, getSelectedProjectMembers, getUserFormatedDataForAutoComplete } from "components/Utills/Globals/Common";
import CDatePicker from "components/DatePicker/CDatePicker";

function NewTaskMenu(props: any) {

  const [doOnce, setDoOnce] = useState<boolean>(true);
  const dueDat = new Date()
  const todayDate = deDateFormat(dueDat)
  const { projectWithMembers, allProjectsTitles } = useSelector(
    (store: RootState) => store.project
  );

  const { user } = useSelector((state: RootState) => state.auth);
  const [showDate, setShowDate]= useState<any>()
  const notShowDefaultProject = allProjectsTitles.filter((item:any)=> item.label!=='Default')
  if (doOnce) {
    props.setFieldValue("dueDate", todayDate);
    setDoOnce(false)
  }
  const fixedOptions: any = [
    {
      label: `${user.firstName} ${user.surName}`,
      id: user._id,
    },
  ];

  const [adminsList, setAdminsList] = React.useState<any>([...fixedOptions]);
  const [adminListOpt, setAdminListOpt] = React.useState<any>([
    ...fixedOptions,
  ]);
  const [assignToOpt, setAssignToOpt] = React.useState<any>([]);
  const [assignToList, setAssignToList] = React.useState<any>([]);

  const handleProjectChange = (project: any) => {
    props.setFieldValue("admins", [fixedOptions[0].id]);
    if (project === null) {
      props.setFieldValue("project", "");
      props.setFieldValue("assignedTo", []);
      setAdminListOpt([]);
      setAdminsList([...fixedOptions])
      setAssignToList([]);
      setAssignToOpt([]);
    } else {
      props.setFieldValue("project", project?.value);
      const projMembersData = getSelectedProjectMembers(project?.value, projectWithMembers)
      const projMembers = getUserFormatedDataForAutoComplete(projMembersData?.projectMembers);
      setAdminListOpt([...fixedOptions, ...projMembers]);
      setAssignToOpt([...fixedOptions, ...projMembers]);
    }
  };
  const classes = useStyles();
  return (
    <Grid container className={classes.outerWrapper} rowGap={1}>
      <Grid item container columnGap={2}>
        <Grid item>
          <CDatePicker
            required
            value={showDate}
            id="date"
            name="dueDate"
            onChange={(e:any) => {
              setShowDate(e)
              const currentDate = deDateFormat(e)
               props.setFieldValue("dueDate", currentDate);
            }}
            // InputProps={{
            //   inputProps: { min: new Date().toISOString().slice(0, 10) },
            // }}
          />
        </Grid>
        {/* <Grid item>
                 <CustomizedSwitch
                                label='Multi-task'
                                edge='start'
                            />
                </Grid> */}
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.titleWrapper}>
          <TextField
            required
            size="small"
            name="title"
            fullWidth
            id="outlined-basic"
            label="Task title"
            placeholder="Enter task title"
            variant="outlined"
            onChange={(e) => {
              props.setFieldValue("title", e.target.value);
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.titleWrapper}>
          <Autocomplete
            disablePortal
            id="combo-box-demo1"
            size="small"
            options={notShowDefaultProject}
            getOptionLabel={(option:any)=> option.label}
            isOptionEqualToValue={(option:any,label:any)=> option.label===label}
            onChange={(e, value) => {
              handleProjectChange(value);
            }}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                name="projects"
                label="Project"
                placeholder="Select project"
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
            filterSelectedOptions
            disableCloseOnSelect
            id="combo-box-demo2"
            options={adminListOpt}
            limitTags={2}
            value={adminsList}
            size="small"
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => {
                return (
                  <Chip
                    label={option?.label}
                    {...getTagProps({ index })}
                    disabled={fixedOptions[0].id === option.id}
                  />
                );
              })
            }
            onChange={(event, value) => {
              const newValue: any = [
                ...fixedOptions,
                ...value.filter(
                  (option: any) => fixedOptions[0].id !== option.id
                ),
              ];
              setAdminsList(newValue);
              const admins = newValue.map((value: any) => value.id);
              props.setFieldValue("admins", admins);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="admins"
                label="Admins"
                placeholder="select admin(s)"
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
           disableCloseOnSelect
           filterSelectedOptions
            id="combo-box-demo3"
            limitTags={2}
            options={assignToOpt}
            getOptionLabel={(option:any)=> option.label}
            value={assignToList}
            size="small"
            onChange={(e, newValue) => {
              setAssignToList([...newValue]);
              const assign2 = newValue.map((value: any) => value.id);
              props.setFieldValue("assignedTo", assign2);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="assignedTo"
                label="Assign To"
                placeholder="Select memebers(s)"
              />
            )}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={12} className={classes.titleWrapper}>
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Description"
          placeholder="Enter task description"
          multiline
          rows={4}
          defaultValue=""
          onChange={(e) => {
            props.setFieldValue("description", e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
}

export default NewTaskMenu;
