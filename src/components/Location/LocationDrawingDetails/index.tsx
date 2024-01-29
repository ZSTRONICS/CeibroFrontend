import { Box } from "@mui/material";
import { Drawing, ITask } from "constants/interfaces";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { taskActions } from "redux/action";
import { PROJECT_APIS } from "redux/action/project.action";
import { RootState } from "redux/reducers";
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
  const isRenderEffect = useRef<boolean>(true);
  const { allProjects, allGroups } = useSelector(
    (state: RootState) => state.project
  );
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

  const filterData = (data: any[], filterKey: string, value: any): any[] => {
    if (data && data.length > 0) {
      return data.filter((item) => item[filterKey] === value);
    } else {
      return [];
    }
  };
  const findData = (data: any[], filterKey: string, value: any): any[] => {
    if (data && data.length > 0) {
      return data.find((item) => item[filterKey] === value);
    } else {
      return [];
    }
  };

  const projectData = useMemo(() => {
    let selectedProject = filterData(allProjects, "_id", projectId);
    let selectedProjectGroups = filterData(allGroups, "projectId", projectId);
    let selectedGroup: any = findData(allGroups, "_id", groupId);
    let selectedDrawing: Drawing | any = findData(
      selectedGroup.drawings,
      "_id",
      drawingId
    );

    return {
      selectedProject,
      selectedProjectGroups,
      selectedGroup,
      selectedDrawing,
    };
  }, [groupId, drawingId, allProjects, allGroups]);
  let allDrawingTaskList: ITask[] = [];
  if (projectData.selectedDrawing) {
    allTasksAllEvents.allPins.forEach((pin: any) => {
      if (pin.drawingId === projectData.selectedDrawing._id) {
        allTasksAllEvents.allTasks.forEach((task: ITask) => {
          if (task._id === pin.taskData._id) {
            allDrawingTaskList.push(task);
          }
        });
      }
    });
  }
  const handleGroupAndFileChange = (event: any, type: "group" | "drawing") => {
    switch (type) {
      case "drawing":
        history.push(
          `/location/project/${projectId}/group/${groupId}/drawing/${event.target.value}`
        );
        break;
      case "group":
        let selectedGroup: any = findData(
          projectData.selectedProjectGroups,
          "_id",
          event.target.value
        );
        history.push(
          `/location/project/${projectId}/group/${event.target.value}/drawing/${
            selectedGroup.drawings[0]?._id ?? ""
          }`
        );
        break;

      default:
        break;
    }
  };

  const [headersize, setHeadersize] = useState<boolean>(true);

  return (
    <Box sx={{ mx: 2 }}>
      {projectData && (
        <DrawingHeader
          handleChangeCallback={handleGroupAndFileChange}
          handleback={() => history.push(`/location/${projectId}/${groupId}`)}
          selectedProject={projectData.selectedProject}
          selectedProjectGroups={projectData.selectedProjectGroups}
          selectedGroup={projectData.selectedGroup}
          selectedDrawing={projectData.selectedDrawing}
          headersize={headersize}
        />
      )}
      <LocatoinDrawingList
        selectedDrawing={projectData.selectedDrawing}
        allDrawingTaskList={allDrawingTaskList}
        RECENT_TASK_UPDATED_TIME_STAMP={RECENT_TASK_UPDATED_TIME_STAMP}
        allTasksAllEvents={allTasksAllEvents}
        loadingAllTasksAllEvents={loadingAllTasksAllEvents}
        headersize={headersize}
        setHeadersize={setHeadersize}
      />
    </Box>
  );
}

export default LocationDrawingDetails;
