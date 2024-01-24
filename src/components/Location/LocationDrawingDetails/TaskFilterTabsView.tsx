import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { capitalize } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import StyledFilterTab from "./StyledFilterTab";

export default function TaskFilterTabsView() {
  const dispatch = useDispatch();
  const taskListFilter = useSelector(
    (state: RootState) => state.task.drawingTaskFilters
  );

  const tabsColor: { [key: string]: string } = {
    unread: "#E2E4E5",
    ongoing: "#F1B740",
    done: "#55BCB3",
    new: "#CFECFF",
    canceled: "#FFE7E7",
  };

  const filterLabel: { [key: string]: string } = {
    fromMe: "From me",
    toMe: "To me",
    hidden: "Hidden",
  };

  const handleChange = (value: boolean, filter: string, key?: string) => {
    let oldFilter = { ...taskListFilter };
    if (filter === "isAllSelected") {
      oldFilter[filter] = value;
      for (const topLevelFilter in oldFilter) {
        if (Object.prototype.hasOwnProperty.call(oldFilter, topLevelFilter)) {
          for (const property in oldFilter[topLevelFilter]) {
            if (
              Object.prototype.hasOwnProperty.call(
                oldFilter[topLevelFilter],
                property
              )
            ) {
              oldFilter[topLevelFilter][property] = value;
            }
          }
        }
      }
    } else if (key) {
      oldFilter[filter][key] = value;
    }
    dispatch(taskActions.updateDrawingFilters(oldFilter));
  };

  const RenderFilterTabs = () => {
    let filterKeys = Object.keys(taskListFilter).filter(
      (item, index) => index < 3
    );
    return filterKeys.map((filterKey) => {
      let keys = Object.keys(taskListFilter[filterKey]);
      return (
        <Grid container sx={{ paddingTop: '16px', paddingBottom: '16px' }} >
          <Grid item xs={4} md={4}>
            <Typography
              sx={{ fontFamily: "Inter", fontSize: "12px", fontWeight: 500 }}
            >
              {filterLabel[filterKey]}
            </Typography>
          </Grid>
          <Grid
            container
            xs={8}
            md
            spacing={1}
            rowSpacing={2}
            justifyContent="flex-end"
          >
            {keys.map((key) => {
              let value = taskListFilter[filterKey][key];
              return (
                <Grid item>
                  <StyledFilterTab
                    key={key}
                    label={capitalize(key)}
                    bgColor={tabsColor[key]}
                    active={value}
                    callback={() => handleChange(!value, filterKey, key)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <Box
      width={"100%"}
      marginLeft={"8px"}
      marginRight={"8px"}
      marginTop={"8px"}
      alignItems="center"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            alignSelf: "center",
            textTransform: "none",
          }}
        >
          Apply
        </Button>
        <Button
          size="small"
          onClick={() =>
            handleChange(!taskListFilter.isAllSelected, "isAllSelected")
          }
          sx={{
            fontSize: "12px",
            fontWeight: 400,
            alignSelf: "center",
            textTransform: "none",
          }}
        >
          {taskListFilter.isAllSelected ? "Deselect all" : "Select all"}
        </Button>
      </Box>
      <Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />
      <Grid container rowSpacing={2}>
        {RenderFilterTabs()}
      </Grid>
    </Box>
  );
}
