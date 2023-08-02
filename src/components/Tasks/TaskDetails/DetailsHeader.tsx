import { Box } from "@mui/system";
import DetailActions from "./DetailActions";
import { Grid, Typography } from "@mui/material";
import {
  AssignedUserState,
  InvitedNumber,
  Project,
  Topic,
} from "constants/interfaces";

interface IProps {
  userSubState: string;
  assignedToState: AssignedUserState[];
  dueDate: string;
  taskId: string;
  taskUid: string;
  topic: Topic;
  createdOn: Date | any;
  creator: UserInfo;
  project: Project;
  invitedNumbers: InvitedNumber[];
  doneImageRequired: boolean;
  doneCommentsRequired: boolean;
}

const GridRow = ({ children }: any) => {
  return <Grid container>{children}</Grid>;
};

export default function DetailsHeader(props: IProps) {
  const {
    userSubState,
    assignedToState,
    dueDate,
    project,
    taskUid,
    topic,
    createdOn,
    creator,
    invitedNumbers,
    taskId,
    doneImageRequired,
doneCommentsRequired
  } = props;
  const data = [
    { label: "Created by", value: `${creator.firstName} ${creator.surName}` },
    {
      label: "Sent To",
      value:
        assignedToState.length > 0
          ? assignedToState
              .filter((user) => user.firstName || user.surName)
              .map((user) => {
                if (user.firstName && user.surName) {
                  return `${user.firstName} ${user.surName}`;
                } else if (user.firstName) {
                  return user.firstName;
                } else if (user.surName) {
                  return user.surName;
                } else {
                  return user.phoneNumber;
                }
              })
              .join(", ")
          : "N/A",
    },
    { label: "Project", value: project ? project.title : "N/A" },
    {
      label: "Invited Numbers",
      value:
        invitedNumbers.length > 0
          ? invitedNumbers
              .map((item: InvitedNumber) => {
                if (item.phoneNumber) {
                  return `${item.phoneNumber}`;
                }
              })
              .join(", ")
          : "N/A",
    },
  ];

  return (
    <Box sx={{ padding: "0px 16px" }}>
      <DetailActions
      doneImageRequired={doneImageRequired}
      doneCommentsRequired={doneCommentsRequired}
        taskId={taskId}
        userSubState={userSubState}
        dueDate={dueDate}
        taskUid={taskUid}
        createdOn={createdOn}
      />
      <Box sx={{ height: "30px", width: "100%", padding: "5px 0px" }}>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "20px",
          }}
        >
          {topic?.topic ?? "N/A"}
        </Typography>
      </Box>
      <Grid container sx={{ padding: "0px 0px 8px 0px" }} gap={0.5}>
        {data.map((item) => {
          return (
            <GridRow>
              <Grid item xs={1.6}>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "#605c5c",
                  }}
                >
                  {item.label}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#131516",
                  }}
                >
                  {item.value}
                </Typography>
              </Grid>
            </GridRow>
          );
        })}
      </Grid>
    </Box>
  );
}
