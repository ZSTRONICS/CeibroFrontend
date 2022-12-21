
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import assets from "../../assets/assets";
import colors from "../../assets/colors";
import { Typography, makeStyles } from "@material-ui/core";

interface SearchInterface {
  value: string;
  handleChange: (e: any) => void;
}

const ChatMemberSearch: React.FC<SearchInterface> = (props) => {
  const classes = useStyles();
  const { handleChange, value } = props;

  return (
    <div className={classes.wrapper}>
      <div className={classes.iconWrapper}>
        <img src={assets.blueSearch} className="width-16" />
        <Typography className={classes.horizontalBreak}>|</Typography>
      </div>
      <div className={classes.inputWrapper}>
        <input
          type="text"
          className={`emptyBorder black-input ${classes.input}`}
          placeholder="Search"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ChatMemberSearch;

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flex: 1,
    background: colors.white,
    marginBottom: 25,
    borderRadius: 12,
    borderColor: '#FFFFFF',
    backgroundColor: '#fff',
  },
  iconWrapper: {
    flex: 2,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 2,

    borderRight: "none",
  },
  horizontalBreak: {
    color: '#0076C8',
    fontWeight: 600
  },
  inputWrapper: {
    flex: 7,

    borderLeft: "none",
    paddingRight: 5,
  },
  input: {
    height: 35,
    flex: 1,
    width: "100%",
  },
});
