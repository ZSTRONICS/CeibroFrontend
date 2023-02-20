import React, { useState, Fragment } from "react";
import { Box, Grid, Typography, Divider, Tooltip } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import {
  AssignedTag,
  CustomBadge,
  CustomStack,
  LabelTag,
  TaskStatus,
} from "../Tabs/TaskCard";
import { getColorByStatus } from "config/project.config";
import { CBox } from "components/material-ui";
import CButton from "components/Button/Button";

import {
  AssignedTo,
  Member,
  SubtaskInterface,
  UserInfo,
} from "constants/interfaces/subtask.interface";
import { useDispatch, useSelector } from "react-redux";
import {
  SubtaskState,
  TaskInterface,
} from "constants/interfaces/task.interface";
import { RootState } from "redux/reducers";
import taskActions, { taskSubtaskStateChange } from "redux/action/task.action";
import { TASK_CONFIG } from "config/task.config";
import CustomModal from "components/Modal";
import StateChangeComment from "./StateChangeComment";
import { InfoIcon } from "components/material-ui/icons";
import SubTaskMenu from "./SubtaskMenu";
import { isTrue, onlyUnique } from "components/Utills/Globals/Common";
import { AllSubtasksOfTaskResult } from "constants/interfaces/AllSubTasks.interface";

interface Props {
  subTaskDetail: SubtaskInterface;
}

function SubTaskCard({ subTaskDetail }: Props) {
  // console.log(subTaskDetail);

  const { user } = useSelector((store: RootState) => store.auth);
  const {
    _id,
    dueDate,
    assignedTo,
    title,
    state,
    description,
    creator,
    taskId,
    createdAt,
    rejectedBy,
    taskData,
  } = subTaskDetail;
  const classes = useStyles();
  const membersList = assignedTo
    .map((member: AssignedTo) => member.members)
    .flat(1);
  const assignToMemberIds = assignedTo
    .map((member: AssignedTo) => member.members.map((member) => member._id))
    .flat(1);
  const myState = state.find(
    (localState) => String(localState.userId) === String(user._id)
  );

  let allMembers: string[] = [creator._id];
  try {
    if ("admins" in taskData) {
      allMembers = [...taskData.admins, ...allMembers];
    }
  } catch (e: any) {
    console.error(e);
  }
  // console.log("allMembers", allMembers);

  const authorizeMembers = allMembers.filter(onlyUnique);
  const taskRights = authorizeMembers.some((item: string) => item === user._id);

  const subTaskDate = dueDate.replaceAll("-", ".").replace(",", "");
  let subtaskCreatedAt = new Date(String(createdAt))
    .toLocaleString("de")
    .slice(0, 10)
    .replaceAll(",", "");
  const bgcolor = getColorByStatus(myState ? myState.userState : "");
  const dispatch = useDispatch();
  const [subTask, setSubTask]: any = useState(false);
  const [statePayload, setStatePayload] = useState<any>({
    taskId: "",
    subTaskId: "",
    state: "",
  });

  const handleCloseModal = () => {
    setSubTask((prev: any) => !prev);
  };
  const showRejectedBy = (rejectedBy: Member[], getColor: string) => {
    return (
      <>
        {rejectedBy.length === 0 && (
          <CustomBadge
            showZero={true}
            overlap="circular"
            color={`${getColor === "red" ? "error" : "primary"}`}
            badgeContent={0}
          ></CustomBadge>
        )}
      </>
    );
  };
  const AssignedToList = (membersList: Member[]) => {
    return (
      <>
        {membersList.map((item: Member, index) => {
          if (index === membersList.length - 1) {
            return (
              <span
                style={{ textTransform: "capitalize" }}
                key={item._id}
              >{`${item.firstName} ${item.surName}`}</span>
            );
          } else {
            return (
              <span
                style={{ textTransform: "capitalize" }}
                key={item._id}
              >{`${item.firstName} ${item.surName}, `}</span>
            );
          }
        })}
      </>
    );
  };
  const SubHeader = () => {
    return (
      <>
        <CustomStack gap={2}>
          <CustomStack gap={1}>
            <TaskStatus
              sx={{
                maxWidth: "60px",
                textAlign: "center",
                width: "60px",
                background: `${bgcolor}`,
                color: "white",
                fontWeight: "500",
                fontSize: "10px",
              }}
            >
              {myState?.userState}
            </TaskStatus>
            <CustomStack gap={0.5} sx={{ width: "122px" }}>
              <LabelTag sx={{ fontSize: "11px" }}>Due date</LabelTag>
              <AssignedTag sx={{ fontSize: "12px" }}>{subTaskDate}</AssignedTag>
            </CustomStack>
            <CustomStack gap={0.5} sx={{ width: "135px" }}>
              <LabelTag sx={{ fontSize: "11px" }}>Created on</LabelTag>
              <AssignedTag sx={{ fontSize: "12px" }}>
                {subtaskCreatedAt}
              </AssignedTag>
            </CustomStack>
          </CustomStack>
          <CustomStack gap={0.5} sx={{ width: "200px" }}>
            <LabelTag sx={{ fontSize: "11px" }}>Created by</LabelTag>
            <AssignedTag sx={{ fontSize: "12px" }}>
              {`${subTaskDetail.creator.firstName} ${subTaskDetail.creator.surName}`}
            </AssignedTag>
          </CustomStack>

          <CustomStack gap={0.5} sx={{ width: "220px" }}>
            <Grid item container justifyContent="space-between">
              <CustomStack columnGap={0.5}>
                <LabelTag>Assigned to</LabelTag>
                {membersList.map((member: Member, i: any) => {
                  return (
                    <Fragment key={member._id}>
                      {i === 0 && (
                        <AssignedTag
                          sx={{ fontSize: "12px" }}
                        >{`${member.firstName} ${member.surName}`}</AssignedTag>
                      )}
                    </Fragment>
                  );
                })}
                {membersList.length > 1 ? (
                  <CustomBadge
                    overlap="circular"
                    color="primary"
                    badgeContent={
                      <Tooltip title={AssignedToList(membersList)}>
                        <span>{membersList.length - 1}+</span>
                      </Tooltip>
                    }
                  ></CustomBadge>
                ) : (
                  showRejectedBy(membersList, "blue")
                )}
              </CustomStack>
            </Grid>
          </CustomStack>
          <CustomStack gap={0.8}>
            <LabelTag sx={{ fontSize: "11px" }}>Rejected by</LabelTag>
            {/* <AssignedTag sx={{ fontSize: "12px" }}>Static name</AssignedTag> */}
            {rejectedBy.map((member: Member, i: any) => {
              return (
                <Fragment key={member._id}>
                  {i === 0 && (
                    <AssignedTag
                      sx={{ fontSize: "12px" }}
                    >{`${member.firstName} ${member.surName}`}</AssignedTag>
                  )}
                </Fragment>
              );
            })}
            {rejectedBy.length > 1 ? (
              <CustomBadge
                showZero={true}
                overlap="circular"
                color="error"
                badgeContent={
                  <Tooltip title={AssignedToList(rejectedBy)}>
                    <span>{rejectedBy.length - 1}+</span>
                  </Tooltip>
                }
              ></CustomBadge>
            ) : (
              showRejectedBy(rejectedBy, "red")
            )}
          </CustomStack>

          {/*<Grid
            item
            sx={{
              display: "flex",
              // flexDirection: "row",
              // justifyContent: "space-between",
            }}
          >
            <Box gap={4} className={classes.cardContainer}>
              <CustomStack gap={3}>
                <CustomStack columnGap={1.5}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <path
                      d="M13.2218 7.50016L7.71047 12.9834C6.94882 13.7411 5.91581 14.1668 4.83868 14.1668C2.59566 14.1668 0.777344 12.3578 0.777344 10.1262C0.777344 9.05458 1.20523 8.02684 1.96688 7.26908L7.64244 1.62247C8.15021 1.1173 8.83888 0.833496 9.55697 0.833496C11.0523 0.833496 12.2645 2.03952 12.2645 3.52724C12.2645 4.24166 11.9793 4.92682 11.4715 5.432L5.96018 10.9152C5.7063 11.1678 5.36196 11.3097 5.00292 11.3097C4.25525 11.3097 3.64914 10.7067 3.64914 9.96282C3.64914 9.6056 3.79177 9.26302 4.04565 9.01044L9.39273 3.69064"
                      stroke="#0076C8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <Typography>0</Typography>
                </CustomStack>

                <CustomStack columnGap={1.5}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <path
                      d="M3.44401 10.9379H4.19401V10.1879H3.44401V10.9379ZM3.44401 13.6028H2.69401C2.69401 13.8868 2.85447 14.1465 3.1085 14.2736C3.36253 14.4006 3.66654 14.3733 3.89382 14.203L3.44401 13.6028ZM6.99957 10.9379V10.1879H6.7497L6.54975 10.3377L6.99957 10.9379ZM4.3329 3.96973H3.5829V5.46973H4.3329V3.96973ZM9.66623 5.46973H10.4162V3.96973H9.66623V5.46973ZM4.3329 6.63466H3.5829V8.13466H4.3329V6.63466ZM7.88845 8.13466H8.63845V6.63466H7.88845V8.13466ZM2.69401 10.9379V13.6028H4.19401V10.9379H2.69401ZM3.89382 14.203L7.44938 11.538L6.54975 10.3377L2.9942 13.0027L3.89382 14.203ZM6.99957 11.6879H12.3329V10.1879H6.99957V11.6879ZM12.3329 11.6879C13.2382 11.6879 13.9718 10.9555 13.9718 10.0496H12.4718C12.4718 10.1261 12.4107 10.1879 12.3329 10.1879V11.6879ZM13.9718 10.0496V2.0548H12.4718V10.0496H13.9718ZM13.9718 2.0548C13.9718 1.14887 13.2382 0.416504 12.3329 0.416504V1.9165C12.4107 1.9165 12.4718 1.97825 12.4718 2.0548H13.9718ZM12.3329 0.416504H1.66623V1.9165H12.3329V0.416504ZM1.66623 0.416504C0.760944 0.416504 0.0273438 1.14887 0.0273438 2.0548H1.52734C1.52734 1.97825 1.58841 1.9165 1.66623 1.9165V0.416504ZM0.0273438 2.0548V10.0496H1.52734V2.0548H0.0273438ZM0.0273438 10.0496C0.0273438 10.9555 0.760944 11.6879 1.66623 11.6879V10.1879C1.58841 10.1879 1.52734 10.1261 1.52734 10.0496H0.0273438ZM1.66623 11.6879H3.44401V10.1879H1.66623V11.6879ZM4.3329 5.46973H9.66623V3.96973H4.3329V5.46973ZM4.3329 8.13466H7.88845V6.63466H4.3329V8.13466Z"
                      fill="#FA0808"
                    />
                  </svg>
                  <Typography>0</Typography>
                </CustomStack>
               {(myState?.userState !== SubtaskState.Done)&& (myState?.userState !== SubtaskState.Rejected)&&taskRights&& <CBox display="flex" columnGap={0.8}>
                  <SubTaskMenu subTaskDetail={subTaskDetail}/>
                </CBox>}
              </CustomStack>
            </Box>
          </Grid> */}
        </CustomStack>
      </>
    );
  };

  const handleSubTaskCard = (e: any) => {
    //console.log(e.currentTarget, e.target);
    // if(e.currentTarget !== e.target ) return;
    e.stopPropagation();
    dispatch({
      type: TASK_CONFIG.SET_SUBTASK,
      payload: subTaskDetail,
    });

    dispatch(taskActions.openSubtaskDetailDrawer());
  };

  const handleSubTaskStateChangeModal = (event: any, state: string) => {
    event.stopPropagation();
    setStatePayload({ state: state, taskId: taskId, subTaskId: _id });
    setSubTask(true);
  };

  const handleSubTaskStateChange = (event: any, state: string) => {
    event.stopPropagation();
    const payload = {
      subTaskId: _id,
      taskId: taskId,
      state: state,
    };
    dispatch(
      taskSubtaskStateChange({
        body: payload,
      })
    );
  };
  const HeaderConfirmation = () => {
    return (
      <CBox display="flex" alignItems="center">
        <InfoIcon color="red" />
        <CBox fontSize={16} color="#FA0808" fontWeight={600} ml={1}>
          {statePayload.state === SubtaskState.Rejected
            ? "Reject Subtask"
            : "Mark As Done"}
        </CBox>
      </CBox>
    );
  };
  return (
    <div className={classes.main}>
      {myState?.userState ? (
        <>
          <Grid
            sx={{
              // maxWidth:"75%",
              // width:"60%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            className={classes.taskDetailContainer}
            item
            container
            // justifyContent={"space-evenly"}
            pt={1}
            rowGap={0.5}
            key={_id}
          >
            <Grid
              item
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={(e: any) => handleSubTaskCard(e)}
            >
              {SubHeader()}

              <Grid item container width="100%">
                <Grid
                  item
                  sx={{
                    marginTop: "20px",
                    width: "800px",
                  }}
                >
                  <TaskTitle> {title}</TaskTitle>

                  {description && (
                    <TaskDescription>{description}</TaskDescription>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "200px",
                display: "flex",
                flexDirection: "column",
                columnGap: "10px",
              }}
            >
              <Grid    
                // mr={2}
                item
                sx={{
                  display: "flex",
                  marginBottom: "2px",
                  // flexDirection: "row",
                  // justifyContent: "space-between",
                }}
              >
                <Box gap={4} className={classes.cardContainer}>
                  <CustomStack gap={3}>
                    <CustomStack columnGap={1.5}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                      >
                        <path
                          d="M13.2218 7.50016L7.71047 12.9834C6.94882 13.7411 5.91581 14.1668 4.83868 14.1668C2.59566 14.1668 0.777344 12.3578 0.777344 10.1262C0.777344 9.05458 1.20523 8.02684 1.96688 7.26908L7.64244 1.62247C8.15021 1.1173 8.83888 0.833496 9.55697 0.833496C11.0523 0.833496 12.2645 2.03952 12.2645 3.52724C12.2645 4.24166 11.9793 4.92682 11.4715 5.432L5.96018 10.9152C5.7063 11.1678 5.36196 11.3097 5.00292 11.3097C4.25525 11.3097 3.64914 10.7067 3.64914 9.96282C3.64914 9.6056 3.79177 9.26302 4.04565 9.01044L9.39273 3.69064"
                          stroke="#0076C8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <Typography>0</Typography>
                    </CustomStack>

                    <CustomStack columnGap={1.5}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                      >
                        <path
                          d="M3.44401 10.9379H4.19401V10.1879H3.44401V10.9379ZM3.44401 13.6028H2.69401C2.69401 13.8868 2.85447 14.1465 3.1085 14.2736C3.36253 14.4006 3.66654 14.3733 3.89382 14.203L3.44401 13.6028ZM6.99957 10.9379V10.1879H6.7497L6.54975 10.3377L6.99957 10.9379ZM4.3329 3.96973H3.5829V5.46973H4.3329V3.96973ZM9.66623 5.46973H10.4162V3.96973H9.66623V5.46973ZM4.3329 6.63466H3.5829V8.13466H4.3329V6.63466ZM7.88845 8.13466H8.63845V6.63466H7.88845V8.13466ZM2.69401 10.9379V13.6028H4.19401V10.9379H2.69401ZM3.89382 14.203L7.44938 11.538L6.54975 10.3377L2.9942 13.0027L3.89382 14.203ZM6.99957 11.6879H12.3329V10.1879H6.99957V11.6879ZM12.3329 11.6879C13.2382 11.6879 13.9718 10.9555 13.9718 10.0496H12.4718C12.4718 10.1261 12.4107 10.1879 12.3329 10.1879V11.6879ZM13.9718 10.0496V2.0548H12.4718V10.0496H13.9718ZM13.9718 2.0548C13.9718 1.14887 13.2382 0.416504 12.3329 0.416504V1.9165C12.4107 1.9165 12.4718 1.97825 12.4718 2.0548H13.9718ZM12.3329 0.416504H1.66623V1.9165H12.3329V0.416504ZM1.66623 0.416504C0.760944 0.416504 0.0273438 1.14887 0.0273438 2.0548H1.52734C1.52734 1.97825 1.58841 1.9165 1.66623 1.9165V0.416504ZM0.0273438 2.0548V10.0496H1.52734V2.0548H0.0273438ZM0.0273438 10.0496C0.0273438 10.9555 0.760944 11.6879 1.66623 11.6879V10.1879C1.58841 10.1879 1.52734 10.1261 1.52734 10.0496H0.0273438ZM1.66623 11.6879H3.44401V10.1879H1.66623V11.6879ZM4.3329 5.46973H9.66623V3.96973H4.3329V5.46973ZM4.3329 8.13466H7.88845V6.63466H4.3329V8.13466Z"
                          fill="#FA0808"
                        />
                      </svg>
                      <Typography>0</Typography>
                    </CustomStack>
                    {myState?.userState !== SubtaskState.Done &&
                      myState?.userState !== SubtaskState.Rejected &&
                      taskRights && (
                        <CBox display="flex" columnGap={0.8}>
                          <SubTaskMenu subTaskDetail={subTaskDetail} />
                        </CBox>
                      )}
                  </CustomStack>
                </Box>
              </Grid>

              <Grid
                item
                container
                // mt={2.1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  rowGap: "42px",
                  // width: "20%",
                }}
              >
                <CBox
                  sx={{ marginTop: "5px" }}
                  display="flex"
                  // margin="auto"
                  // padding="50px"
                  // justifyContent="flex-end"
                  //  width="60%"
                >
                  {assignToMemberIds.includes(user._id) &&
                    myState?.userState === SubtaskState.Assigned && (
                      <>
                        <CButton
                          label={"Accept"}
                          onClick={(e: any) =>
                            handleSubTaskStateChange(e, SubtaskState.Accepted)
                          }
                          variant="outlined"
                          styles={{
                            borderColor: "#0076C8",
                            fontSize: 12,
                            fontWeight: "bold",
                            borderWidth: 2,
                            color: "#0076C8",
                            marginRight: 15,
                          }}
                        />
                        <CButton
                          label={"Reject"}
                          onClick={(e: any) =>
                            handleSubTaskStateChangeModal(
                              e,
                              SubtaskState.Rejected
                            )
                          }
                          variant="outlined"
                          styles={{
                            borderColor: "#FA0808",
                            fontSize: 12,
                            fontWeight: "bold",
                            borderWidth: 2,
                            color: "#FA0808",
                          }}
                        />
                      </>
                    )}
                  {myState?.userState === SubtaskState.Ongoing &&
                    assignToMemberIds.includes(user._id) && (
                      <CButton
                        label={"Done"}
                        onClick={(e: any) =>
                          handleSubTaskStateChange(e, SubtaskState.Done)
                        }
                        variant="outlined"
                        styles={{
                          borderColor: "#0076C8",
                          fontSize: 12,
                          fontWeight: "bold",
                          borderWidth: 2,
                          color: "#0076C8",
                          marginRight: 15,
                        }}
                      />
                    )}
                  {myState?.userState === SubtaskState.Accepted &&
                    assignToMemberIds.includes(user._id) && (
                      <>
                        <CButton
                          label={"Start"}
                          onClick={(e: any) =>
                            handleSubTaskStateChange(e, SubtaskState.Start)
                          }
                          variant="outlined"
                          styles={{
                            borderColor: "#0076C8",
                            fontSize: 12,
                            fontWeight: "bold",
                            borderWidth: 2,
                            color: "#0076C8",
                            marginRight: 15,
                          }}
                        />
                        <CButton
                          label={"Reject"}
                          onClick={(e: any) =>
                            handleSubTaskStateChangeModal(
                              e,
                              SubtaskState.Rejected
                            )
                          }
                          variant="outlined"
                          styles={{
                            borderColor: "#FA0808",
                            fontSize: 12,
                            fontWeight: "bold",
                            borderWidth: 2,
                            color: "#FA0808",
                          }}
                        />
                      </>
                    )}
                  {myState?.userState === SubtaskState.Draft &&
                    String(creator._id) === String(user._id) && (
                      <>
                        <CButton
                          label={"Assign"}
                          onClick={(e: any) =>
                            handleSubTaskStateChange(e, SubtaskState.Assigned)
                          }
                          variant="outlined"
                          styles={{
                            borderColor: "#0076C8",
                            fontSize: 12,
                            fontWeight: "bold",
                            borderWidth: 2,
                            color: "#0076C8",
                            marginRight: 15,
                          }}
                        />
                        <CButton
                          label={"Delete"}
                          variant="outlined"
                          styles={{
                            borderColor: "#FA0808",
                            fontSize: 12,
                            fontWeight: "bold",
                            borderWidth: 2,
                            color: "#FA0808",
                          }}
                        />
                      </>
                    )}
                </CBox>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
        </>
      ) : (
        <></>
      )}

      <CBox>
        <CustomModal
          showCloseBtn={false}
          title={<HeaderConfirmation />}
          isOpen={subTask}
          handleClose={handleCloseModal}
          children={
            <StateChangeComment
              handleClose={handleCloseModal}
              payloadData={statePayload}
            />
          }
        />
      </CBox>
    </div>
  );
}

export default SubTaskCard;
const useStyles = makeStyles((theme) => ({
  main: {
    "& .MuiDialog-container": {
      "& .MuiDialogContent-root": {
        padding: "0px !important",
      },
    },
  },
  cardContainer: {
    marginTop: "-5px",
    // padding:"20px",
    alignItems: "center",
    "@media (max-width:371)": {
      border: "1px solid red",
      paddingTop: "8px",
    },
  },
  taskDetailContainer: {
    padding: 10,
  },
}));

const TaskTitle = styled(Typography)`
  font-weight: 700;
  font-size: 14px;
  color: #000000;
  max-width: 1200px;
   width: 100%;
}
`;
const TaskDescription = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  color: #605c5c;
  max-width: 1100px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
`;
