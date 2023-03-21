
import {
  Button, CircularProgress, Grid, makeStyles, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import { avaialablePermissions } from "config/project.config";
import {
  MemberInterface
} from "constants/interfaces/project.interface";
import { checkMemberPermission } from "helpers/project.helper";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions, {
  deleteMember, getGroup, getMember,
  PROJECT_APIS,
  updateMember
} from "redux/action/project.action";
import { RootState } from "redux/reducers";

import colors from "../../../../../assets/colors";
// import membersDelete from "../../../../../assets/assets/../assets/membersDelete";
import assets from "assets/assets";
import CButton from "components/Button/Button";
import { AddStatusTag, ConfirmDescriptionTag } from "components/CustomTags";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { ProjectMemberInterface } from "constants/interfaces/ProjectRoleMemberGroup.interface";
import { toast } from "react-toastify";
import RoleMenu from "../ProjectRoles/RoleMenu";
import RollOverMenu from "./RollOverMenu";

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
  const { groupList, rolesList, selectedProject, memberList, userPermissions } =
    useSelector((state: RootState) => state?.project);

  const [group, setGroups] = useState<any>();
  const [role, setRoles] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getMember({other:selectedProject}))
  },[])
  // useEffect(() => {
  //   if (groupList) {
  //     const newGroups = groupList.map((group: GroupInterface) => {
  //       return {
  //         title: group.name,
  //         value: group._id,
  //       };
  //     });
  //     setGroups(newGroups);
  //   }
  // }, [groupList]);

  // useEffect(() => {
  //   if (rolesList) {
  //     const newRoles = rolesList?.map((role: any) => {
  //       return {
  //         title: role.name,
  //         value: role._id,
  //       };
  //     });
  //     setRoles(newRoles);
  //   }
  // }, [rolesList]);

  // const getMemebers = () => {
  //   if (selectedProject) {
  //     const payload = {
  //       finallyAction: () => {
  //         setLoading(false);
  //       },
  //       other: { projectId: selectedProject, includeMe: true },
  //     };
  //     setLoading(true);
  //     dispatch(getMember(payload));
  //   }
  // };


  const selectGroupHandle = (e: string, row: MemberInterface) => {
    const payload = {
      body: {
        groupId: e ? e : null,
        memberId: row?.id,
        roleId: row?.role?._id,
      },
      other: selectedProject,
    };

    dispatch(updateMember(payload));
  };

  const selectRoleHandle = (e: string, row: MemberInterface) => {
    const payload = {
      body: {
        groupId: row?.group?.id,
        memberId: row?.id,
        roleId: e,
      },
      other: selectedProject,
    };

    dispatch(updateMember(payload));
  };

  const havePermission = checkMemberPermission(
    userPermissions,
    avaialablePermissions.edit_permission
  );

  const haveDeletePermission = checkMemberPermission(
    userPermissions,
    avaialablePermissions.delete_permission
  );

  const handleEditMember = (member: ProjectMemberInterface) => {
    dispatch(projectActions.setSelectedMember(member));
    dispatch(projectActions.openProjectMemberDrawer());
    // dispatch(PROJECT_APIS.getProjectRolesById({ other: selectedProject }));
    // dispatch(getGroup({ other: selectedProject }));
  }

  const handleDelete = (id: any) => {
    // setLoading(true);

    confirm({
      title: <CustomStack gap={1}><assets.ErrorOutlineOutlinedIcon/> Confirmation</CustomStack>,
      description:<ConfirmDescriptionTag sx={{ pt:2}}>Are you sure you want to remove this person from project members?</ConfirmDescriptionTag>,
      titleProps: { color: "red", borderBottom:'1px solid #D3D4D9' },
      confirmationText:"Remove",
      confirmationButtonProps: {sx:{textTransform:'capitalize',padding:'4px 15px', color:'#FA0808', borderColor:'#FA0808', marginRight:'10px'}, variant:"outlined",},
      cancellationText: <CButton
      variant="contained"
      elevation={1}
      styles={{
        color: "#605C5C",
        backgroundColor: "#ECF0F1",
        fontSize: 12,
        fontWeight: "bold",
      }}
      label={"Cancel"}
    />,
    }).then(() => {
      dispatch(
        deleteMember({
          success: () => {
            toast.success("Deleted Successfully");
            dispatch(getMember({ other:  selectedProject }));
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
                if(member===undefined){
                  return <></>
                }
               return (
                 <TableRow key={member._id}>
                   <TableCell
                     component="th"
                     scope="row"
                   >
                     <Typography className={classes.nameWrapper}>
                       {`${member?.user?.firstName} ${member?.user?.surName}`}
                     </Typography>
                     <Typography className={classes.organizationName}>
                       Company:{member?.user?.companyName ?? "N/A"}
                     </Typography>
                     {/* </div> */}
                   </TableCell>
                   <TableCell>
                     <AddStatusTag sx={{ color: "#000000" }}>
                       {member.role ? member.role.name : "N/A"}
                     </AddStatusTag>
                   </TableCell>
                   <TableCell>
                     <AddStatusTag sx={{ color: "#000000" }}>
                       {member.group ? member.group.name : "N/A"}
                     </AddStatusTag>
                   </TableCell>
                   <TableCell align="right" style={{ width: "10%" }}>
                     <RollOverMenu
                      edit="Edit"
                      showDelBtn={true}
                     handleDelete={() => handleDelete(member._id)}
                     handleEdit={()=>{handleEditMember(member)}}
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

export default RolesTable;

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    // position: "relative",
  },
  nameWrapper: {fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,},
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
