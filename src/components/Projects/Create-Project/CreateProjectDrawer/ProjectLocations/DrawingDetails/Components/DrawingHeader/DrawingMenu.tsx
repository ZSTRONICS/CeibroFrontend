import { Grid } from "@mui/material";
import { LoadingButton } from "components/Button";
import { formatDropdownData } from "components/Utills/Globals";
import { AutocompleteField } from "components/material-ui/customMuiTextField/simpleTextField";
import { Drawing } from "constants/interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_APIS } from "redux/action";
import projectActions from "redux/action/project.action";
import { RootState } from "redux/reducers";
import { socket } from "services/socket.services";

interface OptionFormat {
  label: string;
  value: string;
}

function DrawingMenu() {
  const dispatch = useDispatch();
  const {
    allProjects,
    selectedProject,
    allFloors,
    selectedFloor,
    selectedDrawing,
  } = useSelector((state: RootState) => state.project);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [selectedFloorIdLocal, setSelectedFloorLocal] =
    useState<OptionFormat | null>(null);
  const [selectedDrawingLocal, setSelectedDrawingLocal] =
    useState<OptionFormat | null>(null);
  const [selectedProjectLocal, setSelectedProjectLocal] =
    useState<OptionFormat | null>(null);
  const [open, setOpen] = useState(false);

  const selectedProjectId = socket.getSelectedProjId();
  const loading = open && allFloors.length === 0;
  const mdPoint: number = 2.8;

  useEffect(() => {
    if (selectedProjectLocal === null) {
      setSelectedFloorLocal(null);
      setSelectedDrawingLocal(null);
      setDrawings([]);
    }
    return () => undefined;
  }, [selectedProjectLocal]);

  useEffect(() => {
    if (allProjects.length === 0 && !selectedProject) {
      dispatch(PROJECT_APIS.getAllProjects());
    }
  }, []);

  useEffect(() => {
    if (selectedProject) {
      dispatch(
        PROJECT_APIS.getFloorsByProjectId({
          other: {
            projectId: String(selectedProject),
          },
        })
      );
    }
  }, [selectedProject]);

  useEffect(() => {
    if (!loading) {
      return () => {};
    }
  }, [loading]);

  useEffect(() => {
    if (selectedProjectId) {
      const selectProj = allProjects.find(
        (project: Project) => project._id === selectedProjectId
      );
      if (selectProj) {
        setSelectedProjectLocal({
          label: selectProj.title,
          value: selectProj._id,
        });
      }
    }
  }, [selectedProjectId, allProjects]);

  useEffect(() => {
    if (selectedFloor) {
      setSelectedFloorLocal({
        label: selectedFloor.floorName,
        value: selectedFloor._id,
      });
    }
  }, [selectedFloor]);

  useEffect(() => {
    if (selectedDrawing) {
      setSelectedDrawingLocal({
        label: selectedDrawing.drawingName,
        value: selectedDrawing._id,
      });
    }
  }, [selectedDrawing]);

  const handleProjectChange = (event: any, option: any) => {
    setSelectedFloorLocal(null);
    setSelectedDrawingLocal(null);
    setDrawings([]);
    setSelectedProjectLocal(option ? option : null);
    dispatch(projectActions.setSelectedProject(option ? option.value : null));
  };

  const handleFloorChange = (event: any, option: any) => {
    setDrawings([]);
    setSelectedDrawingLocal(null);
    if (option.value) {
      setSelectedFloorLocal(option ? option : null);
      const foundFloor = allFloors.find(
        (floor: any) => floor._id === option.value
      );
      dispatch(projectActions.setSelectedFloor(foundFloor || null));
      const floor = allFloors.find((floor: any) => floor._id === option.value);
      setDrawings(floor ? floor.drawings : []);
    }
  };

  const handleDrawingChange = (event: any, option: any) => {
    if (drawings.length > 0) {
      const selectedDrawingLocal: any = drawings.find(
        (drawing: Drawing) => drawing._id === option.value
      );
      dispatch(projectActions.setSelectedDrawing(selectedDrawingLocal));
      setSelectedDrawingLocal(option ? option : null);
    }
  };

  const handleLoadDrawing = () => {
    dispatch(projectActions.setLoadDrawing(true));
  };

  return (
    <>
      <Grid container gap={2} justifyContent="flex-start">
        <Grid item md={mdPoint}>
          <AutocompleteField
            placeholder="Select Project"
            label="Project"
            options={formatDropdownData(allProjects, "title", "_id")}
            onChange={handleProjectChange}
            sx={style}
            showSideLabel={true}
            value={selectedProjectLocal}
          />
        </Grid>
        <Grid item md={mdPoint}>
          <AutocompleteField
            placeholder="Select Floor"
            label="Floor"
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            loading={loading}
            options={formatDropdownData(allFloors, "floorName", "_id")}
            onChange={handleFloorChange}
            value={selectedFloorIdLocal}
            sx={style}
            showSideLabel={true}
          />
        </Grid>
        <Grid item md={mdPoint}>
          <AutocompleteField
            placeholder="Select Drawing"
            label="Drawing"
            options={formatDropdownData(drawings, "drawingName", "_id")}
            getOptionLabel={(option) => option.label}
            onChange={handleDrawingChange}
            value={selectedDrawingLocal}
            sx={style}
            showSideLabel={true}
          />
        </Grid>
        {selectedDrawing && selectedProject && (
          <Grid item md={mdPoint}>
            <LoadingButton variant="contained" onClick={handleLoadDrawing}>
              Load Drawing
            </LoadingButton>
          </Grid>
        )}
      </Grid>
    </>
  );
}

const style = {
  width: "100%",
  border: "1px solid #c4c4c4",
  borderRadius: "0 4px 4px 0",
};

export default DrawingMenu;
