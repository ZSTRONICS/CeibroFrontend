import React from "react";
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
import { Typography } from "@material-ui/core";
import { BiPencil, BiTrash } from "react-icons/bi";
import colors from "../../../../../assets/colors";
import assets from "assets/assets";

function createData(name: string, group: string, role: string) {
  return { name, group, role };
}

const rows = [createData("Work name", "Electrikud", "Project Management")];

export default function BasicTable() {
  const classes = useStyles();

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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Typography className={classes.name}>{row.name}</Typography>
              </TableCell>
              <TableCell>
                <div className={classes.extrasWrapper}>
                  <img src={assets.clockIcon} />
                  <img src={assets.wrongImage} className="w-16" />
                  <img src={assets.sidebarChatIcon} className="w-16" />
                </div>
              </TableCell>

              <TableCell className={classes.final}>
                <div className={classes.rolesText}>
                  <Typography className={classes.roles}>
                    {row.group} {row.role}
                  </Typography>
                </div>

                <div>
                  <img src={assets.pencilIcon} />
                  <img src={assets.trashIcon} className="w-16" />
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
});
