import { Grid } from "@mui/material";
import { AutocompleteField } from "components/material-ui/customMuiTextField/simpleTextField";
import projectActions, { PROJECT_APIS } from "redux/action/project.action";
import { useDispatch, useSelector } from "react-redux";
import { useApiCallOnce } from "hooks";
import { RootState } from "redux/reducers";
import { LoadingButton } from "components/Button";

function DrawingMenu() {
  const dispatch = useDispatch();
  const { allProjects, selectedProject, allFloors } = useSelector(
    (state: RootState) => state.project
  );

  let mdPoint: number = 2.8;

  const action = PROJECT_APIS.getFloorsByProjectId({
    other: {
      projectId: String(selectedProject),
    },
  });

  useApiCallOnce(action, [selectedProject]);

  // handle projects dropdown
  const handleProjectChange = (event: any, option: any) => {
    dispatch(projectActions.setSelectedProject(option.value));
  };

  //labelKey for get the value from object and store in label
  const formatDropdownData = (
    data: any,
    labelKey: string,
    valueKey: string
  ) => {
    return data.map((item: any) => {
      return { label: item[labelKey], value: item[valueKey] };
    });
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
            onChange={handleProjectChange}
            // options={top100Films}
            sx={style}
            showSideLabel={true}
          />
        </Grid>
        <Grid item md={mdPoint}>
          <AutocompleteField
            placeholder="Select Drawing"
            label="Drawing"
            options={top100Films}
            sx={style}
            showSideLabel={true}
          />
        </Grid>
        <Grid item md={mdPoint}>
          <LoadingButton loading={false} variant="contained">
            Search
          </LoadingButton>
        </Grid>
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
