import {
  Checkbox,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import "./roles-table.css";
import colors from "assets/colors";
import React from "react";
import InputCheckbox from "../../../../Utills/Inputs/InputCheckbox";

function createData(name: string, approve: boolean, submit: boolean) {
  return { name, approve, submit };
}

const rows = [
  createData("Owner", true, false),
  createData("Project Manager", true, false),
  createData("Project Lead", false, true),
  createData("Worker", false, true),
  createData("Owner", true, false),
  createData("Project Manager", true, false),
  createData("Project Lead", false, true),
  createData("Worker", false, true),
];

const RolesTable = () => {
  const classes = useStyles();

  return (
    <TableContainer className="roles-table">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.rowTop}>Owner</TableCell>
            <TableCell className={classes.rowTop} align="right">
              Approved
            </TableCell>
            <TableCell className={classes.rowTop} align="right">
              Submit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" className={classes.name}>
                {row.name}
              </TableCell>
              <TableCell align="right">
                <InputCheckbox checked={row.approve} />
              </TableCell>
              <TableCell align="right">
                <InputCheckbox checked={row.submit} />
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
  rowTop: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.textGrey,
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
  },
});
