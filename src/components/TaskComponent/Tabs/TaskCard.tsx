import { Button, CardActions, Stack, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
// import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Badge, makeStyles } from "@material-ui/core";
import { TaskInterface } from "constants/interfaces/task.interface";
interface Props {
  task: TaskInterface;
  ColorByStatus: (state: string) => string;
}

// const TaskCard: React.FC<Props> = ({ task, ColorByStatus }) => {
//   const { creator, createdAt, admins } = task;
//   const [anchorElTask, setAnchorElTask] = React.useState<null | HTMLElement>(
//     null
//   );
//   const confirm = useConfirm();

//   const taskCreatedOn = momentdeDateFormat(createdAt);

//   const dueDate = task.dueDate.replaceAll("-", ".").replace(",", "");
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const divRef = useRef();
//   const { user } = useSelector((state: RootState) => state.auth);

//   const adminsList = admins.map((item: UserInfo) => item._id);
//   const allMembers = [creator._id, ...adminsList];
//   const authorizeMembers = allMembers.filter(onlyUnique);
//   const taskRights = authorizeMembers.some((item: string) => item === user._id);
//   const deleteOnlyCreator = creator._id === user._id;

//   const handleCard = (e: any, isEditable: boolean) => {
//     e.stopPropagation();
//     dispatch({
//       type: TASK_CONFIG.SET_SELECTED_TASK,
//       payload: task,
//     });
//     dispatch({
//       type: TASK_CONFIG.SELECTED_TASK_ID,
//       payload: task._id,
//     });
//     dispatch(taskActions.openTaskDrawer(isEditable));
//     dispatch(
//       getAllSubTaskOfTask({
//         other: {
//           taskId: task._id,
//         },
//       })
//     );
//   };

//   const openPopup = (e: any) => {
//     e.stopPropagation();
//     setAnchorElTask(e.currentTarget);
//   };

//   const closePopup = (e: any) => {
//     e.stopPropagation();
//     setAnchorElTask(null);
//   };

//   const handleEdit = (e: any) => {
//     e.stopPropagation();
//     setAnchorElTask(null);
//     handleCard(e, true);
//   };

//   const handleDeleteTask = (e: any) => {
//     e.stopPropagation();
//     setAnchorElTask(null);
//     confirm({
//       title: (
//         <CustomStack gap={1}>
//           <ErrorOutlineOutlinedIcon /> Confirmation
//         </CustomStack>
//       ),
//       description: (
//         <ConfirmDescriptionTag sx={{ pt: 2 }}>
//           Are you sure you want to delete this task?
//         </ConfirmDescriptionTag>
//       ),
//       titleProps: { color: "red", borderBottom: "1px solid #D3D4D9" },
//       confirmationText: "Delete",
//       confirmationButtonProps: {
//         sx: {
//           textTransform: "capitalize",
//           padding: "4px 15px",
//           color: "#FA0808",
//           borderColor: "#FA0808",
//           marginRight: "10px",
//         },
//         variant: "outlined",
//       },
//       cancellationText: (
//         <CButton
//           variant="contained"
//           sx={{
//             color: "#605C5C",
//             backgroundColor: "#ECF0F1",
//             fontSize: 12,
//             fontWeight: "bold",
//           }}
//           label={"Cancel"}
//         />
//       ),
//     }).then(() => {
//       dispatch(
//         deleteTask({
//           other: task._id,
//           success: (res) => {
//             dispatch({
//               type: TASK_CONFIG.PULL_TASK_FROM_STORE,
//               payload: task._id,
//             });
//             dispatch(taskActions.closeTaskDrawer());
//             toast.success("Task deleted");
//           },
//           onFailAction: () => {
//             toast.error("Failed to delete task!");
//           },
//         })
//       );
//     });
//   };
//   const open = Boolean(anchorElTask);
//   const id = open ? "simple-popover" : undefined;

//   const SubHeader = () => {
//     return (
//       <>
//         <CustomStack gap={1.25}>
//           <TaskStatus sx={{ border: `1px solid ${ColorByStatus(task.state)}` }}>
//             {task.state}
//           </TaskStatus>
//           {/* <Typography sx={{ fontSize: "11px", fontWeight: "500" }}>
//             {dueDate}
//           </Typography> */}
//         </CustomStack>
//       </>
//     );
//   };

//   const Action = () => {
//     return (
//       <>
//         <CustomStack alignItems="center">
//           {/* <Box
//             sx={{
//               padding: "5px 4px 0",
//             }}
//           >
//             {task.state === State.Done && (
//               <assets.CheckCircleIcon
//                 sx={{ color: "#55BCB3" }}
//                 fontSize="small"
//               />
//             )}
//             {task.state === State.Draft && (
//               <>
//                 <Tooltip title={`${State.Draft}`} placement="bottom">
//                   <assets.ErrorOutlinedIcon color="error" fontSize="small" />
//                 </Tooltip>
//               </>
//             )}
//           </Box> */}
//           {taskRights && (
//             <Box ref={divRef}>
//               <IconButton
//                 aria-controls="simple-menu"
//                 aria-haspopup="true"
//                 aria-describedby={id}
//                 disableRipple={true}
//                 onClick={openPopup}
//               >
//                 <MoreVert color="primary" />
//               </IconButton>
//               <Menu
//                 MenuListProps={{ sx: { py: 0 } }}
//                 id={id}
//                 open={open}
//                 anchorEl={anchorElTask}
//                 onClose={closePopup}
//                 sx={{ "& .MuiMenuList-padding": { padding: 0 } }}
//                 elevation={3}
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "center",
//                 }}
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//               >
//                 <MenuItem
//                   // dense={true}
//                   disableRipple
//                   disableGutters
//                   aria-describedby={id}
//                   onClick={handleEdit}
//                   divider={deleteOnlyCreator}
//                   // sx={{
//                   //   "&.MuiMenuItem-root": {
//                   //     padding: "4px 10px",
//                   //   },
//                   // }}
//                 >
//                   <CustomButton
//                     variant="outlined"
//                     disableRipple
//                     sx={{ border: "none", textTransform: "capitalize" }}
//                   >
//                     Edit
//                   </CustomButton>
//                 </MenuItem>
//                 {deleteOnlyCreator &&
//                   (task.state === State.Draft ||
//                     task.totalSubTaskCount === 0) && (
//                     <MenuItem
//                       disableGutters
//                       disableRipple
//                       onClick={handleDeleteTask}
//                       aria-describedby={id}
//                       // sx={{
//                       //   "&.MuiMenuItem-root": {
//                       //     padding: "4px 10px",
//                       //   },
//                       // }}
//                     >
//                       <CustomButton
//                         variant="outlined"
//                         disableElevation
//                         disableFocusRipple
//                         disableRipple
//                         sx={{
//                           // padding:'0',
//                           border: "none",
//                           textTransform: "capitalize",
//                           color: "#FA0808",
//                         }}
//                       >
//                         Delete
//                       </CustomButton>
//                     </MenuItem>
//                   )}
//               </Menu>
//             </Box>
//           )}
//         </CustomStack>
//       </>
//     );
//   };

//   const AssignedToList = () => {
//     return (
//       <>
//         {task.assignedTo.map((item: UserInfo, index) => {
//           if (index === task.assignedTo.length - 1) {
//             return (
//               <span
//                 style={{ textTransform: "capitalize" }}
//                 key={item._id}
//               >{`${item.firstName} ${item.surName}`}</span>
//             );
//           } else {
//             return (
//               <span style={{ textTransform: "capitalize" }} key={item._id}>
//                 {`${item.firstName} ${item.surName}`}
//                 <br />
//               </span>
//             );
//           }
//         })}
//       </>
//     );
//   };
//   return (
//     <Card
//       className={classes.cardContainer}
//       onClick={(e: any) => handleCard(e, false)}
//       itemID={task._id}
//       key={task._id}
//       sx={{
//         maxWidth: "320px",
//         width: "100%",
//         "& :hover": {
//           cursor: "pointer",
//         },
//         // width: "100%",
//         border: `1.8px solid ${ColorByStatus(task.state)}`,
//       }}
//       elevation={0}
//       variant="outlined"
//     >
//       <CardHeader
//         sx={{
//           padding: "10px 5px 0px 15px",
//           // display: "flex",
//         }}
//         subheader={SubHeader()}
//         action={Action()}
//       />

//       <CardContent sx={{ p: "5px 15px", "&:last-child": { pb: "13px" } }}>
//         <CustomStack
//           gap={2.5}
//           // pb="13px"

//           justifyContent="space-between"
//         >
//           <Box>
//             <LabelTag>Created by</LabelTag>
//             <AssignedTag>{`${creator.firstName} ${creator.surName}`}</AssignedTag>
//           </Box>
//           <Box>
//             <LabelTag>Created on</LabelTag>
//             <AssignedTag sx={{ display: "flex", fontSize: "11.5px" }}>
//               {taskCreatedOn}
//             </AssignedTag>
//           </Box>
//         </CustomStack>
//         <CustomStack gap={2.5} justifyContent="space-between">
//           <Box pt={0.6}>
//             <LabelTag>Assigned to</LabelTag>
//             {task.assignedTo.length > 0 ? (
//               <>
//                 {task.assignedTo.map((item: UserInfo, i: any) => {
//                   return (
//                     <Fragment key={item._id}>
//                       {i === 0 && (
//                         <AssignedTag
//                           key={item._id}
//                           sx={{ display: "inline-block" }}
//                         >
//                           {`${item.firstName} ${item.surName}`}
//                         </AssignedTag>
//                       )}
//                     </Fragment>
//                   );
//                 })}
//               </>
//             ) : (
//               "No user assigned"
//             )}
//             {task.assignedTo.length > 1 && (
//               <CustomBadge
//                 overlap="circular"
//                 color="primary"
//                 badgeContent={
//                   <Tooltip title={AssignedToList()}>
//                     <div>+{task.assignedTo.length - 1}</div>
//                   </Tooltip>
//                 }
//               ></CustomBadge>
//             )}
//           </Box>
//           <Box>
//             <LabelTag>Due date</LabelTag>
//             <AssignedTag sx={{ fontSize: "11.5px" }}>{dueDate}</AssignedTag>
//           </Box>
//         </CustomStack>
//         <Box pt={0.87} pb={0.87}>
//           <AssignedTag
//             sx={{
//               fontSize: "14px",
//               fontWeight: "700",
//               textTransform: "capitalize",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//               display: "inline-block",
//               maxWidth: "250px",
//               verticalAlign: "middle",
//             }}
//           >
//             {/* project title */}
//             {task.title}
//           </AssignedTag>
//         </Box>
//         <Divider sx={{ margin: "1px 0px" }} />
//         <CustomStack
//           className={classes.taskContainer}
//           pt={0.7}
//           // pb={-24}
//           sx={{
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             // paddingBottom:"13px"
//           }}
//           direction={{ xs: "row", sm: "row" }}
//         >
//           <Box>
//             <CustomStack gap={0.5}>
//               <img
//                 src={assets.clipboardIcon}
//                 className="width-16"
//                 alt="ceibro"
//               />
//               <AssignedTag sx={{ fontSize: "11px" }}>
//                 {task.totalSubTaskCount} Subtask(s)
//               </AssignedTag>
//             </CustomStack>
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               gap: "25px",
//               "& .MuiBadge-badge": {
//                 fontSize: "9px !important",
//                 fontWeight: "600 !important",
//               },
//             }}
//           >
//             <TaskBadges />
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: "5px",
//             }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 13 12"
//               fill="none"
//             >
//               <path
//                 d="M3.611 9.10575H4.111V8.60575H3.611V9.10575ZM3.611 11.271H3.111C3.111 11.4604 3.21797 11.6335 3.38733 11.7182C3.55668 11.8029 3.75936 11.7847 3.91088 11.6711L3.611 11.271ZM6.49989 9.10575V8.60575H6.33331L6.20002 8.70565L6.49989 9.10575ZM4.33322 3.5535H3.83322V4.5535H4.33322V3.5535ZM8.66656 4.5535H9.16656V3.5535H8.66656V4.5535ZM4.33322 5.71875H3.83322V6.71875H4.33322V5.71875ZM7.22211 6.71875H7.72211V5.71875H7.22211V6.71875ZM3.111 9.10575V11.271H4.111V9.10575H3.111ZM3.91088 11.6711L6.79977 9.50584L6.20002 8.70565L3.31113 10.8709L3.91088 11.6711ZM6.49989 9.60575H10.8332V8.60575H6.49989V9.60575ZM10.8332 9.60575C11.5084 9.60575 12.0554 9.0596 12.0554 8.38401H11.0554C11.0554 8.50668 10.9568 8.60575 10.8332 8.60575V9.60575ZM12.0554 8.38401V1.88824H11.0554V8.38401H12.0554ZM12.0554 1.88824C12.0554 1.21265 11.5084 0.666504 10.8332 0.666504V1.6665C10.9568 1.6665 11.0554 1.76557 11.0554 1.88824H12.0554ZM10.8332 0.666504H2.16656V1.6665H10.8332V0.666504ZM2.16656 0.666504C1.49135 0.666504 0.944336 1.21265 0.944336 1.88824H1.94434C1.94434 1.76557 2.04299 1.6665 2.16656 1.6665V0.666504ZM0.944336 1.88824V8.38401H1.94434V1.88824H0.944336ZM0.944336 8.38401C0.944336 9.0596 1.49135 9.60575 2.16656 9.60575V8.60575C2.04299 8.60575 1.94434 8.50668 1.94434 8.38401H0.944336ZM2.16656 9.60575H3.611V8.60575H2.16656V9.60575ZM4.33322 4.5535H8.66656V3.5535H4.33322V4.5535ZM4.33322 6.71875H7.22211V5.71875H4.33322V6.71875Z"
//                 fill="#0076C8"
//               />
//             </svg>
//             <AssignedTag
//               sx={{
//                 paddingBottom: "0px",
//                 fontSize: "11px",
//               }}
//             >
//               {task.unSeenSubTaskCommentCount}
//             </AssignedTag>
//           </Box>
//         </CustomStack>
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskCard;
const useStyles = makeStyles((theme) => ({
  cardContainer: {
    maxWidth: "320px",
    [theme.breakpoints.down(1024)]: {
      //  columnGap: "20.04px",
      maxWidth: "319px",
    },
  },
  taskContainer: {},
}));
export const CustomBadge = styled(Badge)`
  padding-left: 20px;
`;
export const CustomButton = styled(Button)`
  font-size: 15px;
  font-weight: 500;
  &:hover {
    background: none;
    border: none;
  }
`;
const CCardActions = styled(CardActions)`
  // padding: 14px;
  padding-top: 0;
  padding-bottom: 0px;
  justify-content: space-between;
`;
export const LabelTag = styled(Typography)`
  font-size: 11px;
  font-weight: 500;
  color: #605c5c;
`;
export const AssignedTag = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  color: #000000;
`;

export const CustomStack = styled(Stack)`
  flex-direction: row;
  align-items: center;
`;
export const TaskStatus = styled(Typography)`
  border-radius: 3px;
  padding: 2px 5px;
  color: #000000;
  font-size: 11px;
  text-transform: capitalize;
`;

export const CounterSpan = styled("span")`
  font-size: 9px;
  border: 1px solid #605c5c;
  padding: 3px 5px;
  border-radius: 20px;
  font-weight: 700;
`;
