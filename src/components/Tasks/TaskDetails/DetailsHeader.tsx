import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AssignedUserState, InvitedNumber, Topic } from "constants/interfaces";
import DetailActions from "./DetailActions";

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
    doneCommentsRequired,
  } = props;
  const data = [
    { label: "From", value: `${creator.firstName} ${creator.surName}` },
    {
      label: "Sent to",
      value:
        assignedToState.length > 0
          ? assignedToState
            .filter((user) => user.firstName || user.surName)
            .map((user) => {
              const { firstName, surName, phoneNumber } = user;
              if (firstName && surName) {
                return `${firstName} ${surName}`;
              } else if (firstName) {
                return firstName;
              } else if (surName) {
                return surName;
              } else {
                return phoneNumber;
              }
            })
            .join(", ")
          : "N/A",
    },
    { label: "Project", value: project ? project.title : "N/A" },
    {
      label: "Invitees",
      value:
        invitedNumbers.length > 0
          ? invitedNumbers
            .map((user: InvitedNumber) => {
              const { firstName, surName, phoneNumber } = user;
              if (firstName && surName) {
                return `${firstName} ${surName}`;
              } else if (firstName) {
                return firstName;
              } else if (surName) {
                return surName;
              } else {
                return phoneNumber;
              }
            })
            .join(", ")
          : "N/A",
    },
  ];

  return (
    <Box sx={{ padding: "0px 16px 0 5px" }}>
      <DetailActions
        doneImageRequired={doneImageRequired}
        doneCommentsRequired={doneCommentsRequired}
        taskId={taskId}
        userSubState={userSubState}
        dueDate={dueDate}
        taskUid={taskUid}
        createdOn={createdOn}
        assignedToState={assignedToState}
        invitedNumbers={invitedNumbers}
      />
      <Box sx={{ height: "30px", width: "100%", padding: "5px 0px" }}>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: "700 !important",
            fontSize: "14px !important",
            lineHeight: "20px",
          }}
        >
          {topic?.topic ?? "N/A"}
        </Typography>
      </Box>
      <Grid container sx={{ padding: "0px 0px 8px 0px" }} gap={0.5}>
        {data.map((item) => {
          return (
            <GridRow key={item.label}>
              <Grid item xs={1.6}>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: "500 !important",
                    fontSize: "12px !important",
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
                    fontWeight: "500 !important",
                    fontSize: "12px !important",
                    lineHeight: "18px",
                    color: "#131516 !important",
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
