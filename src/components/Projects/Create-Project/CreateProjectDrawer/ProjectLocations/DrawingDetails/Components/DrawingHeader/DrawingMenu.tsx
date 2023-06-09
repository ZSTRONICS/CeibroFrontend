import { Grid } from "@mui/material";
import { AutocompleteField } from "components/material-ui/customMuiTextField/simpleTextField";

function DrawingMenu() {
  let mdPoint: number = 2.8;

  return (
    <>
      <Grid container gap={2} justifyContent="flex-start">
        <Grid item md={mdPoint}>
          <AutocompleteField
            placeholder="Select Project"
            label="Project"
            options={top100Films.sort((a, b) => -b.label.localeCompare(a.label))}
            sx={style}
            showSideLabel={true}
            // groupBy={(option)=> option.label}
          />
        </Grid>
        <Grid item md={mdPoint}>
          <AutocompleteField
            placeholder="Select Floor"
            label="Floor"
            options={top100Films}
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
  { label: " Shawshank 2", value: "sdfasdf1ds" }
];
export default DrawingMenu;
