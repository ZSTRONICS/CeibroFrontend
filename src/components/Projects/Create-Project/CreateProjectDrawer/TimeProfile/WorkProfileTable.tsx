import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AlaramIcon from "@material-ui/icons/Alarm";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import ChatIcon from "@material-ui/icons/Chat";
import Paper from "@material-ui/core/Paper";
import { CircularProgress, Typography } from "@material-ui/core";
import { BiPencil, BiTrash } from "react-icons/bi";
import colors from "../../../../../assets/colors";
import assets from "assets/assets";
import { useConfirm } from "material-ui-confirm";

import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  deleteWork,
  getNewWork,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";
import { toast } from "react-toastify";

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

  console.log("new work", selectedWork);

  console.log("getNewWorkList", getNewWorkList);

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
          {getNewWorkList.map((row: any) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Typography className={classes.name}>{row.name}</Typography>
              </TableCell>
              <TableCell>
                <div className={classes.extrasWrapper}>
                  {row?.time && <img src={assets.clockIcon} />}
                  {row?.photo && (
                    <img src={assets.wrongImage} className="w-16" />
                  )}
                  {row?.comment && (
                    <img src={assets.sidebarChatIcon} className="w-16" />
                  )}
                </div>
              </TableCell>

              <TableCell className={classes.final}>
                <div className={classes.rolesText}>
                  <Typography className={classes.roles}>
                    {row.group} {row.role}
                  </Typography>
                </div>

                <div>
                  <img
                    src={assets.pencilIcon}
                    onClick={() => handleWorkClick(row?.id)}
                  />

                  {loading && (
                    <CircularProgress size={20} className={classes.progress} />
                  )}
                  <img
                    src={assets.trashIcon}
                    className="w-16 cursor-pointer"
                    onClick={() => deleteTimeProfileWork(row?.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
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
  rolesText: {},
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
});
