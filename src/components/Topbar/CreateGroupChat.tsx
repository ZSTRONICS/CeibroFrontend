import React, { useCallback, useEffect, useState } from "react";

// material
import { Typography, Button, Grid, Avatar, Stack, Box } from "@mui/material";
import { makeStyles, Popover } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

// redux
import { useDispatch, useSelector } from "react-redux";
import { createChatRoom } from "../../redux/action/auth.action";
import { getAllChats } from "../../redux/action/chat.action";
import {
  getAllProjects,
  getAllProjectsWithMembers,
} from "../../redux/action/project.action";
import { RootState } from "../../redux/reducers";

// components
import TextField from "components/Utills/Inputs/TextField";
import colors from "../../assets/colors";
import CustomCheckbox from "../Utills/Inputs/Checkbox";
import SelectDropdown from "../Utills/Inputs/SelectDropdown";
import Loading from "../Utills/Loader/Loading";
import NameAvatar from "../Utills/Others/NameAvatar";
import assets from "assets/assets";
import { CustomMuiList } from "components/material-ui";
import Input from "components/Utills/Inputs/Input";

function CreateGroupChat(props: any) {
  const { groupEl, ButtonId, openGroup, handleGroupClose } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [project, setProject] = useState<any>();
  const [user, setUser] = useState<any>();
  const [users, setUsers] = useState<any>([]);
  const [name, setName] = useState("");
  const [searchQuery, setSearchField] = useState("");
  const [selectedGroupIds,setSelectedGroupId]= useState<any>([])

let localGroupMembers:any= null
let localGroups:any= null

  const createChatLoading = useSelector(
    (state: RootState) => state.chat.createChatLoading
  );

  const {
    projectMembers,
    projectWithMembers,
    allProjectsTitles,
  } = useSelector((store: RootState) => store.project);



  const handleUserId = ( id:any) => {
    if (!users?.includes(id)) {
      setUsers([...users,id]);
    } else {
      removeSelectedUser(id);
    }
  }
  const handleUserChange = (e: any) => {
    if (!users?.includes?.(e.target.value)) {
      setUsers([...users, e.target.value]);
    } else {
      removeSelectedUser(e?.target?.value);
    }
  };
  
  const removeSelectedUser = (userId: any) => {
    setUsers(users?.filter?.((user: any) => String(user) !== String(userId)));

  };

    const groupWithMember:any = projectWithMembers.filter((proj:any) => {
      if(!proj || !project){
        return
      }
    if(project){
      if(proj?._id === project?.value){
        localGroupMembers= proj?.projectMembers 
        localGroups= proj?.groups
        return proj?._id === project?.value
    }}
    }).find((proj:any)=>proj)

    localGroupMembers = groupWithMember?.projectMembers?.filter((gMember: any) => {
      const fullName = `${gMember?.firstName} ${gMember?.surName}`
      return (
          fullName.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
      })

    localGroups = groupWithMember?.groups?.filter((group: any) => {
      const groupName = `${group?.name}`
      return (
        groupName.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
      })

     const handleProjectChange = (e: any) => {
        setProject(e);
        setUsers([]);
        setSelectedGroupId([])
        localGroupMembers= null
        localGroups= null
      };

    const handleGroupMember = (e: any, group:any) => {
      if(selectedGroupIds.includes(group._id)){
        setSelectedGroupId((groupIds: any) => (groupIds.filter((groupId:any) => (groupId !== group._id))))
        const groupMembersId= group.members.map((member:any)=>member.id)
        setUsers((users: any) => users.filter((user: any) => !groupMembersId.includes(user)));

      }else{
        setSelectedGroupId((previousIds: any) => [...previousIds, group._id])
        const groupMembersId= group.members.map((member:any)=>member.id)
        setUsers((previousIds: any) => [...previousIds, ...groupMembersId])
      }
   //  const groupMembersId= group.members.map((member:any)=>member.id)
     
    //  if (!users?.includes?.(e.target.value)) {
    //    setUsers(groupMembersId);
    //   } else {
    //     setUsers([]);
    //   }
    };

  useEffect(() => {
    if (openGroup) {
      dispatch(getAllProjects());
      dispatch(getAllProjectsWithMembers());
    }
  
    setName("");
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
        handleGroupClose();
        setUser(null);
        dispatch(getAllChats());
      },
    };
   
    dispatch(createChatRoom(payload));
  };

  const handleGroupSearch = useCallback((e: any) => {
    const searchVal = e.target.value
    setSearchField(searchVal)
  }, []);
  
  return (
    <>
      <Popover
        className={classes.outerGroupWrapper}
        id={ButtonId}
        open={openGroup}
        anchorEl={groupEl}
        onClose={handleGroupClose}
        anchorOrigin={{
          vertical: 45,
          horizontal: "left",
        }}
      >
        <Grid container padding={2.5} className={classes.outerMenu}>
          <Stack>
            <TextField
              type="text"
              value={name || ''}
              onChange={(e: any) => setName(e.target.value)}
              className={`${classes.searchInput} emptyBorder`}
              placeholder="Enter chat name"
            />
            <Box mb={1.2}>
             <SelectDropdown
              title="Project"
              placeholder="Please select a project"
              data={allProjectsTitles}
              value={project}
              handleChange={handleProjectChange}
            />
            </Box>
            <Box mb={1.2}>
           {project!==null && <Input
            placeholder="Type the name of person or group"
            title="Chat with"
            onChange={handleGroupSearch}
          />}
            </Box>
            {groupWithMember?.projectMembers?.length > 0 && (
            <Grid
              item
              xs={12}
              style={{ paddingTop: 8 }}
              className={classes.suggestUser}
            >
              <Grid container>
                <Typography p={0.4}>Project Groups</Typography>
                {groupWithMember?.projectMembers?.map((member: any) => {
                  if (!users?.includes(String(member.id))) return null;

                  return (
                    <Grid item xs={4} md={2} className={classes.selectedUser}>
                      <NameAvatar
                        firstName={member?.firstName}
                        surName={member?.surName}
                        url={member?.profilePic}
                      />
                      <Cancel
                        onClick={() => removeSelectedUser(member.id)}
                        className={classes.cancelIcon}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              
              {<Grid container>
                  {localGroups?.map((group: any, index: number) => {
                    return (<>
                    { <Grid container className={classes.wrapper} key={group._id+index}>
                    <Grid item xs={2}>
                      <Avatar variant="rounded">
                       <img src = {assets.GroupIcon} alt=""/>
                    </Avatar>
                    </Grid>
                    <Grid item xs={8}>
                      <div>
                        <Typography className={classes.titleText}>
                          {group.name} 
                        </Typography>
                        {group?.members?.slice(0,2).map((member:any)=>{
                         return( <Typography className={classes.subTitleText}>
                          {member.firstName} {member.surName},
                        </Typography>)
                        }) }
                      </div>
                    </Grid>

                    <Grid item xs={2}>
                      <CustomCheckbox
                        onClick={(e:any)=>handleGroupMember(e, group)}
                        value={group._id}
                        name={"s"}
                        checked={selectedGroupIds.includes(group._id)}
                      />
                    </Grid>
                  </Grid>}
                    </>
                    );
                  })}
                 </Grid>
                }
                <CustomMuiList handleUserId={handleUserId} 
                subheaderTitle= {"Project Members"} 
                groupMembers = {localGroupMembers} 
                handleUserChange= {handleUserChange} 
                checkboxChecked = {users}/>
            </Grid>
          )}
          </Stack>

          <Grid
            item
            xs={12}
            style={{
              paddingTop: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
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
  );
}

export default CreateGroupChat;

const useStyles = makeStyles((theme: any) => ({
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  outerGroupWrapper: {
    "& .MuiGrid-root": {
      // padding: 8,
    },
  },
  outerMenu: {
    width: "100%",
    maxWidth: 370,
    padding: "10px 14px",
  },
  searchInput: {
    width: 340,
    height: 30,
    paddingBottom: '20px',
    paddingTop: '10px',
    marginBottom:10,
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
    display:'inline-block',
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
