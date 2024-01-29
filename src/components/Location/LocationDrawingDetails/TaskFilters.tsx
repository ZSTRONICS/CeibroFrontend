import { CheckCircle, Circle } from "@mui/icons-material";
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
    let oldFilter = { ...taskListFilter };
    if (filter === "isAllSelected") {
      oldFilter[filter] = event.target.checked;
      for (const topLevelFilter in oldFilter) {
        if (Object.prototype.hasOwnProperty.call(oldFilter, topLevelFilter)) {
          for (const property in oldFilter[topLevelFilter]) {
            if (
              Object.prototype.hasOwnProperty.call(
                oldFilter[topLevelFilter],
                property
              )
            ) {
              oldFilter[topLevelFilter][property] = event.target.checked;
            }
          }
        }
      }
    } else if (key) {
      if (oldFilter.isAllSelected) {
        oldFilter["isAllSelected"] = false;
      }
      oldFilter[filter][key] = event.target.checked;
    }
    dispatch(taskActions.updateDrawingFilters(oldFilter));
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
            '@media screen and (max-width: 1150px)': {
              flexDirection: 'row',
              alignItems: 'start',
              paddingLeft: '10px',
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "500px",
              '@media screen and (max-width: 1150px)': {
                width: '70px',
                marginTop: '5px',
              },
            }}
          >
            {text}
          </Typography>
          <Box
            sx={{
              '@media screen and (min-width:1000px) and (max-width: 1150px)': {
                width: '80px',
                display: 'flex',
                justifyContent: "space-between",
                alignItems: 'center',
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
        <Grid sx={{
          display: 'flex',
          '@media screen and (max-width: 1370px)': {
            flexDirection: 'column',
            alignItems: 'start',
          },
        }} container alignItems="center">
          <Grid item xl={1} >
            <Box
              //   bgcolor={tabsColor.unRead}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingLeft: "8px",
                minWidth: '30%'
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
              <Box  >
                <Checkbox
                  checked={taskListFilter.isAllSelected}
                  onChange={(event) => handleChange(event, "isAllSelected")}
                  sx={{ padding: 0 }}
                />
              </Box>
            </Box>
          </Grid>
          <Box sx={{
            width: '85%', display: 'flex',
            '@media screen and (max-width: 1370px)': {
              width: '100%',
            },
          }} >
            <Box sx={{
              width: '90%', display: 'flex', justifyContent: 'center',
              '@media screen and (max-width: 1150px)': {
                flexDirection: 'column',
                alignItems: 'start',
              },
            }} >
              {renderFilterColumns("From me", "fromMe")}
              {renderFilterColumns("To me", "toMe")}
              {renderFilterColumns("Hidden", "hidden")}
            </Box>
            <Grid sx={{
              width: '10%',
              '@media screen and (max-width: 1370px)': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }} xl={1} item>
              <IconButton
                sx={{
                  marginLeft: '20px',
                  '@media screen and (min-width: 1370px) and (max-width: 1535px)': {
                    transform: 'translateX(10px)',
                    marginLeft: '0px',
                  },
                  '@media screen and (max-width: 1370px)': {
                    marginRight: '15px',
                    marginLeft: '0px',
                  },
                }}
                onClick={handleMenuOpen}>
                <ArrowDropDownIcon />
              </IconButton>
            </Grid>
          </Box>
        </Grid >
      )
      }

      {
        isSmallView && (
          <Grid container alignItems="center" justifyContent="center">
            <Grid
              item
            >
              {/* <FilterAltOutlined color="primary" /> */}
              {/* <IconButton
                onClick={handleMenuOpen}>
                <ArrowDropDownIcon />
              </IconButton> */}
            </Grid>
          </Grid>
        )
      }
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
