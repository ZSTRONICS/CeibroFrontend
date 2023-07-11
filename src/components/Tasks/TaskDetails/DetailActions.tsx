import React from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import { CommentOutlined, ForwardOutlined } from "@mui/icons-material";
import assets from "../../../assets/assets";

interface IProps {
  taskType?: string;
  taskId?: string;
  date?: string;
  dueDate?: string;
}

const StatusBadge: React.FC = ({ children }) => (
  <Box
    sx={{
      background: "#f1b740",
      borderRadius: "20px",
      padding: "2px 8px",
      height: "20px",
      minWidth: "65px",
      display: "flex",
      alignItems: "center",
    }}
  >
    <Typography
      sx={{
        fontFamily: "Inter",
        fontSize: "12px",
        fontWeight: 500,
        textAlign: "center",
        color: "#fff",
      }}
    >
      {children}
    </Typography>
  </Box>
);

const LabelBadge: React.FC = ({ children }) => (
  <Box
    sx={{
      borderColor: "#818181",
      borderWidth: "1px",
      borderRadius: "8px",
      padding: "2px 8px",
      color: "#818181",
      borderStyle: "solid",
      height: "20px",
      minWidth: "65px",
      display: "flex",
      alignItems: "center",
    }}
  >
    <Typography
      sx={{
        fontFamily: "Inter",
        fontSize: "12px",
        fontWeight: 500,
        textAlign: "center",
      }}
    >
      {children}
    </Typography>
  </Box>
);

const DetailActions: React.FC<IProps> = (props) => {
  const handleCommentClick = () => {
    // Handle comment button click here
  };

  const handleForwardClick = () => {
    // Handle forward button click here
  };

  const handleDoneClick = () => {
    // Handle done button click here
  };

  return (
    <Grid container alignItems="center" sx={{ margin: "16px 16px" }}>
      <Grid item xs={6}>
        <Box sx={{ display: "flex", gap: "30px" }}>
          <StatusBadge>Ongoing</StatusBadge>
          <LabelBadge>C1001</LabelBadge>
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
            {new Date().toLocaleDateString("en-GB", {
              weekday: "short",
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
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
            Due date:{" "}
            {new Date().toLocaleDateString("en-GB", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} container justifyContent="flex-end" gap={2}>
        <Button
          startIcon={<img src={assets.CommentIcon} />}
          onClick={handleCommentClick}
          variant="text"
          sx={{ height: "24px", width: "103px", padding: "8px,16px" }}
        >
          Comment
        </Button>
        <Button
          startIcon={<img src={assets.ForwardIcon} />}
          onClick={handleForwardClick}
          variant="text"
          sx={{ height: "24px", width: "103px", padding: "8px,16px" }}
        >
          Forward
        </Button>
        <Button
          variant="contained"
          onClick={handleDoneClick}
          sx={{ height: "24px", width: "103px", padding: "8px,16px" }}
        >
          Done
        </Button>
      </Grid>
    </Grid>
  );
};

export default DetailActions;
