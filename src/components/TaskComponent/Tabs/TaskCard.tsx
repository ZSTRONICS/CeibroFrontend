import * as React from "react";
import { MoreVert } from "@material-ui/icons";
import { Box, Button, CardActions, Divider, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
// import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import assets from "assets/assets";
import TaskBadges from "components/Utills/TaskCard/TaskBadges";
import { makeStyles } from "@material-ui/core";

const TaskCard = (props: any) => {
  const { ColorByStatus, task } = props;
  const classes = useStyles();
  const start = new Date().toLocaleDateString("de-DE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const SubHeader = () => {
    return (
      <>
        <CustomStack gap={1.25}>
          <TaskStatus>Active</TaskStatus>
          <Typography sx={{ fontSize: "11px", fontWeight: "500" }}>
            {start}
          </Typography>
        </CustomStack>
      </>
    );
  };

  const Action = () => {
    return (
      <>
        <CustomStack alignItems="center">
          <Box
            sx={{
              padding: "0 4px 5px",
            }}
          >
            <CounterSpan>14/2</CounterSpan>
          </Box>
          <Box
            sx={{
              padding: "5px 4px 0",
            }}
          >
            {task.status === "Done" && (
              <assets.CheckCircleIcon
                sx={{ color: "#55BCB3" }}
                fontSize="small"
              />
            )}
            {task.status === "Rejected" && (
              <assets.ErrorOutlinedIcon color="error" fontSize="small" />
            )}
          </Box>
          {/* <IconButton aria-label="settings"> */}
          <MoreVert color="primary" />
          {/* </IconButton> */}
        </CustomStack>
      </>
    );
  };

  return (
    //  <Grid item  className={classes.cardContainer}>
      <Card className={classes.cardContainer}
      sx={{
       
        width: "100%",
        border: `1px solid ${ColorByStatus(task?.status)}`,
      }}
      elevation={0}
      variant="outlined"
    >
      <CardHeader
        sx={{ padding: "15px 14px 0" }}
        subheader={SubHeader()}
        action={Action()}
      />
      <CardContent sx={{ paddingBottom: "0px" }}>
        <CustomStack gap={2.5}>
          <Box>
            <LabelTag>Task due date</LabelTag>
            <AssignedTag>{start}</AssignedTag>
          </Box>
          <Box>
            <LabelTag>Assigned to</LabelTag>
            <AssignedTag>Kristo vunkainen</AssignedTag>
          </Box>
        </CustomStack>
        <Box pt={2.5}>
          <AssignedTag sx={{ fontSize: "16px", fontWeight: "600" }}>
            Elektrikaabli paigaldus
          </AssignedTag>
        </Box>
        <CustomStack
          pt={2.5}
          sx={{ justifyContent: "space-between", flexWrap: "wrap" }}
          direction={{ xs: "row", sm: "row" }}
        >
          <Box>
            <CustomStack gap={0.5}>
              <img
                src={assets.clipboardIcon}
                className="width-16"
                alt="ceibro"
              />
              <AssignedTag sx={{ fontSize: "11px" }}>45 subtask(s)</AssignedTag>
            </CustomStack>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "25px",
              "& .MuiBadge-badge": {
                fontSize: "9px !important",
                fontWeight: "600 !important",
              },
            }}
          >
            <TaskBadges />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 13 12"
              fill="none"
            >
              <path
                d="M3.611 9.10575H4.111V8.60575H3.611V9.10575ZM3.611 11.271H3.111C3.111 11.4604 3.21797 11.6335 3.38733 11.7182C3.55668 11.8029 3.75936 11.7847 3.91088 11.6711L3.611 11.271ZM6.49989 9.10575V8.60575H6.33331L6.20002 8.70565L6.49989 9.10575ZM4.33322 3.5535H3.83322V4.5535H4.33322V3.5535ZM8.66656 4.5535H9.16656V3.5535H8.66656V4.5535ZM4.33322 5.71875H3.83322V6.71875H4.33322V5.71875ZM7.22211 6.71875H7.72211V5.71875H7.22211V6.71875ZM3.111 9.10575V11.271H4.111V9.10575H3.111ZM3.91088 11.6711L6.79977 9.50584L6.20002 8.70565L3.31113 10.8709L3.91088 11.6711ZM6.49989 9.60575H10.8332V8.60575H6.49989V9.60575ZM10.8332 9.60575C11.5084 9.60575 12.0554 9.0596 12.0554 8.38401H11.0554C11.0554 8.50668 10.9568 8.60575 10.8332 8.60575V9.60575ZM12.0554 8.38401V1.88824H11.0554V8.38401H12.0554ZM12.0554 1.88824C12.0554 1.21265 11.5084 0.666504 10.8332 0.666504V1.6665C10.9568 1.6665 11.0554 1.76557 11.0554 1.88824H12.0554ZM10.8332 0.666504H2.16656V1.6665H10.8332V0.666504ZM2.16656 0.666504C1.49135 0.666504 0.944336 1.21265 0.944336 1.88824H1.94434C1.94434 1.76557 2.04299 1.6665 2.16656 1.6665V0.666504ZM0.944336 1.88824V8.38401H1.94434V1.88824H0.944336ZM0.944336 8.38401C0.944336 9.0596 1.49135 9.60575 2.16656 9.60575V8.60575C2.04299 8.60575 1.94434 8.50668 1.94434 8.38401H0.944336ZM2.16656 9.60575H3.611V8.60575H2.16656V9.60575ZM4.33322 4.5535H8.66656V3.5535H4.33322V4.5535ZM4.33322 6.71875H7.22211V5.71875H4.33322V6.71875Z"
                fill="#0076C8"
              />
            </svg>
            <AssignedTag sx={{ fontSize: "11px" }}>12</AssignedTag>
          </Box>
        </CustomStack>
        <Divider sx={{ paddingBottom: "10px" }} />
      </CardContent>
      <CCardActions>
        <AssignedTag sx={{ fontWeight: "600" }}>Paevälja 12</AssignedTag>
        <Button
          size="small"
          sx={{ fontSize: "12px", fontFamily: "Inter", fontWeight: "600" }}
        >
          view map
        </Button>
      </CCardActions>
    </Card>
    //  </Grid>
    
  );
};

export default TaskCard;
const useStyles = makeStyles((theme) => ({
  cardContainer: {
    maxWidth: 365,
    [theme.breakpoints.down(1024)]: {
      columnGap:'20.04px',
      maxWidth: '319px',
    },
  },

}));
const CCardActions = styled(CardActions)`
  padding: 14px;
  padding-top: 0;
  padding-bottom: 8px;
  justify-content: space-between;
`;
const LabelTag = styled(Typography)`
  font-size: 11px;
  font-weight: 500;
  color: #605c5c;
`;
const AssignedTag = styled(Typography)`
  font-weight: 500;
  font-size: 12.5px;
  color: #000000;
`;

const CustomStack = styled(Stack)`
  flex-direction: row;
  align-items: center;
`;
const TaskStatus = styled(Typography)`
  border: 1px solid #f1b740;
  border-radius: 3px;
  padding: 2px 5px;
  color: #000000;
  font-size: 11px;
`;

const CounterSpan = styled("span")`
  font-size: 9px;
  border: 1px solid #605c5c;
  padding: 3px 5px;
  border-radius: 20px;
  font-weight: 700;
`;