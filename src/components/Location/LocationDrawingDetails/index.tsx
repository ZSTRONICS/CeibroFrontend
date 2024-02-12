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
  const [allDrawingTaskList, setAllDrawingTaskList] = useState<ITask[]>([]);
  const { allProjects, allGroups } = useSelector(
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
    }
    dispatch(taskActions.resetDrawingFilters());
  }, []);

  useEffect(() => {
    let newPath = "/location";
    if (!projectId || projectId === "") {
      newPath += `/${allProjects[0]._id}`;
      // history.replace(`/location/${allProjects[0]._id}`);
    } else if (!groupId || groupId === "") {
      let selectedGroup: any = findData(allGroups, "_id", groupId);
      newPath += `/${selectedGroup._id}`;
      // history.replace(`/location/${projectId}/${selectedGroup._id}`);
    } else if (
      !drawingId ||
      (drawingId !== "" && selectedGroup && selectedGroup.drawings)
    ) {
      let selectedGroup: any = findData(allGroups, "_id", groupId);
      let selectedDrawing: any = findData(
        selectedGroup.drawings,
        "_id",
        drawingId
      );
      if (selectedDrawing) {
        console.log(selectedDrawing, "selectedDrawing");
        newPath += `/project/${projectId}/group/${groupId}/drawing/${selectedDrawing._id}/task`;
        // history.replace(`/location/project/${projectId}/group/${groupId}/drawing/${selectedDrawing._id}/task`);
      } else {
        newPath += `/${projectId}`;
        // history.replace(`/location/${projectId}/${groupId}`);
      }
    }
    history.replace(newPath);
  }, [projectId, groupId, drawingId]);

  const projectData = useMemo(() => {
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
  }, [groupId, drawingId, allProjects, [...allGroups].length]);

  useEffect(() => {
    if (projectData && projectData.selectedDrawing) {
      fetchDrawingTaskList &&
        fetchDrawingTaskList(
          projectData,
          allTasksAllEvents,
          setAllDrawingTaskList
        );
    }
  }, [
    allTasksAllEvents.allTasks.length,
    drawingId,
    groupId,
    RECENT_TASK_UPDATED_TIME_STAMP,
    projectData && projectData.selectedDrawing,
  ]);

  const handleGroupAndFileChange = (event: any, type: "group" | "drawing") => {
    switch (type) {
      case "drawing":
        history.push(
          `/location/project/${projectId}/group/${groupId}/drawing/${event.target.value}/task`
        );
        break;
      case "group":
        let selectedGroup: any =
          projectData &&
          findData(
            projectData.selectedProjectGroups,
            "_id",
            event.target.value
          );
        history.push(
          `/location/project/${projectId}/group/${event.target.value}/drawing${
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

  return (
    <Box sx={{ mx: 2 }}>
      {projectData &&
        projectData.selectedGroup &&
        projectData.selectedDrawing && (
          <DrawingHeader
            handleChangeCallback={handleGroupAndFileChange}
            handleback={() => history.push(`/location/${projectId}/${groupId}`)}
            selectedProject={projectData.selectedProject}
            selectedProjectGroups={projectData.selectedProjectGroups}
            selectedGroup={projectData.selectedGroup}
            selectedDrawing={projectData.selectedDrawing}
            headersize={headersize}
            imageLocation={false}
          />
        )}
      <LocatoinDrawingList
        selectedDrawing={projectData && projectData.selectedDrawing}
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
