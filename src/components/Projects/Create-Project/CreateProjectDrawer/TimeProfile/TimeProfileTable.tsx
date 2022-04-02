import {
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProjectProfile } from "redux/action/project.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";

function createData(name: string, approve: boolean, role: number) {
  return { name, approve, role };
}

const rows = [
  createData("Owner", true, 1),
  createData("Project Manager", true, 2),
  createData("Project Lead", false, 3),
  createData("Worker", false, 1),
  createData("Owner", true, 1),
  createData("Project Manager", true, 2),
  createData("Project Lead", false, 3),
  createData("Worker", false, 1),
];

const RolesTable = () => {
  const classes = useStyles();
  const { selectedProject, projectProfile } = useSelector(
    (state: RootState) => state.project
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  console.log("projectProfile", projectProfile);
  useEffect(() => {
    if (selectedProject) {
      const payload = {
        finallyAction: () => {
          setLoading(false);
        },
        other: selectedProject,
      };
      setLoading(true);
      dispatch(getProjectProfile(payload));
    }
  }, [selectedProject]);

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.rowTop}>Layout name</TableCell>
            <TableCell className={classes.rowTop} align="left">
              Role
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="lower-padding">
          {loading && (
            <CircularProgress size={20} className={classes.progress} />
          )}

          {projectProfile.map((row: any) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" style={{ width: "60%" }}>
                <Typography className={classes.name}>{row.name}</Typography>
              </TableCell>
              <TableCell align="left" className={classes.roleWrapper}>
                <Typography className={classes.compnayRole}>
                  Project manager
                </Typography>

                <div className={classes.actions}>
                  <div className={classes.statusChip}>
                    <AiOutlineCheckCircle className={classes.statusIcon} />
                    <Typography className={classes.statusText}>
                      Activate
                    </Typography>
                  </div>
                  <div className={classes.options}>
                    <MoreVert />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RolesTable;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  nameWrapper: {},
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  organizationName: {
    fontWeight: 500,
    fontSize: 12,
  },
  roleWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  statusChip: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    background: colors.white,
    color: colors.primary,
  },
  statusIcon: {
    color: colors.lightGreen,
    paddingRight: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 500,
  },
  options: {
    color: colors.primary,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowTop: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.textGrey,
  },
  compnayRole: {
    fontSize: 14,
    fontWeight: 500,
  },
  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    marginTop: "400px",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});
