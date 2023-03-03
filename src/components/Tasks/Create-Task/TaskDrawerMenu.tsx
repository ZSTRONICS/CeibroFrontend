import { makeStyles } from "@material-ui/core";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { CBox } from "components/material-ui";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { AttachmentIcon } from "components/material-ui/icons";
import assets from "assets/assets";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CButton from "components/Button/Button";
import CDatePicker from "components/DatePicker/CDatePicker";
import CustomModal from "components/Modal";
import UploadDocs from "components/uploadImage/UploadDocs";
import {
  getSelectedProjectMembers,
  getUniqueObjectsFromArr,
  getUserFormatedDataForAutoComplete,
  onlyUnique,
} from "components/Utills/Globals/Common";
import { getColorByStatus } from "config/project.config";
import { TASK_CONFIG } from "config/task.config";
import {
  SubtaskInterface,
  UserInfo,
} from "constants/interfaces/subtask.interface";
import { State, TaskInterface } from "constants/interfaces/task.interface";
import CDrawer from "Drawer/CDrawer";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import taskActions, {
  deleteTask,
  patchSubTaskById,
  updateTaskById,
} from "redux/action/task.action";
import { RootState } from "redux/reducers";
import ViewAllDocs from "../SubTasks/ViewAllDocs";
import docsAction from "redux/action/docs.actions";
import { DOCS_CONFIG } from "config/docs.config";
import { useConfirm } from "material-ui-confirm";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";

interface Props {
  taskMenue: TaskInterface;
  subtasks: SubtaskInterface[];
}

function TaskDrawerMenu({ taskMenue, subtasks }: Props) {
  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);
  const [opencdrawer, setOpenCDrawer] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const {
    _id,
    admins,
    assignedTo,
    dueDate,
    project,
    state,
    title,
    description,
    creator,
  } = taskMenue;
  let { isEditable } = taskMenue;
  isEditable = useSelector((state: RootState) => state.task.isEditing);
  // const {taskDrawerOpen} = useSelector((state: RootState) => state.task);

  // if(taskDrawerOpen===true && admins.length===){

  // }
  // React.useEffect(() => {
  //   dispatch(docsAction.getDocsByModuleNameAndId({
  //     other: {
  //       moduleName: 'Task',
  //       moduleId: _id
  //     }
  //   }))
  // }, [])

  const [showUpdateBtn, setShowUpdateBtn] = React.useState<boolean>(isEditable);
  const [imageAttach, setImageAttach] = useState<boolean>(false);
  const { projectWithMembers, allProjectsTitles } = useSelector(
    (store: RootState) => store.project
  );

  const { user } = useSelector((state: RootState) => state.auth);

  const adminIds = admins&& admins.length>0?admins.map((item: UserInfo) => item._id):[];
  const allMembers = [creator._id, ...adminIds];
  const authorizeMembers = allMembers.filter(onlyUnique);
  const taskRights = authorizeMembers.some((item: string) => item === user._id);

  // https://ceibroceibro.atlassian.net/wiki/spaces/CEIBRO/pages/48824321/1.2+Task+detail+view
  // change task (due date, title , project, description)
  // only creator if task in draft state
  const isCreator = creator._id === user._id;
  const isDraftState = state === State.Draft;
  const hasEditAccess = isCreator && isDraftState;
  const canEdit = showUpdateBtn && hasEditAccess;
  const taskCreatorAndAdmin = taskRights && showUpdateBtn;

  // add/remove admins to/from task
  // creator but not themselve , admin(but not task creator)
  //const projectData = [{ label: project.title, id: project._id }];

  // const notShowDefaultProject = allProjectsTitles.filter(
  //   (item: any) => item.label !== "Default"
  // );
  const adminData = getUserFormatedDataForAutoComplete(admins);
  const assignedToData = getUserFormatedDataForAutoComplete(assignedTo);
  let allMembersOfProject: any[];
  // const {isEditing} = useSelector((state:RootState)=> state.task)

  // const selectedProjectValue = { label: project.title, id: project._id };

  const creatorAutoCompleteData = {
    label: `${creator.firstName} ${creator.surName}`,
    id: creator._id,
  };

  let fixedOptions: any = [creatorAutoCompleteData];

  const [adminsList, setAdminsList] = React.useState<any>([...adminData]);
  const [adminListOpt, setAdminListOpt] = React.useState<any>([
    ...fixedOptions,
  ]);
  const [assignToOpt, setAssignToOpt] = React.useState<any>([]);
  const [assignToList, setAssignToList] = React.useState<any>([
    ...assignedToData,
  ]);
  const [doOnce, setDoOnce] = React.useState<boolean>(true);
  const adminArr = adminsList.map((item: any) => item.id);
  const assignArr = assignToList.map((item: any) => item.id);
  const localized = moment(dueDate, "DD-MM-YYYY").format(
    "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
  );
  const [showDate, setShowDate] = useState<any>(localized);
  const [selectedAttachments, setSelectedAttachments] = useState<any>({
    moduleId: _id,
    moduleName: "Task",
    files: [],
  });

  const [formData, setFormData] = useState({
    title: title,
    dueDate: moment(showDate).format("DD-MM-YYYY"),
    project: project._id,
    description: description,
    admins: adminArr,
    assignedTo: assignArr,
    state: state,
  });

  let prevObj = {
    title: title,
    dueDate: moment(showDate).format("DD-MM-YYYY"),
    project: project._id,
    description: description,
    admins: adminArr,
    assignedTo: assignArr,
    state: state,
  };
  if (doOnce) {
    const projectMembersData = getSelectedProjectMembers(
      project._id,
      projectWithMembers
    );

    allMembersOfProject =
      getUserFormatedDataForAutoComplete(projectMembersData);
    setAdminListOpt(
      getUniqueObjectsFromArr([...fixedOptions, ...allMembersOfProject])
    );
    setAssignToOpt(
      getUniqueObjectsFromArr([...fixedOptions, ...allMembersOfProject])
    );
    setDoOnce(false);
  }
  if (assignToList) {
    dispatch({
      type: TASK_CONFIG.TASK_ASSIGNED_TO_MEMBERS,
      payload: assignToList,
    });
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditTask = () => {
    setShowUpdateBtn(true);
  };

  const handleTaskUpdateAtDraftState = (e: any, isCreateTask: boolean) => {
    e.stopPropagation();

    try {
      dispatch(
        updateTaskById({
          body: formData,
          other: _id,
          success: (res) => {
            if (res.status === 200) {
              const taskData = {
                task: res?.data.newTask,
                subtaskOfTask: subtasks,
              };
              if (subtasks.length === 0) {
                dispatch({
                  type: TASK_CONFIG.SET_SELECTED_TASK,
                  payload: res?.data.newTask,
                });
              } else {
                dispatch({
                  type: TASK_CONFIG.UPDATE_SELECTED_TASK_AND_SUBTASK,
                  payload: taskData,
                });
              }
            }
            if (isCreateTask) {
              dispatch(taskActions.closeTaskDrawer());
              toast.success("Task created");
            } else {
              toast.success("Task updated");
              setShowUpdateBtn(false);
            }
          },
          onFailAction: () => {
            toast.error("Failed to update task!");
          },
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskUpdateAtNewState = (e: any) => {
    // e.stopPropagation();
    dispatch(
      updateTaskById({
        body: {
          description: formData.description,
          admins: formData.admins,
          assignedTo: formData.assignedTo,
        },
        other: _id,
        success: (res) => {
          if (res.status === 200) {
            const taskData = {
              task: res?.data.newTask,
              subtaskOfTask: subtasks,
            };
            dispatch({
              type: TASK_CONFIG.UPDATE_SELECTED_TASK_AND_SUBTASK,
              payload: taskData,
            });
          }
          toast.success("Task updated");
          setShowUpdateBtn(false);
        },
        onFailAction: () => {
          toast.error("Failed to updated task!");
        },
      })
    );
  };

  const handleCreateTask = (e: any) => {
    e.stopPropagation();
    formData.state = State.New;
    handleTaskUpdateAtDraftState(e, true);
  };

  const handleCancel = () => {
    setShowUpdateBtn(false);
    setFormData(prevObj);
    descriptionInputRef.current.value = prevObj.description;
  };

  // const handleDeleteTask = (e: any) => {
  //   e.stopPropagation();
  //   dispatch(
  //     deleteTask({
  //       other: _id,
  //       success: (res) => {
  //         dispatch({ type: TASK_CONFIG.PULL_TASK_FROM_STORE, payload: _id });
  //         dispatch(taskActions.closeTaskDrawer());
  //         toast.success("Task deleted");
  //         //deleted task id = _id
  //       },
  //       onFailAction: () => {
  //         toast.error("Failed to delete task!");
  //       },
  //     })
  //   );
  //   setShowUpdateBtn(false);
  // };
  const handleDeleteTask = (e: any) => {
    e.stopPropagation();
    confirm({
      title: <CustomStack gap={1}><ErrorOutlineOutlinedIcon/> Confirmation</CustomStack>,
      description:<Typography sx={{color:'#605C5C', fontSize:13, fontWeight:'500', pt:2}}>Are you sure you want to delete this task?</Typography>,
      titleProps: { color: "red", borderBottom:'1px solid #D3D4D9' },
      confirmationText:"Delete",
      confirmationButtonProps: {sx:{textTransform:'capitalize'}, variant:"outlined", color:"error"},
      cancellationText: <CButton
      variant="contained"
      elevation={0}
      styles={{
        color: "#605C5C",
        backgroundColor: "#ECF0F1",
        fontSize: 12,
        fontWeight: "bold",
      }}
      label={"Cancel"}
    />,

    }).then(() => {
          dispatch(
      deleteTask({
        other: _id,
        success: (res) => {
          dispatch({ type: TASK_CONFIG.PULL_TASK_FROM_STORE, payload: _id });
          dispatch(taskActions.closeTaskDrawer());
          toast.success("Task deleted");
          //deleted task id = _id
        },
        onFailAction: () => {
          toast.error("Failed to delete task!");
        },
      })
    );
    setShowUpdateBtn(false);
    });
  };
  const handleProjectChange = (project: any) => {
    if (project === null) {
      setAdminListOpt([]);
      setAdminsList([...fixedOptions]);
      setAssignToList([]);
      setAssignToOpt([]);
    } else {
      if (formData.project !== project.value) {
        setAdminsList([...fixedOptions]);
        setAssignToList([]);
      }
      formData.project = project.value;
      const projectMembersData = getSelectedProjectMembers(
        project?.value,
        projectWithMembers
      );
      const projMembers =
        getUserFormatedDataForAutoComplete(projectMembersData);
      setAdminListOpt(
        getUniqueObjectsFromArr([...fixedOptions, ...projMembers])
      );
      setAssignToOpt(
        getUniqueObjectsFromArr([...fixedOptions, ...projMembers])
      );
    }
  };

  if (assignToOpt) {
    dispatch({
      type: TASK_CONFIG.PROJECT_MEMBERS_OF_SELECTED_TASK,
      payload: getUniqueObjectsFromArr([
        ...assignToOpt,
        ...adminListOpt,
        ...adminData,
      ]),
    });
  }

  if (adminsList) {
    dispatch({
      type: TASK_CONFIG.SELECTED_TASK_ADMINS,
      payload: [...adminData],
    });
  }
  const viewAllDocs = (e: any) => {
    e.stopPropagation();
    setOpenCDrawer((prev: boolean) => !prev);
  };
  const handleclosecdrawer = () => {
    setOpenCDrawer((prev: boolean) => !prev);
  };
  const handleOpenCloseAttachmentModal = (e: any) => {
    e.stopPropagation();
    setImageAttach((value: boolean) => !value);
  };
  return (
    <>
      <Grid container className={classes.outerWrapper} rowGap={2.5}>
        <Grid item container xs={12} md={12} justifyContent="space-between">
          <CBox display="flex" alignItems="center">
            <CBox
              sx={{
                background: `${getColorByStatus(state)}`,
                fontWeight: "500",
              }}
              className={classes.subtaskState}
            >
              {state}
            </CBox>
            <CBox color="#000" fontSize={12} fontWeight={500} ml={1}>
              {dueDate.replaceAll("-", ".").replace(",", "")}
            </CBox>
          </CBox>
          <Grid item>
            {taskRights && (
              <CBox sx={{ cursor: "pointer" }} onClick={handleEditTask}>
                <assets.BorderColorIcon
                  color="primary"
                  sx={{ opacity: `${showUpdateBtn ? 0.6 : 1}` }}
                />
              </CBox>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} style={{ marginTop: 10 }}>
          <Grid item>
            <CDatePicker
              required
              value={showDate}
              disabled={!canEdit}
              id="date1"
              name="dueDate"
              onChange={(e: any) => {
                setShowDate(e);
                formData.dueDate = moment(e).format("DD-MM-YYYY");
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} className={classes.titleWrapper}>
          <TextField
            inputRef={titleInputRef}
            required
            size="small"
            name="title"
            fullWidth
            disabled={!canEdit}
            defaultValue={title}
            id="outlined-basic"
            label="Task title"
            placeholder="Enter task title"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <div className={classes.titleWrapper}>
            <Autocomplete
              disablePortal
              id="combo-box-demo1"
              size="small"
              disabled={!canEdit}
              defaultValue={{ label: project.title, id: project._id }}
              options={allProjectsTitles}
              getOptionLabel={(option: any) => option.label}
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
            {adminData.some(
              (item: any) => String(item.id) === String(user._id)
            ) ? (
              <Autocomplete
                filterSelectedOptions
                disableCloseOnSelect
                multiple
                disablePortal
                id="combo-box-demo"
                disabled={!taskCreatorAndAdmin}
                value={adminsList}
                defaultValue={adminsList}
                options={adminListOpt}
                getOptionLabel={(option: any) => option.label}
                size="small"
                onChange={(event, value) => {
                  let newValue: any = [
                    ...fixedOptions,
                    ...value.filter(
                      (option: any) => fixedOptions[0].id !== option.id
                    ),
                  ];

                  newValue = newValue.reduce(
                    (
                      uniqueArray: any[],
                      element: { label: string; id: string }
                    ) => {
                      if (!uniqueArray.find((item) => item.id === element.id)) {
                        uniqueArray.push(element);
                      }
                      return uniqueArray;
                    },
                    []
                  );
                  setAdminsList(newValue);
                  formData.admins = newValue.map((value: any) => value.id);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="admins"
                    label="Admins"
                    placeholder="Select admin(s)"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            ) : (
              <Autocomplete
                filterSelectedOptions
                disableCloseOnSelect
                multiple
                disablePortal
                id="combo-box-demo"
                value={adminData}
                size="small"
                options={[]}
                getOptionLabel={(option: any) => option.label}
                disabled={true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="admins"
                    label="Admins"
                    placeholder="Select admin(s)"
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
              filterSelectedOptions
              multiple
              disablePortal
              id="combo-box-demo"
              disabled={!taskCreatorAndAdmin}
              disableCloseOnSelect
              options={assignToOpt}
              getOptionLabel={(option: any) => option.label}
              size="small"
              value={assignToList}
              onChange={(e, newValue) => {
                newValue = newValue.reduce(
                  (
                    uniqueArray: any[],
                    element: { label: string; id: string }
                  ) => {
                    if (!uniqueArray.find((item) => item.id === element.id)) {
                      uniqueArray.push(element);
                    }
                    return uniqueArray;
                  },
                  []
                );

                setAssignToList([...newValue]);
                formData.assignedTo = newValue.map((value: any) => value.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="assignTo"
                  label="Assign To"
                  placeholder="Select memebers(s)"
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
            inputRef={descriptionInputRef}
            id="standard-multiline-flexible"
            placeholder="Enter task description"
            multiline
            disabled={!taskCreatorAndAdmin}
            maxRows={5}
            minRows={5}
            name="description"
            style={{ padding: "10px 10px" }}
            variant="standard"
            defaultValue={formData.description}
            onBlur={handleInputChange}
            className={classes.textArea}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <CBox className={classes.titleLabel}>Description</CBox>
          {/* <CBox
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            width="100%"
            borderTop="1px solid #DBDBE5"
            px={1.8}
           > 
          {/* <MediaIcon /> */}
          {/* &nbsp;
                            &nbsp; */}
          {/* <NotificationIcon />
          </CBox> */}
        </Grid>
        <Divider />
        <Grid item xs={12} md={12}>
          <CBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            p="12px 0px 7px 0px"
          >
            <CBox fontSize={14} color="#000" fontWeight={600}>
              Attachments
            </CBox>
            <CBox display="flex">
              <CButton
                label="View All"
                onClick={viewAllDocs}
                styles={{ fontSize: 12, color: "#0076C8", fontWeight: "bold" }}
              />

              <Divider
                sx={{
                  height: 20,
                  marginTop: "auto",
                  marginBottom: "auto",
                  borderColor: "#dbdbe5",
                }}
                orientation="vertical"
              />

              <CButton
                onClick={(e: any) => handleOpenCloseAttachmentModal(e)}
                label="Add New"
                styles={{ fontSize: 12, color: "#0076C8", fontWeight: "bold" }}
              />
            </CBox>
          </CBox>
        </Grid>
      </Grid>

      {state === State.Draft && !showUpdateBtn && (
        <Grid
          container
          justifyContent="flex-end"
          mt={10}
          sx={{ padding: "10px 23px" }}
        >
          <Grid item>
            <CButton
              label="Create Task"
              onClick={handleCreateTask}
              variant="contained"
              styles={{
                borderColor: "#0076C8",
                fontSize: 12,
                fontWeight: "500",
                borderWidth: 1,
                color: "white",
                marginRight: 15,
                textTransform: "capitalize",
              }}
            />
          </Grid>
          <Grid item>
            <CButton
              label={"Delete"}
              onClick={handleDeleteTask}
              variant="outlined"
              styles={{
                borderColor: "#FA0808",
                fontSize: 12,
                fontWeight: "500",
                borderWidth: 1,
                color: "#FA0808",
              }}
            />
          </Grid>
        </Grid>
      )}

      {state === State.Draft && showUpdateBtn && (
        <Grid
          container
          justifyContent="flex-end"
          mt={10}
          sx={{ padding: "10px 23px" }}
        >
          <Grid item>
            <CButton
              label="Create Task"
              onClick={handleCreateTask}
              variant="contained"
              styles={{
                borderColor: "#0076C8",
                fontSize: 12,
                fontWeight: "500",
                borderWidth: 1,
                color: "white",
                marginRight: 15,
                textTransform: "capitalize",
              }}
            />
          </Grid>
          <Grid item>
            <CButton
              label="Update Draft"
              onClick={(e: any) => handleTaskUpdateAtDraftState(e, false)}
              variant="contained"
              styles={{
                borderColor: "#0076C8",
                fontSize: 12,
                fontWeight: "500",
                borderWidth: 1,
                color: "white",
                marginRight: 15,
                textTransform: "capitalize",
              }}
            />
          </Grid>
        </Grid>
      )}

      { showUpdateBtn && (
        <Grid
          container
          justifyContent="flex-end"
          mt={10}
          ml={1.7}
          sx={{ padding: "10px 23px" }}
        >
          <Grid item>
            <CButton
              sx={{ padding: "8px 9px" }}
              label="Update Task"
              onClick={handleTaskUpdateAtNewState}
              variant="contained"
              styles={{
                borderColor: "#0076C8",
                fontSize: 12,
                fontWeight: "500",
                borderWidth: 1,
                color: "white",
                marginRight: 15,
                textTransform: "capitalize",
              }}
            />
          </Grid>
          <Grid item>
            <CButton
              sx={{
                padding: "7px 4px",
              }}
              styles={{
                borderColor: "#9D9D9D",
                fontSize: 12,
                fontWeight: "500",
                borderWidth: 1.5,
                color: "#9D9D9D",
                marginRight: 15,
                textTransform: "capitalize",
              }}
              label="Cancel"
              onClick={handleCancel}
              variant="outlined"
            />
          </Grid>
        </Grid>
      )}
      <CustomModal
        showCloseBtn={false}
        isOpen={imageAttach}
        handleClose={(e: any) => handleOpenCloseAttachmentModal(e)}
        title={"Attachments"}
        children={
          <UploadDocs
            selectedAttachments={selectedAttachments}
            showUploadButton={true}
            moduleType={"Task"}
            moduleId={_id}
            //  handleClose={() => setImageAttach(false)}
            handleClose={(e: any, value: any): void => {
              setSelectedAttachments({
                moduleId: _id,
                moduleName: "Task",
                files: [],
              });
              handleOpenCloseAttachmentModal(e);
            }}
          />
        }
      />

      <CDrawer
        showBoxShadow={true}
        hideBackDrop={true}
        opencdrawer={opencdrawer}
        handleclosecdrawer={handleclosecdrawer}
        children={
          <ViewAllDocs
            heading="Attachments"
            handleclosecdrawer={handleclosecdrawer}
            moduleName={"Task"}
            moduleId={_id}
          />
        }
      />
    </>
  );
}

export default TaskDrawerMenu;

const useStyles = makeStyles({
  subtaskState: {
    fontSize: "10px",
    borderRadius: "3px",
    padding: "2px 5px",
    textTransform: "capitalize",
    color: "white",
  },
  outerWrapper: {
    padding: "10px 23px",
    // background: colors.white,
  },

  titleWrapper: {
    // marginTop: 20,
    "& .MuiFormLabel-root": {
      fontSize: "12px",
      color: "#605C5C",
      fontFamily: "Inter",
      fontWeight: 500,
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
    "@media (max-width:600px)": {
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
