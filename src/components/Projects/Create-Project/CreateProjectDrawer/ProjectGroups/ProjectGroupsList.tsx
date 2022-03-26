import React, { useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import colors from "../../../../../assets/colors";
import GroupChip from "../../../../Utills/GroupChip/GroupChip";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import { getGroup } from "redux/action/project.action";

const ProjectGroupsList = () => {
  const { selectedProject, groupList } = useSelector(
    (state: RootState) => state?.project
  );
  console.log("group list", groupList);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedProject) {
      dispatch(getGroup({ other: selectedProject }));
    }
  }, [selectedProject]);
  const classes = useStyles();
  return (
    <>
      {groupList?.map((group: any) => (
        <GroupChip name={group.name} />
      ))}
      {/* <GroupChip />
      <GroupChip />
      <GroupChip />
      <GroupChip />
      <GroupChip />
      <GroupChip />
      <GroupChip />
      <GroupChip />
      <GroupChip />
      <GroupChip />
      <GroupChip />
      <GroupChip />
      <GroupChip /> */}
    </>
  );
};

export default ProjectGroupsList;

const useStyles = makeStyles({});
