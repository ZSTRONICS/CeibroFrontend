import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import assets from "assets";
import { CustomDivider } from "components/CustomTags";
import DespcriptionBox from "components/Utills/DespcriptionBox";
import { AssignedUserState, InvitedNumber, Topic } from "constants/interfaces";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { assignedToState, project, topic, creator, invitedNumbers } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const infoBoxRef = useRef();
  const ellipsisContainerRef = useRef<HTMLSpanElement | null>(null);
  const parms = useParams<{ filterkey: string }>();

  const capitalizeFirstLetter = (str: string | undefined): string =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const getTextWidth = (text: string, font: string) => {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    if (context) {
      context.font = font;
      var width = context.measureText(text).width;
      return width;
    }
  };

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
    let flag = false;
    const ellipsisContainer = ellipsisContainerRef.current;
    if (ellipsisContainer) {
      let text: string = ellipsisContainer.textContent!;
      let font = window.getComputedStyle(ellipsisContainer).font;
      let textWidth = getTextWidth(text, font)!;
      if (textWidth >= ellipsisContainer.clientWidth) {
        flag = true;
      }
    }
    setIsReadMore(flag);
    !flag && setIsExpanded(false);

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
    if (parms.filterkey === "unread" || parms.filterkey === "new") {
      setIsExpanded(true);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  const renderInfoBox = ({
    label,
    value,
    width,
  }: InfoBoxProps): JSX.Element => (
    <>
      {value && (
        <Box
          ref={infoBoxRef}
          sx={{
            display: "flex",
            minWidth: width ? `${width}px` : "auto",
            paddingRight: "64px",
          }}
        >
          {renderLabel(label)}
          {renderValue(value, label)}
        </Box>
      )}
    </>
  );

  const renderLabel = (label: string): JSX.Element => (
    <Box
      sx={{
        minWidth: label === "Sent to" || label === "Invitees" ? "50px" : "73px",
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

  const renderValue = (value: string, label: string): JSX.Element => {
    const fontWeight = label === "Topic" ? 600 : 500;
    return (
      <>
        {value && value.length > 0 && (
          <Box sx={{ maxWidth: "95%", display: "flex", alignItems: "center" }}>
            <Typography
              ref={ellipsisContainerRef}
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
        )}
      </>
    );
  };

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
              {isReadMore && (
                <IconButton
                  onClick={() => setIsExpanded(!isExpanded)}
                  sx={{ height: "24px", width: "24px" }}
                >
                  {isExpanded ? (
                    <assets.ExpandMoreIcon sx={{ color: "#0076C8" }} />
                  ) : (
                    <assets.ExpandLessIcon sx={{ color: "#0076C8" }} />
                  )}
                </IconButton>
              )}
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
                {isExpanded ? (
                  <assets.ExpandMoreIcon sx={{ color: "#0076C8" }} />
                ) : (
                  <assets.ExpandLessIcon sx={{ color: "#0076C8" }} />
                )}
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
        {isReadMore && (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Typography
              sx={{
                cursor: "pointer",
                fontFamily: "Inter",
                fontSize: "12px",
                fontWeight: "400",
                color: "#0076C8",
              }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "View less" : "View more"}
            </Typography>
          </Box>
        )}
        <CustomDivider sx={{ my: 1.4 }} />
      </Box>
    </Box>
  );
}
