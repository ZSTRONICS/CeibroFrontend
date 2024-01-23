import { CircularProgress, Grid, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import assets from "assets/assets";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useState } from "react";
import colors from "../../../../../assets/colors";

import {
  ProfileWork,
  RoleInterface,
} from "constants/interfaces/project.interface";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import projectActions, {
  deleteWork,
  getNewWork,
} from "redux/action/project.action";
import { RootState } from "redux/reducers/appReducer";

function createData(name: string, group: string, role: string) {
  return { name, group, role };
}

const rows = [createData("Work name", "Electrikud", "Project Management")];

export default function BasicTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedTimeProfile, getNewWorkList, selectedWork } = useSelector(
    (state: RootState) => state.project
  );
  const confirm = useConfirm();

  const [loading, setLoading] = useState<boolean>(false);
  const isDisabled = !loading ? false : true;
  const handleWorkClick = (id: any) => {
    dispatch(projectActions.setSelectedwork(id));
    dispatch(projectActions.openWorkDrawer());
  };

  useEffect(() => {
    if (selectedTimeProfile) {
      dispatch(getNewWork({ other: selectedTimeProfile }));
    }
  }, []);

  const deleteTimeProfileWork = (id: any) => {
    setLoading(true);

    confirm({ description: "Are you confirm want to delete" }).then(() => {
      dispatch(
        deleteWork({
          success: () => {
            toast.success("Deleted Successfully");
            dispatch(getNewWork({ other: selectedTimeProfile }));
          },
          finallyAction: () => {
            setLoading(false);
          },
          other: id,
        })
      );
    });

    // dispatch(
    //   deleteWork({
    //     success: () => {
    //       toast.success("Deleted Successfully");
    //       dispatch(getNewWork({ other: selectedTimeProfile }));
    //     },
    //     finallyAction: () => {
    //       setLoading(false);
    //     },
    //     other: id,
    //   })
    // );

    // dispatch(projectActions.openWorkDrawer());
    // dispatch(getNewWork({ other: selectedTimeProfile }));
  };

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.rowTop}>Work List</TableCell>
            <TableCell className={classes.rowTop}>Extras</TableCell>
            <TableCell className={classes.rowTop}>Roles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getNewWorkList && getNewWorkList.length > 0 ? (
            <>
              {getNewWorkList.map((row: ProfileWork) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    <Typography className={classes.name}>{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <div className={classes.extrasWrapper}>
                      {row?.time && <img src={assets.clockIcon} alt="" />}
                      {/* {row?.photo && (
                        <img src={assets.wrongImage} className="w-16" alt="" />
                      )} */}
                      {row?.comment && (
                        <img
                          src={assets.sidebarChatIcon}
                          className="w-16"
                          alt=""
                        />
                      )}
                    </div>
                  </TableCell>

                  <TableCell className={classes.final}>
                    <div className={classes.rolesText}>
                      {row?.roles?.map((role: RoleInterface, index) => {
                        return (
                          <Typography key={index} className={classes.roles}>
                            {role.name}{" "}
                            {index === row?.roles?.length - 1 ? "" : ","}
                          </Typography>
                        );
                      })}
                    </div>

                    <div>
                      <img
                        src={assets.pencilIcon}
                        onClick={() => handleWorkClick(row?._id)}
                        className="pointer"
                        alt="edit"
                      />

                      {loading && (
                        <CircularProgress
                          size={20}
                          className={classes.progress}
                        />
                      )}
                      <img
                        src={assets.DeleteIcon}
                        className="w-16 pointer"
                        onClick={() => deleteTimeProfileWork(row?._id)}
                        alt="delete"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <>
              {!loading && (
                <Grid container style={{ maxHeight: 400 }}>
                  <Grid item xs={12} className={classes.noProject}>
                    <Typography className={classes.noProjectText}>
                      You haven't any work yet
                    </Typography>
                    {/* <Button
                      style={{ marginTop: 20 }}
                      variant="contained"
                      color="primary"
                      onClick={openCreateTimeProfile}
                    >
                      Create new profile
                    </Button> */}
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
  extrasWrapper: {
    fontSize: 8,
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  alarmIcon: {
    fontSize: 20,
  },
  cropIcon: {
    fontSize: 20,
    color: "red",
  },
  chatIcon: {
    fontSize: 20,
  },
  roles: {
    fontSize: 14,
    fontWeight: 500,
  },
  rolesText: {
    display: "felx",
    flexWrap: "wrap",
  },
  final: {
    display: "flex",
    justifyContent: "space-between",
  },
  pencilIcon: {
    color: colors.primary,
  },
  trashIcon: {
    color: "red",
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
  },
  rowTop: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.textGrey,
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    marginTop: "200px",
    margin: "auto",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
  noProject: {
    // transform: 'translate("-50%", "-50%")',
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    height: "100%",
    flexDirection: "column",
    marginBottom: 20,
    marginLeft: 270,
    paddingTop: 10,
  },
  noProjectText: {
    justifyContent: "center",

    fontSize: 14,
    fontWeight: 500,
    gap: 20,
  },
});