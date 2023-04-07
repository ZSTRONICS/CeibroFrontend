import {
  Button,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  deleteMember,
  getMember,
} from "redux/action/project.action";
import { RootState } from "redux/reducers";

import colors from "../../../../../assets/colors";
// import membersDelete from "../../../../../assets/assets/../assets/membersDelete";
import assets from "assets/assets";
import CButton from "components/Button/Button";
import { AddStatusTag, ConfirmDescriptionTag } from "components/CustomTags";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { Member, ProjectMemberInterface, ProjectRolesInterface, roleTemplate } from "constants/interfaces/ProjectRoleMemberGroup.interface";
import { toast } from "react-toastify";
import RollOverMenu from "./RollOverMenu";

const MembersTable = () => {
  const { selectedProject, memberList, getAllProjectRoles } = useSelector(
    (state: RootState) => state.project
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const getMyRole = () => {
    let rolePermissionLocal =
      getAllProjectRoles &&
      getAllProjectRoles
        .filter((permission: any) =>
          permission.members.some(
            (member: Member) => String(member._id) === String(user._id)
          )
        ).find((item: any) => item?.rolePermission);
    return rolePermissionLocal || roleTemplate;
  };
  const myRole: ProjectRolesInterface = getMyRole();


  const [loading, setLoading] = useState<boolean>(false);
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getMember({ other: selectedProject }));
  }, []);

  const handleEditMember = (member: ProjectMemberInterface) => {
    dispatch(projectActions.setSelectedMember(member));
    dispatch(projectActions.openProjectMemberDrawer());
  };

  const handleDelete = (id: any) => {
    confirm({
      title: (
        <CustomStack gap={1}>
          <assets.ErrorOutlineOutlinedIcon /> Confirmation
        </CustomStack>
      ),
      description: (
        <ConfirmDescriptionTag sx={{ pt: 2 }}>
          Are you sure you want to remove this person from project members?
        </ConfirmDescriptionTag>
      ),
      titleProps: { color: "red", borderBottom: "1px solid #D3D4D9" },
      confirmationText: "Remove",
      confirmationButtonProps: {
        sx: {
          textTransform: "capitalize",
          padding: "4px 15px",
          color: "#FA0808",
          borderColor: "#FA0808",
          marginRight: "10px",
        },
        variant: "outlined",
      },
      cancellationText: (
        <CButton
          variant="contained"
          elevation={1}
          styles={{
            color: "#605C5C",
            backgroundColor: "#ECF0F1",
            fontSize: 12,
            fontWeight: "bold",
          }}
          label={"Cancel"}
        />
      ),
    }).then(() => {
      dispatch(
        deleteMember({
          success: () => {
            toast.success("Deleted Successfully");
            dispatch(getMember({ other: selectedProject }));
          },
          finallyAction: () => {
            setLoading(false);
          },
          other: id,
        })
      );
    });
  };
  const openCreateMember = () => {
    dispatch(projectActions.openProjectMemberDrawer());
  };

  return (
    <TableContainer style={{ height: "100%", paddingBottom: "100px" }}>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead
        // style={{ overflow: "visible" }}
        >
          <TableRow>
            <TableCell className={classes.rowTop}>Name</TableCell>
            <TableCell className={classes.rowTop} align="left">
              Role
            </TableCell>
            <TableCell className={classes.rowTop} align="left">
              Group
            </TableCell>
            <TableCell className={classes.rowTop} align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="lower-padding">
          {/* {loading && (
            <CircularProgress size={20} className={classes.progress} />
          )} */}

          {memberList && memberList.length > 0 ? (
            <>
              {memberList?.map((member: ProjectMemberInterface) => {
                if (member === undefined) {
                  return <></>;
                }
                return (
                  <TableRow key={member._id}>
                    <TableCell component="th" scope="row">
                      <Typography className={classes.nameWrapper}>
                        {String(member?.user?._id) === String(user._id) ? "Me" : `${member?.user?.firstName} ${member?.user?.surName}`}
                      </Typography>
                      <Typography className={classes.organizationName}>
                        Company:{member?.user?.companyName ?? "N/A"}
                      </Typography>
                      {/* </div> */}
                    </TableCell>
                    <TableCell>
                      <AddStatusTag sx={{ textTransform: 'capitalize', color: "#000000" }}>
                        {member.role ? member.role.name : "N/A"}
                      </AddStatusTag>
                    </TableCell>
                    <TableCell>
                      <AddStatusTag sx={{ textTransform: 'capitalize', color: "#000000" }}>
                        {member.group ? member.group.name : "N/A"}
                      </AddStatusTag>
                    </TableCell>
                    <TableCell align="right" style={{ width: "10%" }}>
                      <RollOverMenu
                        userRole={myRole}
                        member={member}
                        edit="Edit"
                        showDelBtn={true}
                        handleDelete={() => handleDelete(member._id)}
                        handleEdit={() => {
                          handleEditMember(member);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          ) : (
            <>
              {!loading && (
                <Grid container style={{ height: 400 }}>
                  <Grid item xs={12} className={classes.noProject}>
                    <Typography
                      // style={{ marginTop: 10 }}
                      className={classes.noProjectText}
                    >
                      You haven't any member yet
                    </Typography>
                    <Button
                      style={{ marginTop: 10 }}
                      variant="outlined"
                      color="primary"
                      onClick={openCreateMember}
                    >
                      Add a member
                    </Button>
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MembersTable;

const useStyles = makeStyles({
  table: {
    // height: "700px",
    // overflowY: "auto",
  },
  nameWrapper: { fontSize: 14, fontWeight: "bold", color: colors.primary },
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
  // del: {
  //   // fontSize: 100,
  //   width: "16",
  //   // alignItems: "center",
  // },
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
  noProject: {
    // position: "absolute",
    // top: "10",
    // left: "42%",
    // transform: 'translate("-50%", "-50%")',
    display: "flex",
    alignItems: "center",
    // margin: "auto",
    // width: "50%",
    textAlign: "center",
    // justifyContent: "center",
    height: "100%",
    flexDirection: "column",
    marginBottom: 40,
    marginLeft: 270,
    paddingTop: 10,
  },
  noProjectText: {
    fontSize: 14,
    fontWeight: 500,
    gap: 20,
  },
});
