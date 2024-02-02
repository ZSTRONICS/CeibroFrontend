import { CheckCircle, Circle, FilterAltOutlined } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";
import { updateTaskListFilter } from "utills/common";
import TaskFilterTabsView from "./TaskFilterTabsView";

const tabsColor: any = {
  unread: "#E2E4E5",
  ongoing: "#F1B740",
  done: "#55BCB3",
  new: "#CFECFF",
  canceled: "#FFE7E7",
};

interface TaskFiltersProps {
  isSmallView: boolean;
}

function TaskFilters({ isSmallView }: TaskFiltersProps) {
  const dispatch = useDispatch();
  const taskListFilter = useSelector(
    (state: RootState) => state.task.drawingTaskFilters
  );

  const updatedData = {
    ...taskListFilter,
    isAllSelected: updateTaskListFilter(taskListFilter),
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    filter: string,
    key?: string
  ) => {
    if (filter === "isAllSelected") {
      updatedData[filter] = event.target.checked;
      for (const topLevelFilter in updatedData) {
        if (Object.prototype.hasOwnProperty.call(updatedData, topLevelFilter)) {
          for (const property in updatedData[topLevelFilter]) {
            if (
              Object.prototype.hasOwnProperty.call(
                updatedData[topLevelFilter],
                property
              )
            ) {
              updatedData[topLevelFilter][property] = event.target.checked;
            }
          }
        }
      }
    } else if (key) {
      if (updatedData.isAllSelected) {
        updatedData["isAllSelected"] = false;
      }
      updatedData[filter][key] = event.target.checked;
    }
    dispatch(taskActions.updateDrawingFilters(updatedData));
  };

  const renderCheckbox = (
    color: string,
    checked: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => (
    <Checkbox
      checked={checked}
      onChange={onChange}
      icon={<Circle sx={{ color }} />}
      checkedIcon={<CheckCircle sx={{ color }} />}
      sx={{
        padding: 0,
      }}
    />
  );

  const renderFilterColumns = (text: string, key: string) => {
    const keys = Object.keys(taskListFilter[key]);

    return (
      <Grid item flexGrow={1} key={`${key}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "@media screen and (max-width: 1150px)": {
              flexDirection: "row",
              alignItems: "start",
              paddingLeft: "10px",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "500px",
              "@media screen and (max-width: 1150px)": {
                width: "70px",
                marginTop: "5px",
              },
            }}
          >
            {text}
          </Typography>
          <Box
            sx={{
              "@media screen and (min-width:1000px) and (max-width: 1150px)": {
                width: "80px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
            }}
          >
            {keys.map((k) =>
              renderCheckbox(tabsColor[k], taskListFilter[key][k], (e) =>
                handleChange(e, key, k)
              )
            )}
          </Box>
        </Box>
      </Grid>
    );
  };

  return (
    <>
      {!isSmallView && (
        <Grid
          sx={{
            display: "flex",
            "@media screen and (max-width: 1370px)": {
              flexDirection: "column",
              alignItems: "start",
            },
          }}
          container
          alignItems="center"
        >
          <Grid item xl={1}>
            <Box
              //   bgcolor={tabsColor.unRead}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingLeft: "8px",
                minWidth: "30%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "12px",
                  fontWeight: "500px",
                }}
              >
                All
              </Typography>
              <Box>
                <Checkbox
                  checked={updatedData.isAllSelected}
                  onChange={(event) => handleChange(event, "isAllSelected")}
                  sx={{ padding: 0 }}
                />
              </Box>
            </Box>
          </Grid>
          <Box
            sx={{
              width: "85%",
              display: "flex",
              "@media screen and (max-width: 1370px)": {
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                width: "90%",
                display: "flex",
                justifyContent: "center",
                "@media screen and (max-width: 1150px)": {
                  flexDirection: "column",
                  alignItems: "start",
                },
              }}
            >
              {renderFilterColumns("From me", "fromMe")}
              {renderFilterColumns("To me", "toMe")}
              {renderFilterColumns("Hidden", "hidden")}
            </Box>
            <Grid
              sx={{
                width: "10%",
                "@media screen and (max-width: 1370px)": {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
              xl={1}
              item
            >
              <IconButton
                sx={{
                  marginLeft: "20px",
                  "@media screen and (min-width: 1370px) and (max-width: 1535px)":
                    {
                      transform: "translateX(10px)",
                      marginLeft: "0px",
                    },
                  "@media screen and (max-width: 1370px)": {
                    marginRight: "15px",
                    marginLeft: "0px",
                  },
                }}
                onClick={handleMenuOpen}
              >
                <ArrowDropDownIcon />
              </IconButton>
            </Grid>
          </Box>
        </Grid>
      )}

      {isSmallView && (
        <Grid container alignItems="center" justifyContent="center">
          <Grid
            onClick={handleMenuOpen}
            sx={{
              cursor: "pointer",
              borderBottom: "solid 1px #818181",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginLeft: "-8px",
            }}
            item
          >
            <FilterAltOutlined
              color="primary"
              sx={{ transform: "translateY(7px)" }}
            />
            <IconButton onClick={handleMenuOpen}>
              <ArrowDropDownIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          disableRipple
          sx={{
            width: "440px",
            borderRadius: "4px",
            left: 0,
            "&:hover": {
              backgroundColor: "white",
              cursor: "auto",
            },
          }}
        >
          <TaskFilterTabsView handleMenuClose={handleMenuClose} />
        </MenuItem>
      </Menu>
    </>
  );
}

export default TaskFilters;
