import React, { useEffect, useState } from "react";
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import colors from "../../../../../assets/colors";
import GroupChip from "../../../../Utills/GroupChip/GroupChip";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import projectActions, {
  deleteGroup,
  getGroup,
} from "redux/action/project.action";
import { GroupInterface } from "constants/interfaces/project.interface";
import { toast } from "react-toastify";
import { ProjectGroupInterface } from "constants/interfaces/ProjectRoleMemberGroup.interface";
import NoData from "components/Chat/NoData";

const ProjectGroupsList = () => {
  const { selectedProject, groupList, selectedGroup } = useSelector(
    (state: RootState) => state?.project
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProject) {
      // const payload = {
      //   finallyAction: () => {
      //     setLoading(false);
      //   },
      //   other: selectedProject,
      // };
      // setLoading(true);
      // // dispatch(getGroup(payload));
      dispatch(getGroup({ other: selectedProject }));
    }
  }, [selectedProject]);

  const handleGroupClick = (id: any) => {
    dispatch(projectActions.setSelectedGroup(id));
    dispatch(projectActions.openProjectGroup());
  };

  const handleGroupDelete = (id: any) => {
    // alert("deleted");
    // setLoading(true);
    dispatch(
      deleteGroup({
        success: () => {
          toast.success("Deleted Successfully");
          dispatch(getGroup({ other: selectedProject }));
        },
        finallyAction: () => {
          setLoading(false);
        },
        other: id,
      })
    );
  };

  const classes = useStyles();
  return (
    <>
      {loading && <CircularProgress size={20} className={classes.progress} />}
      {groupList.length > 0 ? (
        groupList.map((group: ProjectGroupInterface) => {
          if (group === undefined) {
            return <></>;
          }
          return (
            <GroupChip
              // name={group.name}
              // groupId={group._id}
              group={group}
              handleClick={() => handleGroupClick(group?._id)}
              handleDelete={() => handleGroupDelete(group?._id)}
            />
          );
        })
      ) : (
        <NoData title="No Data found!" />
      )}
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
