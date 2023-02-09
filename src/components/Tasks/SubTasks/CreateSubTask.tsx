import { Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CustomizedSwitch from "components/Chat/Questioniar/IOSSwitch";
import { CBox } from "components/material-ui";
// import { AttachmentIcon } from "components/material-ui/icons";
import { useState } from "react";
import useStyles from "../../Tasks/SubTasks/CreateSubTaskStyles";

import CButton from "components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { deDateFormat, getUniqueObjectsFromArr } from "components/Utills/Globals/Common";
import CDatePicker from "components/DatePicker/CDatePicker";

export default function CreateSubTask({ setSubTask, setFieldValue, values, }: any) {
  const dueDat = new Date()
  const todayDate = deDateFormat(dueDat)

  const classes = useStyles();
  const [doOnce, setDoOnce] = useState<boolean>(true);
  const [showDate, setShowDate]= useState<any>(new Date())
  const { taskAssignedToMembers } = useSelector((store: RootState) => store.task);

  const [assignToList, setAssignToList] = useState<any>([
    ...taskAssignedToMembers,
  ]);
  const { user } = useSelector((store: RootState) => store.auth);

  // const [imageAttach, setImageAttach]: any = useState(false);
  const { projectMembersOfSelectedTask, selectedTaskAdmins } = useSelector(
    (store: RootState) => store.task
  );
  const uniqueMembers = getUniqueObjectsFromArr([
    ...assignToList,
    ...projectMembersOfSelectedTask,
  ]);

  const handleCloseModal = () => {
    setSubTask(false);
    setAssignToList([]);
  };

  const assignedListHandler = (members: string[]) => {
    const assignedList = [];
    assignedList.push({ addedBy: user._id, members: members });
    return assignedList;
  };

  if (doOnce) {
    setFieldValue("assignedTo", assignedListHandler(assignToList.map((item: any) => item.id)));
    setFieldValue("dueDate", todayDate);
    setDoOnce(false)
  }

  return (
    <div>
      <Grid container className={classes.outerWrapper} rowGap={1}>
        <Grid item xs={12} md={12}>
        <CDatePicker
            required
            value={showDate}
            id="date"
            name="dueDate"
            onChange={(e:any) => {
              setShowDate(e)
              const currentDate = deDateFormat(e)
               setFieldValue("dueDate", currentDate);
            }}
          />
        </Grid>
        <Grid className={classes.titleWrapper} item xs={12} md={12}>
          <TextField
            required
            size="small"
            name="taskTitle"
            fullWidth
            id="outlined-basic"
            label="Sub task title"
            placeholder="Enter sub-task title"
            variant="outlined"
            onChange={(e) => {
              setFieldValue("title", e.target.value);
            }}
          />
        </Grid>
        {/* <Grid item xs={12} md={12}>
                    <div className={classes.titleWrapper}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            options={projects}
                            // onChange={(e, value) => {
                            //     setFieldValue('projects', value !== null ? value : top100Films);
                            // }}
                            renderInput={(params) => <TextField {...params} name='subTask' label='Sub Task title' placeholder='select a sub-task project' />}
                        />
                        
                    </div>
                </Grid> */}
        {/* <Grid item xs={12} md={12}>
                        <Autocomplete
                        className={classes.titleWrapper}
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            options={projects}
                            // onChange={(e, value) => {
                            //     setFieldValue('projects', value !== null ? value : top100Films);
                            // }}
                            renderInput={(params) => <TextField {...params} name='viewer' label='Viewer' placeholder='select a viewer' />}
                        />
                </Grid> */}
        <Grid item xs={12} md={12}>
          <Autocomplete
            className={classes.titleWrapper}
            multiple
            disablePortal
            disableCloseOnSelect
            filterSelectedOptions
            id="combo-box-demo3"
            limitTags={2}
            options={uniqueMembers}
            getOptionLabel={(option:any)=> option.label}
            value={assignToList}
            size="small"
            onChange={(e, newValue) => {
              setAssignToList([...newValue]);
              const memberId = newValue.map((item: any) => String(item.id));
              setFieldValue("assignedTo", assignedListHandler(memberId));
            }}
            renderInput={(params) => (
              <TextField
                // required
                {...params}
                name="assignedTo"
                label="Assign To"
                placeholder="Select memebers(s)"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={12} className={classes.textAreaBox}>
          <TextField
            id="standard-multiline-flexible"
            placeholder="Enter subtask description"
            multiline
            maxRows={4}
            minRows={4}
            style={{ padding: "10px 10px" }}
            variant="standard"
            name="description"
            className={classes.textArea}
            onChange={(e) => {
              setFieldValue("description", e.target.value);
            }}
          />

          <CBox
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            borderTop="1px solid #DBDBE5"
            px={1.8}
          >
            <CBox className={classes.switch}>
              <label>Required:</label>
              <CustomizedSwitch label="Image" edge="start" />
              <CustomizedSwitch label="Comment" edge="start" />
            </CBox>
            <CBox display="flex" alignItems="center">
              {/* <IconButton onClick={() => setImageAttach(true)}>
                <AttachmentIcon />
              </IconButton> */}
              {/* &nbsp;
                            &nbsp; */}
              {/* <MediaIcon /> */}
              {/* &nbsp;
                            &nbsp; */}
              {/* <NotificationIcon /> */}
            </CBox>
          </CBox>
        </Grid>
        {/* <Divider orientation='horizontal' flexItem variant='fullWidth' style={{ width: '100%', marginTop: 15, marginBottom: 8 }} /> */}

        {/* <CreateSubTaskAdvanceOption /> */}
        <CBox display="flex" width="100%" mt={6.2} mb={1}>
          <CBox className={classes.btnDraft}>
            <CButton
              type="submit"
              variant="outlined"
              styles={{ color: "#0076C8", fontSize: 12, fontWeight: "bold" }}
              label={"Save as draft"}
              onClick={() => {
                values.state.push({ "userId": user._id, "userState": "draft" })
                values.state = getUniqueObjectsFromArr(values.state)
              }}
            />
          </CBox>
          <div
            style={{
              flex: "1 0 0",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <CButton
              type="submit"
              variant="contained"
              styles={{
                color: "#fff",
                fontSize: 12,
                fontWeight: "bold",
                marginRight: 15,
              }}
              label={"Create Subtask"}
              onClick={() => {

                values.state = []
                let adminState = "assigned"
                if (values.assignedTo.length > 0) {
                  let membersList: any[] = []
                  values.assignedTo[0].members.forEach((member: any) => {
                    if (member === user._id) {
                      adminState = "accepted"
                      values.state.push({ "userId": user._id, "userState": "accepted" })
                    } else {
                      values.state.push({ "userId": member, "userState": "assigned" })
                    }
                    membersList.push(member)
                  });

                  selectedTaskAdmins.forEach(admin => {
                    if (!membersList.includes(String(admin.id))) {
                      values.state.push({ "userId": admin.id, "userState": adminState })
                    }
                  })
                }

                values.state = getUniqueObjectsFromArr(values.state)
              }}
            />
            <CButton
              onClick={handleCloseModal}
              variant="contained"
              styles={{
                color: "#605C5C",
                backgroundColor: "#ECF0F1",
                fontSize: 12,
                fontWeight: "bold",
              }}
              label={"Cancel"}
            />
          </div>
        </CBox>
      </Grid>
      {/* <CustomModal  showCloseBtn={false} isOpen={imageAttach} handleClose={() => setImageAttach(false)} title={'Attach Image'} children={''} /> */}
    </div>
  );
}
