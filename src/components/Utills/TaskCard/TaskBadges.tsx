import React from "react";
import { Badge } from "@material-ui/core";
import { getStyleClass } from "config/styles.config";

const TaskBadges = () => {
  
  const badges = [
    {
      count: 0,
      status: "Ongoing",
    },
    {
      count: 0,
      status: "Approved",
    },
    {
      count: 0,
      status: "Done",
    },
    {
      count: 0,
      status: "Draft",
    },
    {
      count: 0,
      status: "Rejected",
    },

    {
      count: 0,
      status: "Submitted",
    },
  ];

  return (
    <>
      {badges?.map((badge, i:any) => {
        return (
          <div className={getStyleClass(badge.status)} key={i} id={i}>
            <Badge showZero={false} overlap="circular" key={i}  color="primary" badgeContent={badge.count}></Badge>
          </div>
        );
      })}
    </>
  );
};

export default TaskBadges;
