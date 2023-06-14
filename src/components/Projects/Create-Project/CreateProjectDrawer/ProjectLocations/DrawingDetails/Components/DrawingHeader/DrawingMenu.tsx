import { Grid } from "@mui/material";
import { AutocompleteField } from "components/material-ui/customMuiTextField/simpleTextField";
import { useHistory } from "react-router-dom";
import projectActions, {
  PROJECT_APIS,
  getAllProjects,
} from "redux/action/project.action";
import { useDispatch, useSelector } from "react-redux";
import { useApiCallOnce } from "hooks";
import { useEffect, useState } from "react";
import { LoadingButton } from "components/Button";

function DrawingMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    allProjects,
    selectedProject,
    allFloors,
    selectedFloor,
    selectedDrawing,
  } = useSelector((state: RootState) => state.project);
  const [drawings, setDrawings] = useState();
  const [selectedFloorId, setSelectedFloorId] = useState();
  const [selectedDrawingId, setSelectedDrawingId] = useState();

  let mdPoint: number = 2.8;

  const action = PROJECT_APIS.getFloorsByProjectId({
    other: {
      projectId: String(selectedProject),
    },
  });

  useApiCallOnce(action, [selectedProject]);

  useEffect(() => {
    if (allProjects.length <= 0) {
      dispatch(getAllProjects());
    }
  }, []);

  const handleProjectChange = (event, option) => {
    dispatch(projectActions.setSelectedProject(option ? option.value : null));
  };

  const handleFloorChange = (event, option) => {
    setSelectedFloorId(option ? option.value : null);
    dispatch(projectActions.setSelectedFloor(option ? option.value : null));
    const floor =
      option && allFloors.find((floor: any) => floor._id === option.value);
    setDrawings(floor ? floor.drawings : null);
  };

  const handleDrawingChange = (event, option) => {
    setSelectedDrawingId(option ? option.value : null);
    dispatch(projectActions.setSelectedDrawing(option ? option.value : null));
  };

  const handleLoadDrawing = (event: any) => {};

  //labelKey for get the value from object and store in label
  //valueKey for get the value from object and store in value
  const formatDropdownData = (
    data: any,
    labelKey: string,
    valueKey: string
  ) => {
    if (data) {
      return (
        data &&
        data.map((item: any) => {
          const label = item[labelKey] || "";
          const value = item[valueKey] || "";
          return { label: label.toString(), value: value.toString() };
        })
      );
    } else {
      return null;
    }
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
            // options={top100Films.sort((a, b) => -b.label.localeCompare(a.label))}
            sx={style}
            showSideLabel={true}
            // groupBy={(option)=> option.label}
          />
        </Grid>
        <Grid item md={mdPoint}>
          <AutocompleteField
            placeholder="Select Floor"
            label="Floor"
            options={formatDropdownData(allFloors, "floorName", "_id")}
            onChange={handleFloorChange}
            value={selectedFloorId}
            // options={top100Films}
            sx={style}
            showSideLabel={true}
          />
        </Grid>
        <Grid item md={mdPoint}>
          <AutocompleteField
            placeholder="Select Drawing"
            label="Drawing"
            options={formatDropdownData(drawings, "drawingName", "_id")}
            onChange={handleDrawingChange}
            value={selectedDrawingId}
            // options={top100Films}
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
const top100Films = [
  { label: " Shawshank Redemption", value: "sdfasdf" },
  { label: " Shawshank 1", value: "sdfasdf" },
  { label: " Shawshank 2", value: "sdfasdf1ds" },
];
export default DrawingMenu;
