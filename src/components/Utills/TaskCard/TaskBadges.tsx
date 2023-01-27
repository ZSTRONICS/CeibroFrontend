import React from "react";
import { Badge } from "@material-ui/core";
import { getStyleClass } from "config/styles.config";

const TaskBadges = () => {
  
  const badges = [
    {
      count: 8,
      status: "Ongoing",
    },
    {
      count: 3,
      status: "Approved",
    },
    {
      count: 5,
      status: "Done",
    },
    {
      count: 1,
      status: "Draft",
    },
    {
      count: 2,
      status: "Rejected",
    },

    {
      count: 12,
      status: "Submitted",
    },
  ];

  return (
    <>
      {badges?.map((badge, i:any) => {
        return (
          <div className={getStyleClass(badge.status)} key={i}>
            <Badge overlap="circular" key={i} color="primary" badgeContent={badge.count}></Badge>
          </div>
        );
      })}
    </>
  );
};

export default TaskBadges;
