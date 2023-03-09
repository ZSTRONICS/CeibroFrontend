
import { makeStyles } from "@material-ui/core";
// import { Delete, PersonAdd } from "@material-ui/icons";
import { Divider } from "@mui/material";
import { CollapseComponent } from "components/Collapse/CollapseComponent";
import { GroupMemberNameTag, ProjectSubHeadingTag } from "components/CustomTags";
import { UserInterface } from "constants/interfaces/user.interface";
import React, { useEffect, useState } from "react";
// import { BiPencil } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getGroupMembers } from "redux/action/project.action";
import colors from "../../../assets/colors";
// import { MenuOptions } from "../Others/MenuButton";
// import NameAvatar from "../Others/NameAvatar";
import GroupMenu from "./GroupMenu";
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
  name: string;
  groupId: string;
  handleClick: () => void;
  handleDelete: () => void;
}

const GroupChip: React.FC<GroupChipInterface> = (props) => {
    const { name, handleClick, groupId, handleDelete } = props;

  const [groupExpanded, setGroupExpanded] = React.useState<string | false>("admin");

  const handleChange = (panel: string) => (event: React.SyntheticEvent,newExpanded: boolean) => {
    setGroupExpanded(newExpanded ? panel : false);
  };

  const classes = useStyles();
  const dispatch = useDispatch();
  const [members, setMembers] = useState<UserInterface[]>([]);

  useEffect(() => {
    if (groupExpanded) {
      dispatch(
        getGroupMembers({
          other: groupId,
          success: (res) => {
            setMembers(res.data);
          },
        })
      );
    }
  }, [groupExpanded]);

  return (<>
      <div className={classes.groupChip}>
        <CollapseComponent.Accordion
          sx={{maxWidth:900, width:'100%'}}
          expanded={groupExpanded === name}
          onChange={handleChange(name)}
        >
          <CollapseComponent.AccordionSummary aria-controls={name} id={name+1}>
            <ProjectSubHeadingTag
              sx={{ fontSize:14}}>
              {name}
            </ProjectSubHeadingTag>
          </CollapseComponent.AccordionSummary>
          <CollapseComponent.AccordionDetails sx={{display:'flex',gap:0.5, flexWrap:'wrap'}}>
               {members.length>0? members?.map((member: any, index: any) => {
               if(!member) {
                return <></>;
              }
              const memberName = `${member?.firstName} ${member?.surName}`
              return (
                <GroupMemberNameTag key={member}>
                  { index === members.length - 1 ? memberName : `${memberName},`}&nbsp;
                </GroupMemberNameTag> 
              );
            }):<GroupMemberNameTag>No data found!</GroupMemberNameTag>}
          </CollapseComponent.AccordionDetails>
        </CollapseComponent.Accordion>
        <div className={classes.action}>
          <GroupMenu
            onDelete={handleDelete}
            groupId={groupId}
            onEdit={handleClick}
            name={name}
          />
        </div>
      </div>
      <Divider/>
    </>
  );
};

export default GroupChip;

const useStyles = makeStyles({
  groupChip: {
    display: "flex",
    justifyContent: "space-between",
    alignItems:'center',
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
