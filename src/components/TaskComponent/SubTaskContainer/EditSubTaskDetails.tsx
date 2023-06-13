import React, { useState } from "react";
import {
  Button,
  Typography,
  Icon,
  Box,
  IconButton,
  ListItem,
  Hidden,
  ListItemAvatar,
  List,
  ListItemText,
  Avatar,
  ListSubheader,
  TextField,
  Grid,
  Autocomplete,
  Divider,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import colors from "assets/colors";
import AddIcon from "@material-ui/icons/Add";
import assets from "assets/assets";
import MemberList from "./MemberList";
import CButton from "components/Button/Button";
import { CustomStack } from "../Tabs/TaskCard";
import { ListUserName } from "components/CustomTags";
import { getColorByStatus } from "config/project.config";
import { styled } from "@mui/system";
import useStyles from "../CreateSubtask/CreateSubTaskStyles";
import { RootState } from "redux/reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  combinedMemberArrayWithState,
  getUniqueObjectsFromArr,
} from "components/Utills/Globals/Common";
// import colors from "assets/colors";
import { SubtaskState } from "constants/interfaces/task.interface";
import {
  deleteSubtaskMember,
  patchSubTaskById,
  subtaskMemberMarkAsDone,
} from "redux/action/task.action";
import { toast } from "react-toastify";
import { TASK_CONFIG } from "config/task.config";

function EditSubTaskDetails(props: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [doOnce, setDoOnce] = useState(true);
  const handleScroll = (e: any) => {
    if (doOnce) {
      let subtaskBox = e.target;
      subtaskBox.scrollTop = 0;
      setDoOnce(false);
    }
  };

  let defaultValues = props.subTask;

  const { taskAssignedToMembers } = useSelector(
    (store: RootState) => store.task
  );

  const { user } = useSelector((store: RootState) => store.auth);
  const { projectMembersOfSelectedTask, selectedTaskAdmins, selectedTaskId } =
    useSelector((store: RootState) => store.task);
  const [assignedTomembersIds, setAssignedTomembersIds] = useState([]);
  const allAddedIds = defaultValues.assignedToMembersOnly.map(
    (member: any) => member._id
  );
  const uniqueMembers = projectMembersOfSelectedTask.filter(
    (member: any) => allAddedIds.includes(member.id) === false
  );

  // const [assignToList, setAssignToList] = useState<any>([
  //   ...uniqueMembers,
  // ]);

  // let filterSelectedMember: any = [];
  // uniqueMembers.forEach((member: any) => {
  //   let addToArr = true;
  //   defaultValues.assignedTo[0].members.every((added: any) => {
  //     if (added._id === member.id) {
  //       addToArr = false;
  //       return false;
  //     }
  //     return true;
  //   });
  //   if (addToArr) {
  //     filterSelectedMember.push(member);
  //   }
  // });

  // const combinedArray = combinedMemberArrayWithState(
  //   defaultValues.assignedTo[0].members,
  //   defaultValues.state
  // );

  // // const transformArrayOfMembersWithState = defaultValues.assignedTo.map(
  // //   (member: any) => {
  // //     let memberState = member.members.map((item: any) => {
  // //       let tempState = defaultValues.state.find(
  // //         (user: any) => (user.userId = item._id)
  // //       ).userState;
  // //       return {
  // //         ...item,
  // //         userState: tempState && tempState,
  // //       };
  // //     });
  // //     return {
  // //       addedBy: member.addedBy,
  // //       member: memberState && memberState,
  // //     };
  // //   }
  // // );

  const getUserStateFromUserId = (userId: string): string => {
    let userState: string = "";
    defaultValues.state.every((user: any) => {
      if (String(userId) === String(user.userId)) {
        userState = user.userState;
        return false;
      }
      return true;
    });
    return userState;
  };

  const getAssignedToWithUserState = (e: any) => {
    e.stopPropagation();
    let newState: any[] = [];
    let newAssignToData: any[] = [];

    let addedByMe: boolean = false;
    defaultValues.assignedTo.forEach((assignee: any) => {
      if (String(assignee.addedBy._id) === String(user._id)) {
        addedByMe = true;
      }
    });

    if (addedByMe === false) {
      defaultValues.assignedTo.every((assignee: any) => {
        newAssignToData.push({
          addedBy: assignee.addedBy._id,
          members: [...assignee.members.map((item: any) => String(item._id))],
        });
        return true;
      });
      newAssignToData.push({
        addedBy: user._id,
        members: [...assignedTomembersIds],
      });
    } else {
      defaultValues.assignedTo.every((assignee: any) => {
        if (String(assignee.addedBy._id) === String(user._id)) {
          newAssignToData.push({
            addedBy: user._id,
            members: [
              ...assignee.members.map((item: any) => String(item._id)),
              ...assignedTomembersIds,
            ],
          });
        } else {
          newAssignToData.push({
            addedBy: assignee.addedBy._id,
            members: [...assignee.members.map((item: any) => String(item._id))],
          });
        }
        return true;
      });
    }

    let prevStateIds: any[] = [];
    prevStateIds = defaultValues.state.map(
      (prevState: any) => prevState.userId
    );

    assignedTomembersIds.every((memberId: any) => {
      if (prevStateIds.includes(memberId)) {
        prevStateIds = prevStateIds.filter((id: any) => id !== memberId);
      }
      if (memberId === user._id) {
        // admin
        newState.push({
          userId: memberId,
          userState: "accepted",
        });
      } else {
        // assignee
        newState.push({
          userId: memberId,
          userState: "assigned",
        });
      }
      return true;
    });

    defaultValues.state.forEach((prevState: any) => {
      if (prevStateIds.includes(prevState.userId)) {
        newState.push({
          userId: prevState.userId,
          userState: prevState.userState,
        });
      }
    });

    const payload = {
      assignedTo: newAssignToData,
      state: newState,
    };
    dispatch(
      patchSubTaskById({
        body: payload,
        other: defaultValues._id,
        success: (res: any) => {
          props.handleClose();
          if (res.status === 200) {
            dispatch({
              type: TASK_CONFIG.UPDATE_SUB_TASK_BY_ID,
              payload: res.data.newSubtask,
            });
          }
          toast.success("Member updated");
        },
        onFailAction: () => {
          toast.error("Failed to updated subtask members!");
        },
      })
    );
  };

  const showDeleteBtn = (
    assignee: string,
    userState: string,
    addedByMember: string
  ): boolean => {
    const isTaskAdmin: boolean = defaultValues.taskData.admins.includes(
      String(user._id)
    );

    if (
      userState === SubtaskState.Assigned ||
      userState === SubtaskState.Accepted
    ) {
      if (isTaskAdmin === true) {
        return true;
      }

      if (addedByMember === user._id) {
        return true;
      }
    }
    return false;
  };

  const isSubtaskMemberMarkAsDoneAble = (
    userState: string,
    memberId: string
  ) => {
    let isAdmin: boolean = false;
    if (userState === SubtaskState.Ongoing) {
      isAdmin = selectedTaskAdmins.some((admin) => admin.id === user._id);

      if(isAdmin === false){
        if(String(memberId) === String(user._id)){
          return true;
        }
      }

      return isAdmin;
    }
  };

  const handleDeleteSubtaskMember = (e: any, memberId: string) => {
    e.stopPropagation();
    const payload = {
      body: {
        taskId: defaultValues.taskId,
        subTaskId: defaultValues._id,
        memberId: memberId,
      },
      success: (res: any) => {
        props.handleClose();
        toast.success("Successfully deleted member");
        const payload = {
          task: res.data.results.task,
          subtask: res.data.results.subtasks[0],
        };
        dispatch({
          type: TASK_CONFIG.TASK_SUBTASK_UPDATED,
          payload: payload,
        });
      },
    };
    dispatch(deleteSubtaskMember(payload));
  };

  const handleMarkAsDone = (e: any, memberId: string) => {
    e.stopPropagation();
    const payload = {
      body: {
        taskId: defaultValues.taskId,
        subTaskId: defaultValues._id,
        memberId: memberId,
      },
      success: (res: any) => {
        props.handleClose();
        toast.success("Member state updated to done Successfully ");
        const payload = {
          task: res.data.results.task,
          subtask: res.data.results.subtasks[0],
        };
        dispatch({
          type: TASK_CONFIG.TASK_SUBTASK_UPDATED,
          payload: payload,
        });
      },
    };
    dispatch(subtaskMemberMarkAsDone(payload));
  };

  return (
    <>
      <ListSubheader
        inset
        component="div"
        sx={{
          position: "relative",
          "&.MuiListSubheader-root": { padding: "2px 0px 14px 0px" },
        }}
      >
        <Grid
          container
          sx={{ padding: "0 0" }}
          gap={3.5}
          alignItems="flex-start"
        >
          <Grid item md={10}>
            <Autocomplete
              className={classes.titleWrapper}
              multiple
              disablePortal={false}
              disableCloseOnSelect
              filterSelectedOptions
              id="combo-box-demo3"
              limitTags={2}
              // value={assignToList}
              options={uniqueMembers}
              getOptionLabel={(option: any) => option.label}
              size="small"
              onChange={(e, newValue) => {
                // setAssignToList([...newValue]);
                if (newValue.length === 0) {
                  setAssignedTomembersIds([]);
                } else {
                  const memberIds: any = newValue.map((item: any) => item.id);
                  setAssignedTomembersIds(memberIds);
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
          <CButton
            disabled={assignedTomembersIds.length > 0 ? false : true}
            type="submit"
            label="Add"
            variant="contained"
            onClick={(e: any) => getAssignedToWithUserState(e)}
          />
        </Grid>
      </ListSubheader>
      <List
        onScroll={handleScroll}
        dense
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          maxHeight: "600px",
          overflow: "auto",
          height: "100%",
        }}
        subheader={<li />}
      >
        {defaultValues.assignedTo.map((item: any) => {
          if (item.members.length === 0) {
            return <></>;
          }
          const addedByMe =
            String(item.addedBy._id) === String(user._id)
              ? "Added by me"
              : `Added by ${item.addedBy.firstName} ${item.addedBy.surName}`;
          return (
            <li key={item.addedBy._id}>
              <ul
                style={{
                  paddingInlineStart: "0px",
                  paddingBottom: "5px",
                }}
              >
                <AddedByLabel
                  disableGutters
                  disableSticky
                  sx={{
                    borderBottom: "1px solid #ECF0F1",
                    margin: "0px",
                    lineHeight: "25px",
                  }}
                >
                  {addedByMe}
                </AddedByLabel>
                {item.members.map((member: any) => {
                  const userState = getUserStateFromUserId(member._id);
                  return (
                    <ListItem
                      disablePadding
                      key={member._id}
                      sx={{
                        "& .MuiListItemSecondaryAction-root": { right: "0px" },
                      }}
                      secondaryAction={
                        <>
                          {showDeleteBtn(
                            member._id,
                            userState,
                            item.addedBy._id
                          ) === true &&
                            userState !== SubtaskState.Ongoing &&
                            userState !== SubtaskState.Done && (
                              <CButton
                                onClick={(e: any) =>
                                  handleDeleteSubtaskMember(e, member._id)
                                }
                                label={"Remove"}
                                variant="outlined"
                                styles={{
                                  borderColor: "#FA0808",
                                  fontSize: 12,
                                  fontWeight: "bold",
                                  borderWidth: 1,
                                  color: "#FA0808",
                                }}
                              />
                            )}

                          {isSubtaskMemberMarkAsDoneAble(
                            userState,
                            member._id
                          ) === true ? (
                            <CButton
                              onClick={(e: any) =>
                                handleMarkAsDone(e, member._id)
                              }
                              label={"Mark As Done"}
                              variant="outlined"
                              styles={{
                                borderColor: "#55BCB3",
                                fontSize: 12,
                                fontWeight: "bold",
                                borderWidth: 1,
                                color: "#55BCB3",
                              }}
                            />
                          ) : (
                            <></>
                          )}
                          {userState === SubtaskState.Done && (
                            <assets.CheckCircleIcon
                              sx={{
                                color: "#55BCB3",
                                fontSize: "30px",
                                marginRight: "18px",
                              }}
                            />
                          )}
                        </>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar variant="rounded" src={member.profilePic} />
                      </ListItemAvatar>
                      <ListItemText
                        sx={{ padding: "4px 0px" }}
                        secondaryTypographyProps={{
                          // padding: "10px 10px",
                          maxWidth: "60px",
                          width: "100%",
                        }}
                        //   primaryTypographyProps={{}}
                        primary={
                          <>
                            {/* <label style={{}}>added by</label> */}
                            <ListUserName
                            // sx={{borderTop:'1px solid'}}
                            >
                              {String(member._id) === String(user._id)
                                ? `Me`
                                : `${member.firstName} ${member.surName}`}
                            </ListUserName>
                          </>
                        }
                        secondary={
                          <>
                            <SubTaskStateTag
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                background: `${getColorByStatus(userState)}`,
                              }}
                            >
                              {userState}
                            </SubTaskStateTag>
                          </>
                        }
                      />
                    </ListItem>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </List>
    </>
  );
}

export default EditSubTaskDetails;

const SubTaskStateTag = styled(Box)`
  font-weight: 400;
  font-size: 12px;
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  text-transform: capitalize;
  text-align: center;
  display: flex;
  align-item: center;
  font-family: Inter;
`;
const AddedByLabel = styled(ListSubheader)`
  color: #adb5bd;
  font-family: Inter;
  font-weight: 500;
  font-size: 12px;
  text-transform: capitalize;
`;
// max-width: 300px;
// width: 100%;
// white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;
