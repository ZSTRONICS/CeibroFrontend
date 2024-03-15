import { Box, Typography } from "@mui/material";

interface Props {
  eventData?: any;
  initiator?: any;
  type?: any;
  invitedMembers?: any;
  isCommentInitiator: boolean;
}

const MessageBot = ({
  eventData,
  initiator,
  type,
  isCommentInitiator,
}: Props) => {
  const Forward = () => {
    return eventData.map((items: any) => {
      const { firstName } = items;
      return <>{firstName}</>;
    });
  };

  var ShowContent = () => {
    switch (type) {
      case "ForwardTask":
        return `${initiator?.firstName} forwarded task to: ${
          // eventData[0]?.firstName
          eventData?.map((item: any) => item.firstName).join(", ")
        }`;
      case "DoneTask":
        return `${initiator?.firstName} ${initiator?.surName} marked the task as done `;
      case "InvitedUser":
        return ` Invited by ${initiator?.firstName}`;
      case "CancelTask":
        return `Task canceled by ${initiator?.firstName}`;
      case "UnCancelTask":
        return `Task un-canceled by ${initiator?.firstName}`;
      default:
        return "";
    }
  };

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            padding: "6px 16px 6px 16px",
            backgroundColor: !isCommentInitiator ? "#D4D4D4" : "#CFECFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
            {ShowContent()}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default MessageBot;
