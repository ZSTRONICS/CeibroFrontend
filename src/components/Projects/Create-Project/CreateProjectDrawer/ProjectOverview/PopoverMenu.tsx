import { Menu, MenuItem } from '@mui/material';
import { CustomButton } from 'components/TaskComponent/Tabs/TaskCard';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import projectActions from 'redux/action/project.action';
import { RootState } from 'redux/reducers';
import StatusModal from './StatusModal';

function PopoverMenu(props:any) {
  const [openCloseStatusModal,setOpenCloseStatusModal]= useState(false)
  const projectOverview = useSelector((state: RootState) => state.project.projectOverview)
  const dispatch = useDispatch()
  
  const handleOpenCloseStatusModal=(e:any)=>{
    e.stopPropagation()
    setOpenCloseStatusModal((prev)=>!prev)
    
  }
  const handleDeleteStatus=(e:any)=>{
    e.stopPropagation()
    const projectStatus =[...projectOverview.extraStatus, projectOverview.extraStatus]
    let index = projectStatus.indexOf(props.editStatusValue); 
    if(index>-1){
      projectOverview.extraStatus=projectOverview.extraStatus.filter((item:string)=> item!== props.editStatusValue);
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          extraStatus: [...projectOverview.extraStatus],
        })
      );
    }
    props.closePopup()
  }

const id = props.openStatusPopup ? "status-popover" : undefined
  return (<>
    <Menu
    MenuListProps={{ sx: { py: 0 } }}
    id={id}
    open={props.openStatusPopup}
    anchorEl={props.anchorElemStatus}
    onClose={props.closePopup}
    sx={{ "& .MuiMenuList-padding": { padding: 0 } }}
    elevation={3}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
    <MenuItem
          disableGutters
          disableRipple
          onClick={props.closePopup}
          aria-describedby={id}
        >
         <CustomButton
          onClick={handleOpenCloseStatusModal}

                    variant="outlined"
                    disableRipple
                    sx={{ border: "none", textTransform: "capitalize" }}
                  >
                    Edit
                  </CustomButton>
        </MenuItem>
    <MenuItem
          disableGutters
          disableRipple
          aria-describedby={id}
          onClick={handleDeleteStatus}
        >
           <CustomButton
                        variant="outlined"
                        disableElevation
                        disableFocusRipple
                        disableRipple
                        sx={{
                          // padding:'0',
                          border: "none",
                          textTransform: "capitalize",
                          color: "#FA0808",
                        }}
                      >
                        Delete
                      </CustomButton>
        </MenuItem>
  </Menu>
  <StatusModal title="Edit Status" btnLabel="Update" editStatusValue={props.editStatusValue} openCloseStatusModal={openCloseStatusModal} handleOpenCloseStatusModal={handleOpenCloseStatusModal}/>
  </>
  )
}

export default PopoverMenu