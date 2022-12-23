
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import assets from "../../assets/assets";
import colors from "../../assets/colors";
import { Typography, makeStyles } from "@material-ui/core";
import Divider from '@mui/material/Divider';

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
        {<assets.SearchIcon style={{ fill: '#0076C8' }} />}
        {/* <Typography className={classes.horizontalBreak}>|</Typography> */}
      </div>
      <Divider orientation="vertical" flexItem className={classes.hr} />
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
    background: colors.white,
    marginBottom: 25,
    borderRadius: 5,
    borderColor: '#FFFFFF',
    backgroundColor: '#fff',
    marginTop: 20,
    paddingLeft: 13,
    alignItems: 'center',
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 2,
    position: 'relative',
    borderRight: "none",

  },
  horizontalBreak: {
    color: '#0076C8',
    fontWeight: 600
  },
  inputWrapper: {
    // flex: 7,

    borderLeft: "none",
    paddingRight: 5,
  },
  input: {
    height: 35,
    flex: 1,
    width: "100%",
  },
  hr: {
    height: '20px !important',
    marginTop: 'auto !important',
    marginBottom: 'auto !important',
    backgroundColor: '#0076C8',
    width: 2,
    marginRight: '10px !important',
    marginLeft: '10px !important',
  }

});
