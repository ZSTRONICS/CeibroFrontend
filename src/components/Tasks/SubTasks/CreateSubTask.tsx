import { Grid, TextField, Tooltip } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
// import CustomizedSwitch from "components/Chat/Questioniar/IOSSwitch";
import { CBox } from "components/material-ui";
import { AttachmentIcon } from "components/material-ui/icons";
import { useState } from "react";
import useStyles from "../../Tasks/SubTasks/CreateSubTaskStyles";

import CButton from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import {
  getUniqueObjectsFromArr,
  getUserFormatedDataForAutoComplete,
} from "components/Utills/Globals/Common";
import CDatePicker from "components/DatePicker/CDatePicker";
import moment from "moment-timezone";
import { IconButton } from "@material-ui/core";
import CustomModal from "components/Modal";
import UploadDocs from "components/uploadImage/UploadDocs";
import { DOCS_CONFIG } from "config/docs.config";
import { CustomBadge } from "components/TaskComponent/Tabs/TaskCard";
import { TASK_CONFIG } from "config/task.config";
import { SubtaskState } from "constants/interfaces/task.interface";
import { AssignedTo } from "constants/interfaces/subtask.interface";

export default function CreateSubTask({
  setSubTask,
  values,
  myState = "new",
  isEditMode = false,
}: any) {
  const dispatch = useDispatch();

  let defaultValues: any = values.subTask;
  const classes = useStyles();
  const [showDate, setShowDate] = useState<any>(new Date());
  const localized = moment(defaultValues.dueDate, "DD-MM-YYYY").format(
    "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
  );

  const [selectedAttachments, setSelectedAttachments] = useState<any>({
    moduleId: defaultValues._id,
    moduleName: "SubTask",
    files: [],
  });

  const { taskAssignedToMembers } = useSelector(
    (store: RootState) => store.task
  );

  const { user } = useSelector((store: RootState) => store.auth);
  const [attachmentViewOpen, setAttachmentViewOpen]: any = useState(false);
  const { projectMembersOfSelectedTask, selectedTaskAdmins } = useSelector(
    (store: RootState) => store.task
  );

  const getAssignedToMembers = () => {
    const assignToMember = defaultValues.assignedTo
      .map((member: AssignedTo) => member.members)
      .flat(1);
    return getUserFormatedDataForAutoComplete(assignToMember);
  };

  const [assignToList, setAssignToList] = useState<any>(
    isEditMode === true ? getAssignedToMembers() : [...taskAssignedToMembers]
  );
  const uniqueMembers = getUniqueObjectsFromArr([
    ...assignToList,
    ...projectMembersOfSelectedTask,
  ]);

  const handleOpenCloseAttachmentModal = (e: any) => {
    e.stopPropagation();
    setAttachmentViewOpen((value: boolean) => !value);
  };

  const handleCloseModal = async (e: any) => {
    e.stopPropagation();
    setSubTask(false);
    setAssignToList([]);
    // dispatch({
    //   type: DOCS_CONFIG.CLEAR_SELECTED_FILES_TO_BE_UPLOADED,
    // });
  };

  const assignedToChangeHandler = (members: []) => {
    defaultValues.assignedTo[0].members = [...members];
    // defaultValues.assignedTo.every((assignee: any, index: any) => {
    //   if (isEditMode === false) {
    //     if (String(assignee.addedBy) === String(user._id)) {
    //       found = true;
    //       defaultValues.assignedTo[index].members = members;
    //       return false;
    //     }
    //   } else {
    //     //since we recieve object from server
    //     if (String(assignee.addedBy._id) === String(user._id)) {
    //       found = true;
    //       defaultValues.assignedTo[index].members = members;
    //       return false;
    //     }
    //   }
    //   return true;
    // });

    // if (isEditMode === true) {
    //   defaultValues.assignedTo = [{ addedBy: user._id, members: members }];
    // }

    // if (found === false) {
    //   defaultValues.assignedTo = [{ addedBy: user._id, members: members }];
    // }
  };

  const setAssignToData = () => {
    if (defaultValues.assignedTo[0].members.length > 0) {
      let payload = {
        addedBy: "",
        members: defaultValues.assignedTo[0].members,
      };
      if (defaultValues.assignedTo[0].members[0]._id) {
        payload.members = defaultValues.assignedTo[0].members.map(
          (item: any) => item._id
        );
      }
      if (typeof defaultValues.assignedTo[0].addedBy === typeof "") {
        payload.addedBy = defaultValues.assignedTo[0].addedBy;
      } else {
        if (defaultValues.assignedTo[0].addedBy._id === user._id) {
          payload.addedBy = defaultValues.assignedTo[0].addedBy._id;
        }
      }

      defaultValues.assignedTo[0] = payload;
    } else {
      let payload = {
        addedBy: String(user._id),
        members: [],
      };
      defaultValues.assignedTo[0] = payload;
    }
  };

  const setSubTaskUserStates = (isDraftState: boolean = false) => {
    let stateToPush: any = [];
    let adminState = "assigned";
    let membersList: any[] = [];

    if (isDraftState) {
      defaultValues.assignedTo[0].members.forEach((member: any) => {
        if (member === user._id) {
          adminState = "accepted";
          stateToPush.push({
            userId: user._id,
            userState: "draft",
          });
        } else {
          stateToPush.push({
            userId: member,
            userState: "assigned",
          });
        }
        membersList.push(member);
      });
    } else {
      defaultValues.assignedTo[0].members.forEach((member: any) => {
        if (member === user._id) {
          adminState = "accepted";
          stateToPush.push({
            userId: user._id,
            userState: "accepted",
          });
        } else {
          stateToPush.push({
            userId: member,
            userState: "assigned",
          });
        }
        membersList.push(member);
      });
    }

    selectedTaskAdmins.forEach((admin) => {
      if (!membersList.includes(String(admin.id))) {
        stateToPush.push({
          userId: admin.id,
          userState: adminState,
        });
      }
    });

    defaultValues.state = stateToPush;
  };

  const AttachmentsToolTip = () => {
    return selectedAttachments.files.length > 0 ? (
      <>
        {Array.from(selectedAttachments.files).map((file: any, index: any) => {
          return (
            <div
              style={{ textTransform: "capitalize" }}
              key={file.name}
            >{`${file.name}\n `}</div>
          );
        })}
      </>
    ) : (
      <></>
    );
  };

  return (
    <div>
      <Grid container className={classes.outerWrapper} rowGap={1}>
        <Grid item xs={12} md={12}>
          <CDatePicker
            disabled={myState === SubtaskState.Assigned}
            required
            value={isEditMode === true ? localized : showDate}
            id="date"
            name="dueDate"
            onChange={(e: any) => {
              setShowDate(e);
              const currentDate = moment(e).format("DD-MM-YYYY");
              defaultValues.dueDate = currentDate;
            }}
          />
        </Grid>
        <Grid className={classes.titleWrapper} item xs={12} md={12}>
          <TextField
            disabled={myState === SubtaskState.Assigned}
            required
            size="small"
            name="taskTitle"
            fullWidth
            defaultValue={defaultValues.title}
            id="outlined-basic"
            label="Sub task title"
            placeholder="Enter sub-task title"
            variant="outlined"
            onBlur={(e) => {
              defaultValues.title = e.target.value;
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
            disabled={myState === SubtaskState.Assigned}
            disablePortal
            disableCloseOnSelect
            filterSelectedOptions
            id="combo-box-demo3"
            limitTags={2}
            value={assignToList}
            options={uniqueMembers}
            getOptionLabel={(option: any) => option.label}
            size="small"
            onChange={(e, newValue) => {
              setAssignToList([...newValue]);
              if (newValue.length === 0) {
                assignedToChangeHandler([]);
              } else {
                const memberIds: any = newValue.map((item: any) => item.id);
                assignedToChangeHandler(memberIds);
              }
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
            defaultValue={defaultValues.description}
            className={classes.textArea}
            onBlur={(e) => {
              defaultValues.description = e.target.value;
            }}
          />

          <CBox
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            borderTop="1px solid #DBDBE5"
            px={1.8}
          >
            {/* <CBox className={classes.switch}>
              <label>Required:</label>
              <CustomizedSwitch label="Image" edge="start" />
              <CustomizedSwitch label="Comment" edge="start" />
            </CBox> */}

            <CBox
              display="flex"
              alignItems="center"
              onClick={handleOpenCloseAttachmentModal}
            >
              <CBox className={classes.switch}>
                <label style={{ color: "#0076C8" }}>Add Attachments</label>
              </CBox>
              <IconButton>
                <AttachmentIcon />
              </IconButton>
              &nbsp;
              {/* <Badge showZero={true} overlap="circular"  color="primary" badgeContent={selectedFilesToBeUploaded.files.length}></Badge> */}
              <CustomBadge
                overlap="circular"
                color="primary"
                badgeContent={
                  <Tooltip title={AttachmentsToolTip()}>
                    {selectedAttachments.files.length > 0 ? (
                      <div>{selectedAttachments.files.length}</div>
                    ) : (
                      <div>{0}</div>
                    )}
                  </Tooltip>
                }
              ></CustomBadge>
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
            {!isEditMode && (
              <CButton
                type="submit"
                variant="outlined"
                styles={{ color: "#0076C8", fontSize: 12, fontWeight: "bold" }}
                label={"Save as draft"}
                onClick={() => {
                  defaultValues.state = [
                    { userId: user._id, userState: "draft" },
                  ];
                  defaultValues.files = selectedAttachments;
                }}
              />
            )}
            {isEditMode && myState === SubtaskState.Draft && (
              <CButton
                type="submit"
                variant="contained"
                styles={{ color: "white", fontSize: 12, fontWeight: "bold" }}
                label={"Update draft"}
                onClick={() => {
                  defaultValues.files = selectedAttachments;
                  defaultValues.state = [
                    { userId: user._id, userState: "draft" },
                  ];
                  setAssignToData();
                }}
              />
            )}
          </CBox>
          <div
            style={{
              flex: "1 0 0",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {!isEditMode && (
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
                onClick={(e: any) => {
                  defaultValues.files = selectedAttachments;
                  let stateToPush: any = [];
                  let adminState = "assigned";
                  if (defaultValues.assignedTo.length > 0) {
                    let membersList: any[] = [];
                    defaultValues.assignedTo[0].members.forEach(
                      (member: any) => {
                        if (String(member) === String(user._id)) {
                          adminState = "accepted";
                          stateToPush.push({
                            userId: user._id,
                            userState: "accepted",
                          });
                        } else {
                          stateToPush.push({
                            userId: member,
                            userState: "assigned",
                          });
                        }
                        membersList.push(String(member));
                      }
                    );
                    selectedTaskAdmins.forEach((admin) => {
                      if (!membersList.includes(String(admin.id))) {
                        stateToPush.push({
                          userId: admin.id,
                          userState: adminState,
                        });
                      }
                    });
                  }

                  defaultValues.state = stateToPush;
                }}
              />
            )}
            {isEditMode && myState !== SubtaskState.Draft && (
              <CButton
                type="submit"
                variant="contained"
                styles={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginRight: 15,
                }}
                label={"Update Subtask"}
                onClick={(e: any) => {
                  let stateToPush: any = [];
                  let adminState = "assigned";
                  if (defaultValues.assignedTo.length > 0) {
                    let membersList: any[] = [];
                    defaultValues.assignedTo[0].members.forEach(
                      (member: any) => {
                        if (member === user._id) {
                          adminState = "accepted";
                          stateToPush.push({
                            userId: user._id,
                            userState: "accepted",
                          });
                        } else {
                          stateToPush.push({
                            userId: member,
                            userState: "assigned",
                          });
                        }
                        membersList.push(member);
                      }
                    );

                    selectedTaskAdmins.forEach((admin) => {
                      if (!membersList.includes(String(admin.id))) {
                        stateToPush.push({
                          userId: admin.id,
                          userState: adminState,
                        });
                      }
                    });
                  }

                  defaultValues.state = stateToPush;
                }}
              />
            )}
            {isEditMode && myState === SubtaskState.Draft && (
              <CButton
                type="submit"
                variant="contained"
                styles={{ color: "white", fontSize: 12, fontWeight: "bold" }}
                label={"Assign"}
                onClick={() => {
                  setAssignToData();
                  setSubTaskUserStates();
                }}
              />
            )}
            &nbsp; &nbsp;
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
      <CustomModal
        showCloseBtn={false}
        isOpen={attachmentViewOpen}
        handleClose={(e: any) => {
          handleOpenCloseAttachmentModal(e);
        }}
        title={"Attachments"}
        children={
          <UploadDocs
            selectedAttachments={selectedAttachments}
            showUploadButton={false}
            moduleType={"SubTask"}
            moduleId={""}
            handleClose={(e: any, value: any): void => {
              // console.log("value===>", value);
              setSelectedAttachments(value);
              setAttachmentViewOpen((prev: boolean) => !prev);
            }}
          />
        }
      />
    </div>
  );
}
