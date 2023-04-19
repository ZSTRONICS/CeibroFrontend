import { makeStyles } from "@material-ui/core";
// import { Delete, PersonAdd } from "@material-ui/icons";
import { Divider } from "@mui/material";
import { CollapseComponent } from "components/Collapse/CollapseComponent";
import {
  GroupMemberNameTag,
  ProjectSubHeadingTag,
} from "components/CustomTags";
import {
  Member,
  ProjectGroupInterface,
} from "constants/interfaces/ProjectRoleMemberGroup.interface";
import { UserInterface } from "constants/interfaces/user.interface";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getGroupMembers } from "redux/action/project.action";
import colors from "../../../assets/colors";
// import { MenuOptions } from "../Others/MenuButton";
// import NameAvatar from "../Others/NameAvatar";
import GroupMenu from "./GroupMenu";
import { RootState } from "redux/reducers";
// const menue: MenuOptions[] = [
//   {
//     title: "Edit Group",
//     icon: <BiPencil />,
//   },
//   {
//     title: "Add people",
//     icon: <PersonAdd />,
//   },
//   {
//     title: "Delete Group",
//     icon: <Delete />,
//   },
// ];

interface GroupChipInterface {
  group: ProjectGroupInterface;
  handleClick: () => void;
  handleDelete: () => void;
}

const GroupChip: React.FC<GroupChipInterface> = (props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { group, handleClick, handleDelete } = props;
  const [groupExpanded, setGroupExpanded] = React.useState<string | false>(
    "admin"
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setGroupExpanded(newExpanded ? panel : false);
    };

  const classes = useStyles();
  const dispatch = useDispatch();
  const [members, setMembers] = useState<UserInterface[]>([]);

  // useEffect(() => {
  //   if (groupExpanded) {
  //     dispatch(
  //       getGroupMembers({
  //         other: groupId,
  //         success: (res) => {
  //           setMembers(res.data);
  //         },
  //       })
  //     );
  //   }
  // }, [groupExpanded]);

  return (
    <>
      <div className={classes.groupChip}>
        <CollapseComponent.Accordion
          sx={{ maxWidth: 900, width: "100%" }}
          expanded={groupExpanded === group.name}
          onChange={handleChange(group.name)}
        >
          <CollapseComponent.AccordionSummary
            aria-controls={group.name}
            id={group.name + 1}
          >
            <ProjectSubHeadingTag sx={{ textTransform: 'capitalize', fontSize: 14 }}>
              {group.name}
            </ProjectSubHeadingTag>
          </CollapseComponent.AccordionSummary>
          <CollapseComponent.AccordionDetails
            sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}
          >
            {group.members.length > 0 ? (
              group.members?.map((member: Member, index: any) => {
                if (!member) {
                  return <></>;
                }
                let memberName = "Me";
                if (String(member._id) !== String(user._id)) {
                  memberName = `${member.firstName} ${member.surName}`;
                }

                return (
                  <GroupMemberNameTag sx={{ textTransform: 'capitalize' }} key={member._id}>
                    {index === group.members.length - 1
                      ? memberName
                      : `${memberName}, `}
                    &nbsp;
                  </GroupMemberNameTag>
                );
              })
            ) : (
              <GroupMemberNameTag>No data found!</GroupMemberNameTag>
            )}
          </CollapseComponent.AccordionDetails>
        </CollapseComponent.Accordion>
        <div className={classes.action}>
          <GroupMenu
            onDelete={handleDelete}
            groupId={group._id}
            onEdit={handleClick}
            name={group.name}
          />
        </div>
      </div>
      <Divider />
    </>
  );
};

export default GroupChip;

const useStyles = makeStyles({
  groupChip: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingBottom: 12,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    color: colors.primary,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 600,
    paddingLeft: 5,
  },
  memberName: {
    fontSize: 14,
    fontWeight: 700,
  },
  memberCompany: {
    fontSize: 12,
    fontWeight: 500,
  },
});
