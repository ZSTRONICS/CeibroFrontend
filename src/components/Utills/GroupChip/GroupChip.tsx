import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import colors from "../../../assets/colors";
import HorizontalBreak from "../Others/HorizontalBreak";
import MenuButton from "../Others/MenuButton";
import { MenuOptions } from "../Others/MenuButton";
import { BiPencil } from "react-icons/bi";
import { Delete, PersonAdd } from "@material-ui/icons";
import assets from "assets/assets";

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

const GroupChip = (props: any) => {
  const { name, handleClick } = props;
  const classes = useStyles();
  return (
    <div>
      <div className={classes.groupChip} onClick={handleClick}>
        <div className={classes.title}>
          <img src={assets.chevrondown} className="w-16" />
          <Typography className={classes.titleText}>{name}</Typography>
        </div>
        <div className={classes.action}>
          <img src={assets.moreIcon} className={"width-16"} />
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
