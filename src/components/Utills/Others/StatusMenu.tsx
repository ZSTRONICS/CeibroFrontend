import React, { useState, useEffect } from "react";
import { Badge, makeStyles, Typography } from "@material-ui/core";
import { getColorByStatus, SET_SELECTED_STATUS } from "../../../config/project.config";
import { getStyleClass } from "../../../config/styles.config";
import colors from "../../../assets/colors";
import projectActions from "redux/action/project.action";
import { useDispatch } from "react-redux";

interface StatusMenuInt {
  title: string;
  count: number;
}

interface StatusMenuProps {
  options: StatusMenuInt[];
}

export const StatusMenu: React.FC<StatusMenuProps> = (props) => {
  const { options } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<string>("");
  console.log("filter", filter);

  useEffect(() => {
    dispatch(projectActions.setSelectedStatus(filter))
    dispatch({
      type: SET_SELECTED_STATUS,
      payload: filter
    })
  }, [filter]);

  return (
    <>
      {options &&
        options.map((option, index) => {
          return (
            <div
              onClick={() => setFilter(option.title)}
              key={index}
              className={`${classes.statusChip} ${getStyleClass(option.title)}`}
            >
              <Typography className={classes.chipTitle}>
                {option.title}
              </Typography>
              <Badge
                className={classes.statusBage}
                color="primary"
                badgeContent={option.count}
              ></Badge>
            </div>
          );
        })}
    </>
  );
};

export default StatusMenu;

const useStyles = makeStyles({
  statusChip: {
    padding: "10px 10px",
    width: 100,
    display: "flex",
    alignItems: "center",
    // justifyContent: 'space-around',
    ["@media (max-width:960px)"]: {
      justifyContent: "space-between",
    },
  },
  statusBage: {
    marginLeft: 15,
  },
  chipTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 500,
  },
  ongoing: {
    background: getColorByStatus("ongoing"),
  },
  completed: {
    background: getColorByStatus("completed"),
  },
  draft: {
    background: getColorByStatus("draft"),
  },
  approved: {
    background: getColorByStatus("approved"),
  },
  submitted: {
    background: getColorByStatus("submitted"),
  },
  rejeced: {
    background: getColorByStatus("rejected"),
  },
});
