import React from "react";

// mui-imports
import { Grid, TextField, TextFieldProps } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

// redux
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../redux/reducers';

// components
import useStyles from "./TaskDrawerStyles";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { Chip } from "@material-ui/core";
import moment from "moment";
import { UserInfo } from "constants/interfaces/subtask.interface";
// import { AttachmentIcon } from 'components/material-ui/icons';

function NewTaskMenu(props: any) {
  const { projectWithMembers, allProjectsTitles } = useSelector(
    (store: RootState) => store.project
  );

  const { user } = useSelector((state: RootState) => state.auth);

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

  const getUserFormatedDataForAutoComplete = (arr: any) => {
    return arr.map((member: UserInfo) => {
      return {
        label: `${member.firstName} ${member.surName}`,
        id: member._id,
      };
    });
  };

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
      let projMembersData: any = [];
      projectWithMembers
        .filter((proj: any) => {
          if (project && proj) {
            if (String(proj?._id) === String(project?.value)) {
              props.setFieldValue("project", project?.value);
              projMembersData = proj?.projectMembers;
            }
          }
        })
        .find((proj: any) => proj);

      let projMembers = getUserFormatedDataForAutoComplete(projMembersData);
      setAdminListOpt([...fixedOptions, ...projMembers]);
      setAssignToOpt([...fixedOptions, ...projMembers]);
    }
  };
  const classes = useStyles();
  return (
    <Grid container className={classes.outerWrapper} rowGap={1}>
      <Grid item container columnGap={2}>
        <Grid item>
          <TextField
            required
            id="date"
            name="datetime-local"
            label="Due date"
            type="date"
            //inputFormat="MM/dd/yyyy"
            //placeholder="dd/mm/yyy"
            size="small"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
                const userDate = moment(e.target.value, "DD-MM-YYYY").toString();
              props.setFieldValue("dueDate", userDate.slice(0,10));
            }}
            InputProps={{
              inputProps: { min: new Date().toISOString().slice(0, 10) },
            }}
          />
        </Grid>
        {/* <Grid item>
                 <CustomizedSwitch
                                label='Multi-task'
                                edge='start'
                            />
                </Grid> */}
      </Grid>
      <Grid xs={12} md={12}>
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
      <Grid xs={12} md={12}>
        <div className={classes.titleWrapper}>
          <Autocomplete
            disablePortal
            id="combo-box-demo1"
            size="small"
            options={allProjectsTitles}
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
      <Grid xs={12} md={12}>
        <div className={classes.titleWrapper}>
          <Autocomplete
            multiple
            disablePortal
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
      <Grid xs={12} md={12}>
        <div className={classes.titleWrapper}>
          <Autocomplete
            multiple
            disablePortal
            id="combo-box-demo3"
            limitTags={2}
            options={assignToOpt}
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
      <Grid xs={12} md={12} className={classes.titleWrapper}>
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
