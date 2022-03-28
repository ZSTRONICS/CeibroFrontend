import {
  Checkbox,
  Grid,
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
import "./roles-table.css";
import colors from "assets/colors";
import React, { useEffect } from "react";
import InputCheckbox from "../../../../Utills/Inputs/InputCheckbox";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import { getRolesById } from "redux/action/project.action";
import assets from "assets/assets";
import { RoleInterface } from "constants/interfaces/project.interface";

// store?: RootState
const RolesTable = () => {
  const { selectedProject, rolesList } = useSelector(
    (state: RootState) => state?.project
  );
  console.log(rolesList);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (selectedProject) {
      dispatch(getRolesById({ other: selectedProject }));
    }
  }, [selectedProject]);

  return (
    <Grid container>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography className={classes.name}>Role name</Typography>
      </Grid>

      <Grid item xs={12} className={classes.dataContainer}>
        {rolesList?.map((role: RoleInterface) => {
          return (
            <div className={classes.roleChip}>
              <div className={classes.roleInner}>
                <Typography className={classes.roleName}>
                  {role.name}
                </Typography>
                <div className={classes.roleDetail}>
                  {role?.roles?.length && (
                    <>
                      <Typography className={classes.detailTitle}>
                        Role: &nbsp;
                      </Typography>
                      {role?.roles?.map((access) => {
                        return (
                          <Typography className={classes.detail}>
                            {access}, &nbsp;
                          </Typography>
                        );
                      })}
                    </>
                  )}
                  {role?.member && (
                    <>
                      <Typography className={classes.detailTitle}>
                        Member: &nbsp;
                      </Typography>
                      {role?.roles?.map((access) => {
                        return (
                          <Typography className={classes.detail}>
                            {access}, &nbsp;
                          </Typography>
                        );
                      })}
                    </>
                  )}
                  {role?.timeProfile && (
                    <>
                      <Typography className={classes.detailTitle}>
                        Time Profile: &nbsp;
                      </Typography>
                      {role?.roles?.map((access) => {
                        return (
                          <Typography className={classes.detail}>
                            {access}, &nbsp;
                          </Typography>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              <div className={classes.roleMenu}>
                <img src={assets.moreIcon} className={`width-16`} />
              </div>
            </div>
          );
        })}
      </Grid>
    </Grid>
    // <TableContainer className="roles-table">
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell className={classes.rowTop}>Owner</TableCell>
    //         <TableCell className={classes.rowTop} align="right"></TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rolesList?.map((row: any) => (
    //         <TableRow key={row.name}>
    //           <TableCell component="th" scope="row" className={classes.name}>
    //             {row.name}
    //           </TableCell>
    //           <TableCell align="right">
    //             <img src={assets.moreIcon} />
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
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
  titleContainer: {
    padding: "15px 1px",
    borderBottom: `1px solid ${colors.ternaryGrey}`,
  },
  name: {
    fontSize: 12,
    color: colors.textGrey,
    fontWeight: 500,
  },
  dataContainer: {},
  roleChip: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0px",
    borderBottom: `1px solid ${colors.grey}`,
  },
  roleInner: {
    display: "flex",
    flexDirection: "column",
  },
  roleName: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.black,
  },
  roleDetail: {
    display: "flex",
    textTransform: "capitalize",
  },
  detailTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.textGrey,
  },
  detail: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  roleMenu: {},
});
