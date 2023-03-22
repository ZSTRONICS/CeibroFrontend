import CButton from "components/Button/Button";
import CustomModal from "components/Modal";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import Input from "components/Utills/Inputs/Input";
import InputHOC from "components/Utills/Inputs/InputHOC";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions from "redux/action/project.action";
import { RootState } from "redux/reducers";

function StatusModal(props: any) {
  const dispatch = useDispatch();
  const projectOverview = useSelector(
    (state: RootState) => state.project.projectOverview
  );
  const [status, setStatus] = React.useState<string>(props.editStatusValue?props.editStatusValue:"");

  const projectStatus = projectOverview.extraStatus.filter(
    (item: string) => item !== "" && item !== undefined
  );

  const isStatusExists = (input: string) => {
    return projectStatus.some(
      (localStatus: string) => localStatus.toLowerCase() === input.toLowerCase()
    );
  };

  const handleChangeStatusValue = (e: any) => {
    e.stopPropagation();
    setStatus(e.target.value);
  };

  const handleStatus = (e: any, isEditMode: boolean) => {
    e.stopPropagation();

    if (isEditMode === true) {
      const prevStatusValue = String(props.editStatusValue);
      let statusIndex = projectStatus.indexOf(prevStatusValue);
      if (statusIndex > -1) {
        projectOverview.extraStatus[statusIndex] = status;
        dispatch(
          projectActions.setProjectOverview({
            ...projectOverview,
            extraStatus: projectStatus,
          })
        );
      } else {
        return;
      }
    } else {
      if (isStatusExists(status)) {
        toast.error("Status already exist");
        return;
      } else {
        dispatch(
          projectActions.setProjectOverview({
            ...projectOverview,
            extraStatus: [...projectStatus, status],
            publishStatus: status,
          })
        );
      }
    }

    handleCloseModal();
  };
  
  const handleCloseModal = () => {
    setStatus("");
    props.handleOpenCloseStatusModal();
  };

  return (
    <CustomModal
      title={props.title}
      showCloseBtn={false}
      isOpen={props.openCloseStatusModal}
      handleClose={handleCloseModal}
      children={
        <>
          <Input
            title="Status"
            placeholder="Enter status name"
            value={status}
            maxLength={15}
            onChange={(e: any) => handleChangeStatusValue(e)}
          />
          <CustomStack justifyContent="flex-end" py={2.2} gap={1.2}> 
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
            <CButton
              variant="contained"
              label={props.btnLabel}
              disabled={String(status).length > 0 ? false : true}
              onClick={(e: any) => {
                handleStatus(e, props.btnLabel === "Add" ? false : true);
              }}
            />
           
          </CustomStack>
        </>
      }
    />
  );
}

export default StatusModal;
