import React from "react";
import { Grid } from "@mui/material";
import { AutocompleteField } from "components/material-ui/customMuiTextField/simpleTextField";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LoadingButton } from "components/Button";
import { RootState } from "redux/reducers";
import { PROJECT_APIS } from "redux/action";
import projectActions, { getAllProjects } from "redux/action/project.action";
import { Drawing } from "constants/interfaces";
import { formatDropdownData } from "components/Utills/Globals";

function DrawingMenu() {
  const dispatch = useDispatch();
  const {
    allProjects,
    selectedProject,
    allFloors,
    selectedFloor,
    selectedDrawing,
  } = useSelector((state: RootState) => state.project);
  const [drawings, setDrawings] = useState([]);
  const [selectedFloorId, setSelectedFloorId] = useState();
  const [selectedDrawingId, setSelectedDrawingId] = useState();

  const [open, setOpen] = React.useState(false);

  const loading = open && allFloors.length === 0;

  let mdPoint: number = 2.8;
  useEffect(() => {
    if (allProjects.length === 0 && !selectedProject) {
      dispatch(getAllProjects());
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

  React.useEffect(() => {
    if (!loading) {
      return undefined;
    }
  }, [loading]);


  const handleProjectChange = (event: any, option: any) => {
    dispatch(projectActions.setSelectedProject(option ? option.value : null));
  };

  const handleFloorChange = (event: any, option: any) => {
    setSelectedFloorId(option ? option.value : null);
    const foundFloor = allFloors.find(
      (floor: any) => floor._id === option.value
    );
    dispatch(projectActions.setSelectedFloor(foundFloor ? foundFloor : null));
    const floor =
      option && allFloors.find((floor: any) => floor._id === option.value);
    setDrawings(floor ? floor.drawings : []);
  };

  const handleDrawingChange = (event: any, option: any) => {
    setSelectedDrawingId(option ? option.value : null);
    if (drawings.length > 0) {
      const selectedDrawingLocal: any = drawings.find(
        (drawing: Drawing) => drawing._id === option.value
      );
      dispatch(projectActions.setSelectedDrawing(selectedDrawingLocal));
    }
  };

  const handleLoadDrawing = (event: any) => {
    dispatch(projectActions.setLoadDrawing(true));
  };

  console.log("rendering drawing menue");
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
            // groupBy={(option)=> option.label}
          />
        </Grid>
        <Grid item md={mdPoint}>
          <AutocompleteField
            placeholder="Select Floor"
            label="Floor"
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            loading={loading}
            options={formatDropdownData(allFloors, "floorName", "_id")}
            onChange={handleFloorChange}
            value={selectedFloorId}
            sx={style}
            showSideLabel={true}
          />
        </Grid>
        <Grid item md={mdPoint}>
          <AutocompleteField
            placeholder="Select Drawing"
            label="Drawing"
            disabled={drawings.length > 0 ? false : true}
            options={formatDropdownData(drawings, "drawingName", "_id")}
            onChange={handleDrawingChange}
            value={selectedDrawingId}
            sx={style}
            showSideLabel={true}
          />
        </Grid>
        {selectedDrawing && (
          <Grid item md={mdPoint}>
            <LoadingButton
              loading={false}
              variant="contained"
              onClick={handleLoadDrawing}
            >
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
