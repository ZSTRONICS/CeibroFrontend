import { makeStyles } from "@material-ui/styles";
import assets from "assets/assets";
import RollOver from "components/RollOver/RollOver";
import React from "react";
import useStyles from "./styles";

const ChatMemberFilters = (props: any) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.memberContainer}>
        <div className={classes.memberMain}>
          <div className={classes.memberMenue}>
            <span className={classes.memberText}> All Members</span>
            <div className={classes.downArrow} onClick={props.handleMembersShow}>
              <assets.KeyboardArrowDown />
            </div>
            {props.show && (
              <RollOver handleToggle={props.handleMembersShow}>
                <div className={classes.memberActions}>
                  <span className={classes.memberAction}>Groups</span>
                  <span className={classes.memberAction}>Companies</span>
                </div>
              </RollOver>
            )}
          </div>
          <div className={classes.memberAdmin}>
            <span className={classes.memberTextAdmin}>Admins</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMemberFilters;
