import CButton from 'components/Button/Button';
import CustomModal from 'components/Modal'
import { CustomStack } from 'components/TaskComponent/Tabs/TaskCard';
import Input from 'components/Utills/Inputs/Input';
import InputHOC from 'components/Utills/Inputs/InputHOC'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import projectActions from 'redux/action/project.action';
import { RootState } from 'redux/reducers';

function StatusModal(props:any) {
    const dispatch = useDispatch()
    const projectOverview = useSelector((state: RootState) => state.project.projectOverview)
    const [status,setStatus]= React.useState(props.editStatusValue)
  const projectStatus =[projectOverview.publishStatus,...projectOverview.extraStatus]
 
  const handleChangeStatusValue=(e:any)=>{
    e.stopPropagation()
    setStatus(e.target.value)
  }
  const handleAddCustomStatus=(e:any)=>{
    e.stopPropagation()
    let statusIndex = projectOverview.extraStatus.indexOf(props.editStatusValue);
    // console.log('statusIndex',statusIndex);
    if (statusIndex > -1) {
      projectOverview.extraStatus[statusIndex] = status;
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          extraStatus: projectOverview.extraStatus,
        })
      );
    } else {
        if(projectStatus.includes(String(status))){
            toast.error('status already exist')
            return 
        }
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          extraStatus: [...projectOverview.extraStatus, status],
        })
      );
    }

        handleCloseModal()
}
const handleCloseModal=()=>{
  setStatus("")
  props.handleOpenCloseStatusModal()
    }
    const statusInput=()=>{
        return(<>
    <Input title='Status' placeholder="Enter status name"  value={status} maxLength={15} onChange={(e: any) => handleChangeStatusValue(e)}/>
    <CustomStack justifyContent="flex-end" py={2.2} gap={1.2}>
        <CButton variant='contained' label={props.btnLabel} onClick={handleAddCustomStatus} disabled={String(status).length>0?false:true} />
        <CButton
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
              onClick={handleCloseModal}
              variant="outlined"
            />
    </CustomStack>
    </>)
    }

  return (<>
  <CustomModal
      title={props.title}
      showCloseBtn={false}
      isOpen={props.openCloseStatusModal}
      handleClose={handleCloseModal}
      children={statusInput()}
      />
  
  </> 
  )
}

export default StatusModal