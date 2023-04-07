import { CircularProgress, makeStyles } from "@material-ui/core";
import NoData from "components/Chat/NoData";
import { ProjectGroupInterface } from "constants/interfaces/ProjectRoleMemberGroup.interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions, { deleteGroup, getGroup } from "redux/action/project.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";
import GroupChip from "../../../../Utills/GroupChip/GroupChip";

const ProjectGroupsList = () => {
  const { selectedProject, groupList } = useSelector(
    (state: RootState) => state?.project);
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

  const handleGroupClick = (group: any) => {
    dispatch(projectActions.setSelectedGroup(group));
    dispatch(projectActions.openProjectGroup());
  };

  const handleGroupDelete = (id: any) => {
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
              key={group._id}
              group={group}
              handleClick={() => handleGroupClick(group)}
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
