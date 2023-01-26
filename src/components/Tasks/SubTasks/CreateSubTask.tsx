import { Grid, IconButton, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CustomizedSwitch from "components/Chat/Questioniar/IOSSwitch";
import { CBox } from "components/material-ui";
import { AttachmentIcon } from "components/material-ui/icons";
import { useState } from "react";
import useStyles from "../../Tasks/SubTasks/CreateSubTaskStyles";

import CButton from "components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { getUniqueObjectsFromArr } from "components/Utills/Globals/Common";

export default function CreateSubTask({setSubTask,setFieldValue,values,}: any) {

  const classes = useStyles();
  const [doOnce, setDoOnce] = useState<boolean>(true);
  const { taskAssignedToMembers } = useSelector(
    (store: RootState) => store.task
  );

  const [assignToList, setAssignToList] = useState<any>([
    ...taskAssignedToMembers,
  ]);
  const { user } = useSelector((store: RootState) => store.auth);

  // const [imageAttach, setImageAttach]: any = useState(false);
  const { projectMembersOfSelectedTask } = useSelector(
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

  const assignedListHandler = (members:string[]) => {
    const assignedList = [];
    assignedList.push({ addedBy: user._id, members: members });
    return assignedList;
  };

  if (doOnce) {
    
    setFieldValue("assignedTo", assignedListHandler(assignToList.map((item:any)=> item.id)));
    setDoOnce(false)
  }

  return (
    <div>
      <Grid container className={classes.outerWrapper} rowGap={1}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            className={classes.titleWrapper}
            id="date"
            name="dueDate"
            label="Due date"
            type="date"
            // defaultValue="2017-05-24"
            size="small"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().slice(0, 10),
            }}
            onChange={(e) => {
              const userDate = new Date(String(e.target.value));
              const currentDate = userDate
                .toLocaleString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\//g, "-");
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
            // defaultValue={taskAssignedToMembers}
            options={uniqueMembers}
            value={assignToList}
            size="small"
            onChange={(e, newValue) => {
              setAssignToList([...newValue]);
              const memberId = newValue.map((item: any) => String(item.id));
              console.log('assignedListHandler(memberId)',assignedListHandler(memberId))
              setFieldValue("assignedTo", assignedListHandler(memberId));
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
                values.state = "draft";
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
                values.state = "assigned";
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
      {/* <CustomModal isOpen={imageAttach} handleClose={() => setImageAttach(false)} title={'Attach Image'} children={''} /> */}
    </div>
  );
}
