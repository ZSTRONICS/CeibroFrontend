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
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import assets from "assets/assets";
import { CustomMuiList } from "components/material-ui";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import CustomCheckbox from "components/Utills/Inputs/Checkbox";
import NameAvatar from "components/Utills/Others/NameAvatar";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import projectActions, { PROJECT_APIS } from "redux/action/project.action";

function ProjectAccessModal(props: any) {
    const {selectedFolderFile}= props;
    
    const dispatch= useDispatch()
  const [users, setUsers] = useState<string[]>([]);
  const [selectedGroupIds, setSelectedGroupId] = useState<string[]>([]);

  const handleUserId = (id: any) => {
    if (!users?.includes(id)) {
      setUsers([...users, id]);
    } else {
      removeSelectedUser(id);
    }
  };
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

  const handleGroupMember = (group: any) => {
    if (selectedGroupIds.includes(group._id)) {
      setSelectedGroupId((groupIds: any) =>
        groupIds.filter((groupId: any) => groupId !== group._id)
      );
    } else {
      setSelectedGroupId((previousIds: any) => [...previousIds, group._id]);
    }
  };

 const hasKey = (obj:any, key:string) => obj.hasOwnProperty(key);
let localType:string=""
let localId :string=""
if (hasKey(selectedFolderFile, 'name')) {
    localType= "Folder"
    localId= selectedFolderFile._id
} else {
    localType= "File"
    localId= selectedFolderFile._id
}

  const handleSubmit = () => {
    const payload = {
      body: {
        access: users,
        group: selectedGroupIds,
        type: localType, 
        id: localId, 
      },
      success: () => {
        setUsers([]);
        setSelectedGroupId([]);
      },
      other:props.selectedProject
    };

    dispatch(PROJECT_APIS.updateProjectDocumentsAccess(payload))
    dispatch(projectActions.closeProjectDocumentModal())

  };

  const handleCancel = () => {
    dispatch(projectActions.closeProjectDocumentModal())
    setUsers([]);
    setSelectedGroupId([]);
  }

  return (
    <>
      <Box sx={{width:'350px', overflow:'auto'}}>
        <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={
        <ListSubheader
          component="div"
          sx={{ position: "relative", "&.MuiListSubheader-root": { p: 0 } }}
        >
          Select groups
        </ListSubheader>
      }
    >
        {props.projectGroup?.map((group: any) => {
        const labelId = `checkbox-list-secondary-label-${group._id}`;
        return (
          <ListItem
            disablePadding
            aria-disabled
            key={group._id}
            secondaryAction={
              <Checkbox
                sx={{
                  "&.MuiCheckbox-root": {
                    color: "#ADB5BD",
                  },
                  "&.Mui-checked": {
                    color: "#1976d2",
                  },
                }}
                disableRipple
                edge="end"
                value={group._id}
                onChange={handleGroupMember}
                checked={selectedGroupIds.some(
                  (id: any) => id === group._id
                )}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
          >
            <ListItemButton
              sx={{ p: 0, pb: 0.5 }}
              disableRipple
              onClick={() => handleGroupMember(group)}
            >
              <ListItemAvatar>
                <NameAvatar
                  firstName={group.name}
                />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={`${group.name}`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
        <CustomMuiList
          handleUserId={handleUserId}
          subheaderTitle={"Project Members"}
          groupMembers={props.projectMembers}
          handleUserChange={handleUserChange}
          checkboxChecked={users}
        />
        <Grid
          container gap={1.5}
          sx={{pb:1}}
          xs={12}
          style={{
            paddingTop: 20,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
           variant="outlined"
           sx={{  fontSize: 12,
            fontWeight: 700,
            color: "#9D9D9D",
            borderColor: "#9D9D9D",}}
          onClick={handleCancel}
          >Cancel</Button>
          <Button
          sx={{  fontSize: 12,
            fontWeight: 700,}}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={users?.length < 1}
          >Ok</Button>
        </Grid>
      </Box>
    </>
  );
}

export default ProjectAccessModal;
