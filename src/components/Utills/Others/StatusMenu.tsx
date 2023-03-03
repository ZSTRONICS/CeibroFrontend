import { Badge, makeStyles, Typography } from "@material-ui/core";
import { TASK_CONFIG } from "config/task.config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import colors from "../../../assets/colors";
import { getColorByStatus } from "../../../config/project.config";
import { getStyleClass } from "../../../config/styles.config";

export const StatusMenu = (props: any) => {
  const { options } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<string>("All");
  const { taskDrawerOpen } = useSelector((state: RootState) => state.task);
  
  useEffect(() => {
    if (filter.toLowerCase()) {
      dispatch({
        type:TASK_CONFIG.GET_TASK_SUBTASK_FILTER_BY_STATE,
        payload:filter.toLowerCase().toString()
      });
    }
  }, [filter,taskDrawerOpen]);


  return (
    <>
    
      {options &&
        options.map((option: any, index: any) => {
          return (
            <div
              onClick={() => setFilter(option.title)}
              key={index}
              className={`${classes.statusChip} ${getStyleClass(option.title)}`}
              style={{
                border:
                  filter === option.title
                    ? `1px solid ${colors.inputGrey}`
                    : "none",
                borderRadius: 5,
              }}
            >
              <Typography className={classes.chipTitle}>
                {option.title}
              </Typography>
              {
                <Badge
                showZero={true}
                  // showZero=  {
                  //   option.title === 'All' ? true :false
                  // }
                  overlap="circular"
                  className={classes.statusBage}
                  color="primary"
                  badgeContent={option.count}
                  style={{ marginRight: 20 }}
                ></Badge>
              }
            </div>
          );
        })}
    </>
  );
};

export default StatusMenu;

const useStyles = makeStyles({
  statusChip: {
    padding: "5px 10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginRight: "5px",
  },
  statusBage: {
    marginLeft: 20,
  },
  chipTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 500,
    textTransform: "capitalize",
  },

  all: {
    background: getColorByStatus("all"),
  },
  active: {
    background: getColorByStatus("active"),
  },

  done: {
    background: getColorByStatus("done"),
  },
  draft: {
    background: getColorByStatus("draft"),
  },
  new: {
    background: getColorByStatus("new"),
  },
});
