import { makeStyles, Typography } from "@material-ui/core";
import { Delete, PersonAdd } from "@material-ui/icons";
import assets from "assets/assets";
import React from "react";
import { BiPencil } from "react-icons/bi";
import colors from "../../../assets/colors";
import HorizontalBreak from "../Others/HorizontalBreak";
import { MenuOptions } from "../Others/MenuButton";
import GroupMenu from "./GroupMenu";

const menue: MenuOptions[] = [
  {
    title: "Manage Group",
    icon: <BiPencil />,
  },
  {
    title: "Add people",
    icon: <PersonAdd />,
  },
  {
    title: "Delete Group",
    icon: <Delete />,
  },
];

interface GroupChipInterface {
  name: string;
  groupId: string;
  handleClick: () => void;
  handleDelete: () => void;
}

const GroupChip: React.FC<GroupChipInterface> = (props) => {
  const { name, handleClick, groupId, handleDelete } = props;
  const classes = useStyles();
  return (
    <div>
      <div className={classes.groupChip} onClick={handleClick}>
        <div className={classes.title}>
          <img src={assets.chevrondown} className="w-16" />
          <Typography className={classes.titleText}>{name}</Typography>
        </div>
        <div className={classes.action}>
          <GroupMenu
            onDelete={handleDelete}
            groupId={groupId}
            onEdit={handleClick}
            name={name}
          />
        </div>
      </div>
      <HorizontalBreak color={colors.grey} />
    </div>
  );
};

export default GroupChip;

const useStyles = makeStyles({
  groupChip: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 12,
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
    fontWeight: 500,
    paddingLeft: 5,
  },
});
