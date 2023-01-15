import { Badge, Button, makeStyles, Typography } from "@material-ui/core";
import CButton from "components/Button/Button";
import CreateSubTask from "components/Tasks/SubTasks/CreateSubTask";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  getProjectsWithPagination,
  getStatus
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import colors from "../../../assets/colors";
import {
  getColorByStatus
} from "../../../config/project.config";
import { getStyleClass } from "../../../config/styles.config";
import CustomModal from "../../Modal/index"
// const options = [
//   {
//     title: "All",
//     count: 21,
//   },
//   {
//     title: "Active",
//     count: 30,
//   },

//   {
//     title: "Done",
//     count: 44,
//   },
//   {
//     title: "Draft",
//     count: 44,
//   },
// ];

export const StatusMenu = (props: any) => {
  const { options } = props;
  const [subTask, setSubTask]: any = useState(false)
  const { getStatuses, drawerOpen } = useSelector(
    (state: RootState) => state.project
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<string>("All");
  useEffect(() => {
    if (filter) {
      dispatch(projectActions.setSelectedStatus(filter));
      dispatch(getProjectsWithPagination());
    }
  }, [filter]);

  useEffect(() => {
    if (!drawerOpen) {
      dispatch(getStatus());
    }
  }, [drawerOpen]);

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
              {option.count > 0 && (
                <Badge
                  overlap="circular"
                  className={classes.statusBage}
                  color="primary"
                  badgeContent={option.count}
                  style={{ marginRight: 20 }}
                ></Badge>
              )}
            </div>
          );
        })}
      <CButton onClick={() => setSubTask(true)} label="Create SubTask" variant={'contained'} />
      <CustomModal title="New Sub-task" isOpen={subTask} handleClose={() => setSubTask(false)} children={<CreateSubTask setSubTask={setSubTask} />} />

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
});
