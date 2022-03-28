import React, { useEffect, useState } from "react";
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import colors from "../../../../../assets/colors";
import GroupChip from "../../../../Utills/GroupChip/GroupChip";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import { getGroup } from "redux/action/project.action";
import { groupInterface } from "constants/interfaces/project.interface";

const ProjectGroupsList = () => {
  const { selectedProject, groupList } = useSelector(
    (state: RootState) => state?.project
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProject) {
      const payload = {
        finallyAction: () => {
          setLoading(false);
        },
        other: selectedProject,
      };
      setLoading(true);
      // dispatch(getGroup({ other: selectedProject }));
      dispatch(getGroup(payload));
    }
  }, [selectedProject]);
  const classes = useStyles();
  return (
    <>
      {loading && <CircularProgress size={20} className={classes.progress} />}
      {groupList?.map((group: groupInterface) => (
        <GroupChip name={group.name} />
      ))}
    </>
  );
};

export default ProjectGroupsList;

const useStyles = makeStyles({
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    marginTop: "300px",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
