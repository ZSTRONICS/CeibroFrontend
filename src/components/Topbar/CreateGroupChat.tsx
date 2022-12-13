import React, { useEffect, useState } from 'react'

// material
import {
  Typography,
  Button,
  Grid
} from "@mui/material";
import { makeStyles, Popover  } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

// redux
import { useDispatch, useSelector } from "react-redux";
import { createChatRoom } from "../../redux/action/auth.action";
import { getAllChats } from "../../redux/action/chat.action";
import {
  getAllProjectMembers,
  getAllProjects,
} from "../../redux/action/project.action";
import { RootState } from "../../redux/reducers";

// components
import TextField from "components/Utills/Inputs/TextField";
import colors from "../../assets/colors";
import CustomCheckbox from "../Utills/Inputs/Checkbox";
import SelectDropdown from "../Utills/Inputs/SelectDropdown";
import Loading from "../Utills/Loader/Loading";
import NameAvatar from "../Utills/Others/NameAvatar";

export let dbUsers = [
    {
      label: "Test 1",
      value: "61ec20bb778f854909aec4d2",
      color: "green",
    },
    {
      label: "Test 2",
      value: "61ec2121778f854909aec4d7",
      color: "green",
    },
    {
      label: "Test 3",
      value: "61ec2139778f854909aec4dc",
      color: "green",
    },
    {
      label: "Test 4",
      value: "61ec220d778f854909aec4fa",
      color: "green",
    },
  ];

function CreateGroupChat(props:any) {
  
  const {groupEl, ButtonId, openGroup, handleGroupClose} = props
  const classes = useStyles();
  const dispatch = useDispatch();

  const [project, setProject] = useState<any>();
  const [user, setUser] = useState<any>();
  const [users, setUsers] = useState<any>([]);
  const [name, setName] = useState("");
  
  const createChatLoading = useSelector((state: RootState) => state.chat.createChatLoading);
  
  const { allProjects, projectMembers } = useSelector((store: RootState) => store.project);

  const handleProjectChange = (e: any) => {
    setProject(e);
    setUsers([]);
    dispatch(
      getAllProjectMembers({
        other: {
          projectId: e.value,
          excludeMe: true,
        },
      })
    );
  };

  const handleUserChange = (e: any) => {
    if (!users?.includes?.(e?.target?.value)) {
      setUsers([...users, e.target.value]);
    } else {
      removeSelectedUser(e?.target?.value);
    }
  };

  const removeSelectedUser = (userId: any) => {
    setUsers(users?.filter?.((user: any) => String(user) !== String(userId)));
  };

  // useEffect(() => {
  //   dispatch(getAllProjects());
  //   setUsers([]);
  // }, []);

  useEffect(() => {
    if (openGroup) {
      dispatch(getAllProjects());
    }
    setUsers([]);
    setProject(null);
  }, [openGroup]);

  const handleSubmit = () => {
    const payload = {
      body: {
        name,
        members: users,
        projectId: project.value,
      },
      success: () => {
        setName("");
        setProject(null);
        handleGroupClose()
        setUser(null);
        dispatch(getAllChats());
      },
    };
    dispatch(createChatRoom(payload));
  };
  
  return (
<>
<Popover
      className={classes.outerGroupWrapper}
        id={ButtonId}
        anchorReference={groupEl}
        open={openGroup}
        anchorEl={groupEl}
        onClose={handleGroupClose}
        anchorOrigin={{
          vertical: 45,
          horizontal: "left",
        }}
      >
    <Grid container  padding={2.5} className={classes.outerMenu}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  className={`${classes.searchInput} emptyBorder`}
                  placeholder="Enter chat name"
                />
              </Grid>

              <Grid item xs={12} style={{ zIndex: 3, paddingTop: 10 }}>
                <SelectDropdown
                  title="Project"
                  placeholder="Please select a project"
                  data={allProjects}
                  value={project}
                  handleChange={handleProjectChange}
                />
              </Grid>
              {projectMembers?.length > 0 && (
                <Grid
                  item
                  xs={12}
                  style={{ paddingTop: 10 }}
                  className={classes.suggestUser}
                >
                  <Grid container>
                    {projectMembers?.map((member: any) => {
                      if (!users?.includes?.(String(member?.user?.id)))
                        return null;

                      return (
                        <Grid
                          item
                          xs={4}
                          md={2}
                          className={classes.selectedUser}
                        >
                          <NameAvatar
                            firstName={member?.user?.firstName}
                            surName={member?.user?.surName}
                            url={member?.user?.profilePic}
                          />
                          <Cancel
                            onClick={() => removeSelectedUser(member.id)}
                            className={classes.cancelIcon}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>

                  <Typography className={classes.suggestedUsersTitle}>
                    Suggested users/groups
                  </Typography>

                  <Grid container>
                    {projectMembers?.map((member: any, index: number) => {
                      return (
                        <Grid container className={classes.wrapper}>
                          <Grid item xs={2}>
                            <NameAvatar
                              firstName={member?.user?.firstName}
                              surName={member?.user?.surName}
                              url={member?.user?.profilePic}
                            />
                          </Grid>
                          <Grid item xs={8}>
                            <div>
                              <Typography className={classes.titleText}>
                                {member?.user?.firstName}{" "}
                                {member?.user?.surName}
                              </Typography>
                              <Typography className={classes.subTitleText}>
                                {member?.role?.name} . {member?.group?.name}
                              </Typography>
                            </div>
                          </Grid>

                          <Grid item xs={2}>
                            <CustomCheckbox
                              onClick={handleUserChange}
                              value={member?.user?.id}
                              name={"s"}
                              checked={users?.includes?.(member?.user?.id)}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              )}

              <Grid item xs={12} style={{ paddingTop: 20, display:'flex', justifyContent:'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!project || user?.length < 1}
                >
                  {createChatLoading ? (
                    <Loading type="spin" color="white" height={24} width={24} />
                  ) : (
                    "Start conversation"
                  )}
                </Button>
                <Button onClick={handleGroupClose}>Cancel</Button>
              </Grid>
            </Grid>
      </Popover>
       
          
       

</>    
  )
}

export default CreateGroupChat

const useStyles = makeStyles((theme:any) => ({
    small: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    outerGroupWrapper:{
'& .MuiGrid-root':{
  padding:8
}
    },
    outerMenu: {
        width: '100%',
        maxWidth: 370,
        padding: '10px 14px'
    },
    searchInput: {
      width: 340,
      height: 30,
      border: `1px solid ${colors.borderGrey}`,
    },
    smallRadioButton: {
      fontSize: "14px !important",
      "& svg": {
        width: "0.8em",
        height: "0.8em",
      },
      "&$checked": {
        color: "green",
      },
    },
    suggestedUsersTitle: {
      fontSize: 12,
      fontWeight: 500,
      color: colors.textGrey,
      marginBottom: 10,
    },
    wrapper: {
      // borderBottom: `1px solid ${colors.grey}`,
      marginBottom: 5,
    },
    titleText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    subTitleText: {
      fontSize: 12,
      fontWeight: 500,
      color: colors.textGrey,
    },
    actionWrapper: {
      display: "flex",
      justifyContent: "flex-start",
      gap: 25,
      paddingTop: 10,
      paddingBottom: 15,
    },
    actionBtn: {
      fontSize: 12,
      fontWeight: "bold",
    },
    time: {
      fontSize: 12,
      fontWeight: "bold",
      color: colors.textGrey,
    },
    suggestUser: {
      maxHeight: 300,
      overflow: "auto",
    },
    selectedUser: {
      height: 50,
      width: 50,
      position: "relative",
    },
    cancelIcon: {
      fontSize: 14,
      position: "absolute",
      color: colors.textGrey,
      top: -5,
      right: 5,
    },
  }));
  