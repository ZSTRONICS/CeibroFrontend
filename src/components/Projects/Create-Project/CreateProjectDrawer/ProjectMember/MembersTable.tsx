import {
  Checkbox,
  Chip,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { roleInterface } from "constants/interfaces/project.interface";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroup, getMember, getRolesById } from "redux/action/project.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";
import InputCheckbox from "../../../../Utills/Inputs/InputCheckbox";
import Select from "../../../../Utills/Inputs/Select";

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

const roleOptions = [
  {
    title: "Project Manager",
    value: "1",
  },
  {
    title: "Project Lead",
    value: "2",
  },
  {
    title: "Worker",
    value: "3",
  },
];

const groupOptions = [
  {
    title: "Electrikudwr",
    value: "1",
  },
];

const RolesTable = () => {
  const { groupList, rolesList, selectedProject, memberList } = useSelector(
    (state: RootState) => state?.project
  );

  const [group, setGroups] = useState<any>();
  const [role, setRoles] = useState<any>();

  console.log("members list", memberList);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getGroup({ other: selectedProject }));
    dispatch(getRolesById({ other: selectedProject }));
  }, []);

  useEffect(() => {
    if (groupList) {
      const newGroups = groupList.map((group: any) => {
        return {
          title: group.name,
          value: group.id,
        };
      });
      setGroups(newGroups);
    }
  }, [groupList]);

  useEffect(() => {
    console.log("role lisr here", rolesList);
    if (rolesList) {
      const newRoles = rolesList.map((role: roleInterface) => {
        return {
          title: role.name,
          value: role.id,
        };
      });
      setRoles(newRoles);
    }
  }, [rolesList]);

  useEffect(() => {
    if (selectedProject) {
      dispatch(getMember({ other: selectedProject }));
    }
  }, [selectedProject]);

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.rowTop}>Name</TableCell>
            <TableCell className={classes.rowTop} align="left">
              Role
            </TableCell>
            <TableCell className={classes.rowTop} align="left">
              Group
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="lower-padding">
          {memberList?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" style={{ width: "60%" }}>
                <div className={classes.nameWrapper}>
                  <Typography className={classes.name}>
                    {row.isInvited && (
                      <span>
                        {row.invitedEmail}{" "}
                        <Chip
                          className={classes.chip}
                          variant="outlined"
                          label="Invited"
                          size="small"
                        ></Chip>
                      </span>
                    )}
                    {row?.user &&
                      `${row?.user?.firstName} ${row?.user?.surName}`}
                  </Typography>
                  <Typography className={classes.organizationName}>
                    {row?.user?.companyName}
                  </Typography>
                </div>
              </TableCell>
              <TableCell align="right" style={{ width: "20%" }}>
                <Select options={role} selectedValue={row?.role?.id} />
              </TableCell>
              <TableCell align="right" style={{ width: "20%" }}>
                <Select options={group} selectedValue={row?.group?.id} />
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
  rowTop: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.textGrey,
  },
  chip: {
    color: colors.white,
    borderColor: colors.darkYellow,
    background: colors.darkYellow,
    fontSize: 10,
  },
});
