import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomDivider from "components/Utills/CustomDivider";
import DespcriptionBox from "components/Utills/DespcriptionBox";
import { AssignedUserState, InvitedNumber, Topic } from "constants/interfaces";
import { useEffect, useState } from "react";
import ExpandedHeaderView from "./ExpandedHeaderView";

interface IProps {
  assignedToState: AssignedUserState[];
  topic: Topic;
  creator: UserInfo;
  project: Project;
  invitedNumbers: InvitedNumber[];
}

interface InfoBoxProps {
  label: string;
  value: string;
  width?: number;
}

export default function DetailsHeader(props: IProps) {
  const {
    assignedToState,
    project,
    topic,
    creator,
    invitedNumbers,
  } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const capitalizeFirstLetter = (str: string | undefined): string =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const formatUserName = (user: AssignedUserState | InvitedNumber) => {
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
  };

  const data = {
    createdBY: {
      label: "Created by",
      value: `${creator.firstName} ${creator.surName}`,
    },
    sentTo: {
      label: "Sent to",
      value:
        assignedToState.length > 0
          ? assignedToState.map(formatUserName).join(", ")
          : "N/A",
    },
    project: { label: "Project", value: project && project.title },
    Invitees: {
      label: "Invitees",
      value:
        invitedNumbers.length > 0
          ? invitedNumbers.map(formatUserName).join(", ")
          : "",
    },
  };

  const windowWidth = window.innerWidth;
  let gap =
    windowWidth >= 786 && windowWidth < 1200
      ? 0.8
      : windowWidth >= 1200 && windowWidth < 1360
      ? 0.8
      : windowWidth >= 1460
      ? 1.4
      : 1.5;

  const [rowGap, setRowGap] = useState<number>(gap);
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    let gap =
      windowWidth >= 786 && windowWidth < 1200
        ? 1
        : windowWidth >= 1200 && windowWidth < 1360
        ? 1
        : windowWidth >= 1460
        ? 0.8
        : 0.5;
    setRowGap(gap);
    return gap;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const renderInfoBox = ({
    label,
    value,
    width,
  }: InfoBoxProps): JSX.Element => (
    <Box sx={{ display: "flex", minWidth: width ? `${width}px` : "auto" }}>
      {renderLabel(label)}
      {renderValue(value, label === "Topic" ? 600 : 500)}
    </Box>
  );

  const renderLabel = (label: string): JSX.Element => (
    <Box
      sx={{
        minWidth: "73px",
        height: "20px",
        gap: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "16px",
          color: "#605c5c",
        }}
      >
        {label}
      </Typography>
    </Box>
  );

  const renderValue = (value: string, fontWeight: number): JSX.Element => (
    <Box sx={{ maxWidth: "95%", display: "flex", alignItems: "center" }}>
      <Typography
        style={{
          fontWeight: fontWeight ?? 500,
          fontSize: "12px",
          color: "#000",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "1",
          WebkitBoxOrient: "vertical",
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ padding: "0px 0px 0px 0px" }}>
      <Box>
        {!isExpanded && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {renderInfoBox({
                label: "Topic",
                value: capitalizeFirstLetter(topic.topic) || "N/A",
              })}
              <IconButton
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{ height: "24px", width: "24px" }}
              >
                {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </Box>
            <Box sx={{ display: "flex" }}>
              {renderInfoBox({
                label: data.createdBY.label,
                value: data.createdBY.value,
                width: 300,
              })}
              {renderInfoBox({
                label: data.sentTo.label,
                value: data.sentTo.value,
              })}
            </Box>
            <Box sx={{ display: "flex" }}>
              {renderInfoBox({
                label: data.project.label,
                value: data.project.value,
                width: 300,
              })}
              {renderInfoBox({
                label: data.Invitees.label,
                value: data.Invitees.value,
              })}
            </Box>
          </Box>
        )}

        {isExpanded && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <DespcriptionBox
                description={
                  topic?.topic
                    ? topic.topic.charAt(0).toUpperCase() + topic.topic.slice(1)
                    : "N/A"
                }
                title="Topic"
                despFontSize="14px"
                despFontWeight={600}
              />
              <IconButton
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{ height: "24px", width: "24px" }}
              >
                {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </Box>

            <ExpandedHeaderView
              topic={
                topic?.topic
                  ? topic.topic.charAt(0).toUpperCase() + topic.topic.slice(1)
                  : "N/A"
              }
              createdBy={data.createdBY.value}
              project={data.project.value}
              sentTo={data.sentTo.value}
              Invitees={data.Invitees.value}
            />
          </>
        )}
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "end",
            fontFamily: "Inter",
            fontSize: "12px",
            fontWeight: "400",
            color: "#0076C8",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "View less" : "View more"}
        </Box>
         <CustomDivider/>
      </Box>
    </Box>
  );
}
