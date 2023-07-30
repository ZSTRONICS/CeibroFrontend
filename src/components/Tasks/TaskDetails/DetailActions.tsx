// @ts-nocheck
import React from "react";
import { Grid, Button, Typography, Chip, Box } from "@mui/material";
import { CommentOutlined, ForwardOutlined } from "@mui/icons-material";
import assets from "../../../assets/assets";
import capitalize from "lodash/capitalize";
import { openFormInNewWindow } from "utills/common";

interface IProps {
  userSubState: string;
  dueDate: string;
  taskUid: string;
  createdOn: Date | any;
}

enum statusColors {
  new = "#CFECFF",
  unread = "#CFECFF",
  ongoing = "#F1B740",
  done = "#55BCB3",
  canceled = "#FFE7E7",
}
const DetailActions: React.FC<IProps> = (props) => {
  const { userSubState, taskUid, dueDate, createdOn } = props;
  const handleCommentClick = () => {
    // Handle comment button click here
  };

  const handleForwardClick = () => {
    openFormInNewWindow("/forward-task/:121");
  };

  const handleDoneClick = () => {
    // Handle done button click here
  };
  const chipColor: string =
    statusColors[userSubState as keyof typeof statusColors];
  return (
    <Grid container alignItems="center" sx={{ margin: "16px 0px" }}>
      <Grid item xs={6}>
        <Box sx={{ display: "flex", gap: "30px" }}>
          <Chip
            label={capitalize(userSubState)}
            size="small"
            sx={{
              borderColor: chipColor,
              backgroundColor: chipColor,
              borderRadius: "20px",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: 500,
              padding: "2px 8px",
            }}
          />
          <Chip
            label={taskUid}
            size="small"
            sx={{
              borderColor: "#818181",
              backgroundColor: "white",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "10px",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: 500,
              padding: "2px 8px",
            }}
          />
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: 500,
              color: "#818181",
              display: "flex",
              alignItems: "center",
            }}
          >
            {createdOn}
            {/* {new Date().toLocaleDateString("en-GB", {
              weekday: "short",
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })} */}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: 500,
              color: "#818181",
              display: "flex",
              alignItems: "center",
            }}
          >
            Due date: {dueDate}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} container justifyContent="flex-end" gap={2}>
        <Button
          startIcon={<img src={assets.CommentIcon} />}
          onClick={handleCommentClick}
          variant="text"
          sx={{ height: "24px", width: "103px", padding: "8px 16px" }}
        >
          Comment
        </Button>
        <Button
          startIcon={<img src={assets.ForwardIcon} />}
          onClick={handleForwardClick}
          variant="text"
          sx={{ height: "24px", width: "103px", padding: "8px 16px" }}
        >
          Forward
        </Button>
        <Button
          variant="contained"
          onClick={handleDoneClick}
          sx={{ height: "24px", width: "103px", padding: "8px 16px" }}
          disabled={userSubState === "done" || userSubState === "canceled"}
        >
          Done
        </Button>
      </Grid>
    </Grid>
  );
};

export default DetailActions;
