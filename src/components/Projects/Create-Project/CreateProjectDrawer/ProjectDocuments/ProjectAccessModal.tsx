import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader
} from "@mui/material";
import assets from "assets/assets";
import { CustomMuiList } from "components/material-ui";
import { uniqueStringArray } from "components/Utills/Globals/Common";
import { useDispatch } from "react-redux";
import projectActions, { getAllDocuments, PROJECT_APIS } from "redux/action/project.action";

function ProjectAccessModal(props: any) {
  const { selectedFolderFile,selectedProject } = props;

  const dispatch = useDispatch();

  const [users, setUsers] = useState<string[]>([]);
  const [selectedGroupIds, setSelectedGroupId] = useState<string[]>([]);
  const [hasInitialized, setHasInitialized]= useState(true)

  const handleUserId = (id: any) => {
    if (!users.includes(id)) {
      setUsers([...users, id]);
    } else {
      removeSelectedUser(id);
    }
  };

  const handleUserChange = (e: any) => {
    if (!users.includes(e.target.value)) {
      setUsers([...users, e.target.value]);
    } else {
      removeSelectedUser(e.target.value);
    }
  };

  const removeSelectedUser = (userId: any) => {
    setUsers(users.filter((user: any) => String(user) !== String(userId)));
  };

  const handleGroupMemberChange = (e: any, group:any) => {
    const groupMembersId= group.members.map((member:any)=>member._id)
    if (!selectedGroupIds.includes(e.target.value)) {
      setSelectedGroupId([...selectedGroupIds, e.target.value]);
      setUsers((previousUsers: any) => [...previousUsers, ...groupMembersId])
    } else {
      removeSelectedGroupMember(e.target.value);
      setUsers((users: any) => users.filter((user: any) => !groupMembersId.includes(user)));
    }
  };
  const removeSelectedGroupMember = (groupId: any) => {
    setSelectedGroupId(selectedGroupIds.filter((gId: any) => String(gId) !== String(groupId)));
  };

  const handleGroupMember = (group:any) => {
    if(selectedGroupIds?.includes(group._id)){
      removeSelectedGroupMember(group._id)
      const groupMembersId= group.members.map((member:any)=>member._id)
      setUsers((users: any) => users.filter((user: any) => !groupMembersId.includes(user)));
    }else{
      setSelectedGroupId([...selectedGroupIds, group._id])
      const groupMembersId= group.members.map((member:any)=>member._id)
      setUsers((previousUsers: any) => [...previousUsers, ...groupMembersId])
    }
  };

  if(hasInitialized===true){
    const alreadySelectedMembers = selectedFolderFile?.access?.map((item:any)=> item._id)
    const alreadySelectedGroups = selectedFolderFile?.group?.length>0? selectedFolderFile.group.map((item:any)=> item._id):[]

    setUsers(alreadySelectedMembers)
    setSelectedGroupId(alreadySelectedGroups)
    setHasInitialized(false)
  }
  let allProjectMemberAccess = [...props.projectMembers,...selectedFolderFile.access ]

const uniqueAccessMember = (arr:any) => {
  const seen = new Set();
  return arr.filter((obj:any) => {
    const id = obj._id;
    const isDuplicate = seen.has(id);
    seen.add(id);
    return !isDuplicate;
  });
};

const hasKey = (obj: any, key: string) => obj.hasOwnProperty(key);
let localType: string = "";
let localId: string = "";
if (hasKey(selectedFolderFile, "name")) {
    localType = "Folder";
    localId = selectedFolderFile._id;
  } else {
    localType = "File";
    localId = selectedFolderFile._id;
  }

  const handleSubmit = () => {
    const payload = {
      body: {
        access: uniqueStringArray(users),
        group: selectedGroupIds,
        type: localType,
        id: localId,
      },
      success: () => {
        setUsers([]);
        setSelectedGroupId([]);
        dispatch(getAllDocuments({ other: { selectedProject } }));
      },
      other: selectedProject,
    };

    dispatch(PROJECT_APIS.updateProjectDocumentsAccess(payload));
    dispatch(projectActions.closeProjectDocumentModal());
  };

  const handleCancel = () => {
    dispatch(projectActions.closeProjectDocumentModal());
    setUsers([]);
    setSelectedGroupId([]);
  };

  return (
    <>
      <Box sx={{ overflowY: "auto", paddingLeft: "0" }}>
        <List
          // dence
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            "& .css-1rki8sg-MuiListItem-root": {
              paddingLeft: "0px",
            },
          }}
          subheader={
            <ListSubheader
              component="div"
              sx={{
                position: "relative",
                "&.MuiListSubheader-root": { p: 0 },
                // "& .css-dfh9eq-MuiListSubheader-root": { lineHeight: 5 },
                fontFamily: "inter",
                lineHeight: "30px",
                fontSize: "12px",
                fontWeight: 500,
                color: "#605C5C",
              }}
            >
              Select groups
            </ListSubheader>
          }
        >
          {props.projectGroup?.map((group: any) => {
            const labelId = `checkbox-list-secondary-label-${group._id}`;
            return (
              <ListItem
                // disablePadding
                aria-disabled
                key={group._id}
                secondaryAction={
                  <Checkbox
                    sx={{
                      // padding:"0",
                      "&.MuiCheckbox-root": {
                        color: "#ADB5BD",
                      },
                      "&.Mui-checked": {
                        color: "#f1b740",
                      },
                    }}
                    disableRipple
                    edge="end"
                    value={group?._id}
                    onChange={(e:any)=>handleGroupMemberChange(e, group)}
                    checked={selectedGroupIds?.some(
                      (id: any) => id === group?._id
                    )}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
              >
                <ListItemButton
                  sx={{ p: 0, 
                    // pb: "10px"
                   }}
                  disableRipple
                  onClick={() => handleGroupMember(group)}
                >
                  <ListItemAvatar>
                  <Avatar variant="rounded">
                       <img src = {assets.GroupIcon} alt=""/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      "& .css-10hburv-MuiTypography-root": {
                        fontFamily: "inter",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#000000",
                      },
                    }}
                    id={labelId}
                    primary={`${group?.name}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <CustomMuiList
          sx={{
            // paddingLeft: "15px",
            color: "#605C5C",
            fontSize: "12px",
            fontWeight: "500",
            fontFamily: "inter",
          }}
          handleUserId={handleUserId}
          subheaderTitle={"Select members"}
          groupMembers={uniqueAccessMember(allProjectMemberAccess)}
          handleUserChange={handleUserChange}
          checkboxChecked={users}
        />

        <Grid
          container
          item
          gap="20px"
          sx={{ padding: "0 15px 10px 10px" }}
          xs={12}
          style={{
            paddingTop: 10,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#9D9D9D",
              borderColor: "#9D9D9D",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            sx={{ fontSize: 12, fontWeight: 700 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={
              users?.length > 0 || selectedGroupIds?.length > 0 ? false : true
            }
          >
            Ok
          </Button>
        </Grid>
      </Box>
    </>
  );
}

export default ProjectAccessModal;
