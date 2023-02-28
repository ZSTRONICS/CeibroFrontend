import react, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import CButton from "components/Button/Button";
import { CBox } from "components/material-ui";
import { AttachmentIcon, EyeIcon } from "components/material-ui/icons/index";
import { SubtaskInterface } from "constants/interfaces/subtask.interface";
import TaskDetailHeader from "./TaskDetailHeader";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RecentComments from "./RecentComments";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import CDrawer from "Drawer/CDrawer";
import ViewRejectionComments from "./ViewRejectionComments";
import { useDispatch, useSelector } from "react-redux";
import taskActions, { getAllSubTaskRejection } from "redux/action/task.action";
import {
  isTrue,
  momentdeDateFormat,
  momentTimeFormat,
} from "components/Utills/Globals/Common";
import { RootState } from "redux/reducers";
import ViewAllDocs from "./ViewAllDocs";
import {
  RejectedComment,
  RejectionComment,
} from "constants/interfaces/rejectionComments.interface";

interface Props {
  subtaskDetail: SubtaskInterface;
  taskAdmin: { id: string; label: string }[];
}
export default function TaskDetail({ subtaskDetail, taskAdmin }: Props) {
  const classes = useStyles();
  const [openCDrawer, setOpenCDrawer] = useState<boolean>(false);
  const [openRejectionDrawer, setOpenRejectionDrawer] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const getAllSubtaskRejection = useSelector(
    (state: RootState) => state.task.getAllSubtaskRejection
  );

  const viewRejection = getAllSubtaskRejection.map((item: any) => {
    return {
      name: `${item.name}`,
      message: item.message,
      _id: item._id,
      date: momentdeDateFormat(item.createdAt),
      time: momentTimeFormat(item.createdAt),
    };
  });

  useEffect(() => {
    dispatch(
      taskActions.getAllCommentsOfSubtaskById({ other: subtaskDetail._id })
    );
  }, []);

  const handleRejectionDrawer = () => {
    setOpenRejectionDrawer((prev: boolean) => !prev);
    dispatch(
      getAllSubTaskRejection({
        other: {
          subtaskId: subtaskDetail._id,
        },
      })
    );
  };
  const handleAttachmentDrawer = () => {
    setOpenCDrawer((prev: boolean) => !prev);
  };
  const handleCloseRejectionDrawer = () => {
    setOpenRejectionDrawer((prev: boolean) => !prev);
  };
  const isTaskAdmin = taskAdmin.some((item: any) => item.id === user._id);

  return (
    <>
      <div>
        <CBox className={classes.wrapper}>
          <TaskDetailHeader subtaskDetail={subtaskDetail} />
          <CustomStack justifyContent="flex-end" gap={3} mr={2}>
            {isTaskAdmin && (
              <CBox display="flex" alignItems="center">
                <CButton
                  styles={{ fontSize: 14, textTransform: "capitalize" }}
                  onClick={handleRejectionDrawer}
                  startIcon={<VisibilityOutlinedIcon />}
                  label={"Rejections"}
                />
              </CBox>
            )}
            <CBox
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              // mt={1}
            >
              <CButton
                styles={{ fontSize: 14, textTransform: "capitalize" }}
                onClick={handleAttachmentDrawer}
                startIcon={<AttachmentIcon />}
                label={"Attachments"}
              />
            </CBox>
          </CustomStack>

          <RecentComments subtaskDetail={subtaskDetail} />
        </CBox>
      </div>
      <CDrawer
        showBoxShadow={true}
        hideBackDrop={true}
        openCDrawer={openRejectionDrawer}
        handleCloseCDrawer={handleCloseRejectionDrawer}
        children={
          <ViewRejectionComments
            subTaskHeading="Subtask Rejection"
            handleCloseCDrawer={handleCloseRejectionDrawer}
            cardData={viewRejection}
          />
        }
      />
      <CDrawer
        showBoxShadow={true}
        hideBackDrop={true}
        openCDrawer={openCDrawer}
        handleCloseCDrawer={handleAttachmentDrawer}
        children={
          <ViewAllDocs
            heading="Attachments"
            handleCloseCDrawer={handleAttachmentDrawer}
            moduleName={"SubTask"}
            moduleId={subtaskDetail._id}
          />
        }
      />
    </>
  );
}
const useStyles = makeStyles({
  wrapper: {
    // overflow: "scroll !important",
    padding: "10px 15px",
    backgroundColor: "#F5F7F8",
  },
  heading: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#7D7E80",
  },
  description: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#000000",
    marginBottom: 5,
  },

  status: {
    fontSize: 10,
    color: "#fff !important",
    backgroundColor: "#F1B740",
    borderRadius: "3px !important",
    width: "100%",
    maxWidth: "53px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 19,
    marginRight: "5px !important",
  },
});
