import { Box, Button } from "@mui/material";
import CustomModal from "components/Modal";
import { Drawing, ITask } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { taskActions } from "redux/action";
import { PROJECT_APIS } from "redux/action/project.action";
import { RootState } from "redux/reducers";
import { fetchDrawingTaskList } from "utills/common";
import { filterData, findData } from "../utils";
import DrawingHeader from "./DrawingHeader";
import LocatoinDrawingList from "./LocatoinDrawingList";

interface RouteParams {
  projectId: string;
  groupId: string;
  drawingId: string;
}

function LocationDrawingDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { projectId, groupId, drawingId } = useParams<RouteParams>();
  const { isOpen, closeModal, openModal } = useOpenCloseModal();
  const isRenderEffect = useRef<boolean>(true);
  let allDrawingTaskList: ITask[] = [];
  const { allProjects, allGroups, allDrawingImages } = useSelector(
    (state: RootState) => state.project
  );
  let selectedGroup: any = findData(allGroups, "_id", groupId);
  useEffect(() => {
    if (!selectedGroup) {
      openModal();
    }
  }, [selectedGroup]);
  const {
    allTasksAllEvents,
    loadingAllTasksAllEvents,
    RECENT_TASK_UPDATED_TIME_STAMP,
  } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    if (isRenderEffect.current) {
      isRenderEffect.current = false;
      allProjects.length === 0 && dispatch(PROJECT_APIS.getAllProjects());
      allTasksAllEvents.allTasks.length === 0 &&
        dispatch(taskActions.getAllTasksAllEvents());
      if (drawingId) {
        dispatch(
          PROJECT_APIS.getAllDrawingImagesById({
            other: {
              drawingId: drawingId,
            },
          })
        );
      }
    }
    dispatch(taskActions.resetDrawingFilters());
  }, []);

  useEffect(() => {
    if (!projectId || projectId === "") {
      history.replace(`/location/${allProjects[0]._id}`);
    } else if (!groupId || groupId === "") {
      let selectedGroup: any = findData(allGroups, "_id", groupId);
      history.replace(`/location/${projectId}/${selectedGroup._id}`);
    } else if (!drawingId || drawingId === "") {
      let selectedGroup: any = findData(allGroups, "_id", groupId);
      let selectedDrawing: any = findData(
        selectedGroup.drawings,
        "_id",
        drawingId
      );
      if (selectedDrawing && selectedDrawing.length > 0) {
        history.replace(
          `/location/${projectId}/group/${groupId}/drawing/${selectedDrawing._id}/task`
        );
      } else {
        history.replace(`/location/${projectId}/group/${groupId}/drawing/task`);
      }
    }
  }, [projectId, groupId, drawingId]);

  const localProjectData = useMemo(() => {
    let selectedProject = filterData(allProjects, "_id", projectId);
    if (allGroups.length === 0) {
      return;
    }
    let selectedProjectGroups = filterData(allGroups, "projectId", projectId);

    let selectedGroup: any = findData(allGroups, "_id", groupId);
    let selectedDrawing: Drawing | any | null = null;
    if (selectedGroup && selectedGroup.drawings.length > 0) {
      selectedDrawing = findData(selectedGroup.drawings, "_id", drawingId);
    }

    return {
      selectedProject,
      selectedProjectGroups,
      selectedGroup,
      selectedDrawing,
    };
  }, [projectId, groupId, drawingId, [...allGroups]]);

  const handleGroupAndFileChange = (event: any, type: "group" | "drawing") => {
    switch (type) {
      case "drawing":
        history.push(
          `/location/${projectId}/group/${groupId}/drawing/${event.target.value}/task`
        );
        break;
      case "group":
        let selectedGroup: any =
          localProjectData &&
          findData(
            localProjectData.selectedProjectGroups,
            "_id",
            event.target.value
          );
        history.push(
          `/location/${projectId}/group/${event.target.value}/drawing${
            selectedGroup.drawings[0]?._id
              ? "/" + selectedGroup.drawings[0]?._id
              : ""
          }/task`
        );
        break;

      default:
        break;
    }
  };
  const [headersize, setHeadersize] = useState<boolean>(true);
  if (
    localProjectData &&
    localProjectData.selectedGroup &&
    localProjectData.selectedDrawing
  ) {
    allDrawingTaskList = fetchDrawingTaskList(
      localProjectData,
      allTasksAllEvents
    );
  }
  return (
    <Box sx={{ mx: 2 }}>
      {localProjectData && localProjectData.selectedGroup && (
        <DrawingHeader
          handleChangeCallback={handleGroupAndFileChange}
          handleback={() => history.push(`/location/${projectId}/${groupId}`)}
          selectedProject={localProjectData.selectedProject}
          selectedProjectGroups={localProjectData.selectedProjectGroups}
          selectedGroup={localProjectData.selectedGroup}
          selectedDrawing={localProjectData.selectedDrawing}
          headersize={headersize}
          imageLocation={false}
        />
      )}
      <LocatoinDrawingList
        selectedDrawing={localProjectData && localProjectData.selectedDrawing}
        allDrawingTaskList={allDrawingTaskList}
        RECENT_TASK_UPDATED_TIME_STAMP={RECENT_TASK_UPDATED_TIME_STAMP}
        allTasksAllEvents={allTasksAllEvents}
        loadingAllTasksAllEvents={loadingAllTasksAllEvents}
        headersize={headersize}
        setHeadersize={setHeadersize}
      />

      {isOpen === true && (
        <CustomModal
          maxWidth={"sm"}
          showFullWidth={true}
          showDivider={true}
          showCloseBtn={false}
          showTitleWithLogo={false}
          title={"You no longer have access to this group!"}
          isOpen={isOpen}
          handleClose={closeModal}
          children={
            <>
              <Box
                sx={{
                  width: "100%",
                  height: "80px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#0076c8",
                    }}
                    to={`/location/${projectId}`}
                  >
                    Back
                  </Link>
                </Button>
              </Box>
            </>
          }
        />
      )}
    </Box>
  );
}

export default LocationDrawingDetails;
