import { Avatar, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import assets from "assets";
import { CustomDivider } from "components/CustomTags";
import { momentdeDateFormat } from "components/Utills/Globals";
import { AssignedUserState, InvitedNumber } from "constants/interfaces";
import { useDynamicDimensions } from "hooks";
import { startTransition, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { formatUserName, getWidthWithMarginAndPadding } from "utills/common";

interface IProps {
  assignedToState: AssignedUserState[];
  title: string;
  creator: UserInfo;
  project: Project;
  taskUID: string;
  createdDate: string;
  dueDate: string | null;
  confirmer: UserInfo;
  viewer: UserInfo[];
  invitedNumbers: InvitedNumber[];
  splitView: boolean;
}

interface InfoBoxProps {
  label: string;
  value: string | null;
  width?: number;
  userPic?: string;
}

export default function DetailsHeader(props: IProps) {
  const {
    assignedToState,
    project,
    createdDate,
    creator,
    taskUID,
    invitedNumbers,
    dueDate,
    confirmer,
    viewer,
    splitView,
  } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const ellipsisContainerRef = useRef<HTMLSpanElement | null>(null);
  const parms = useParams<{ filterkey: string }>();
  const [count, setCount] = useState<number>(0);
  const { containerRef, dimensions } = useDynamicDimensions();
  const { containerRef: avatarContRef, dimensions: avatarContDimension } =
    useDynamicDimensions();
  const { containerRef: userAvatarRef, dimensions: userAvatarDimension } =
    useDynamicDimensions();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const getTextWidth = (text: string, font: string) => {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    if (context) {
      context.font = font;
      var width = context.measureText(text).width;
      return width;
    }
  };

  const localCreatedDate = momentdeDateFormat(createdDate);
  const data = {
    TaskID: {
      label: "Task ID",
      value: taskUID,
    },
    Project: {
      label: "Project",
      value: project ? project.title : null,
    },
    CreatedDate: {
      label: "Created Date",
      value: localCreatedDate,
    },
    DueDate: {
      label: "Due Date",
      value: dueDate ? dueDate : null,
    },

    Createdby: {
      label: "Created by  ",
      value: [creator],
    },
    sentTo: {
      label: "Sent to",
      value: assignedToState.length > 0 ? assignedToState : null,
    },
    Invitees: {
      label: "Invitees",
      value: invitedNumbers.length > 0 ? invitedNumbers : null,
    },
    Confirmer: {
      label: "Confirmer",
      value: confirmer ? [confirmer] : null,
    },
    Viewer: {
      label: "Viewer",
      value: viewer.length > 0 ? viewer : null,
    },
  };

  // const windowWidth = window.innerWidth;
  // let gap =
  //   windowWidth >= 786 && windowWidth < 1200
  //     ? 0.8
  //     : windowWidth >= 1200 && windowWidth < 1360
  //     ? 0.8
  //     : windowWidth >= 1460
  //     ? 1.4
  //     : 1.5;

  // const [rowGap, setRowGap] = useState<number>(gap);
  // const handleResize = () => {
  //   const windowWidth = window.innerWidth;
  //   let flag = false;
  //   const ellipsisContainer = ellipsisContainerRef.current;
  //   if (ellipsisContainer) {
  //     let text: string = ellipsisContainer.textContent!;
  //     let font = window.getComputedStyle(ellipsisContainer).font;
  //     let textWidth = getTextWidth(text, font)!;
  //     if (textWidth >= ellipsisContainer.clientWidth) {
  //       flag = true;
  //     }
  //   }
  //   setIsReadMore(flag);
  //   !flag && setIsExpanded(false);

  //   let gap =
  //     windowWidth >= 786 && windowWidth < 1200
  //       ? 1
  //       : windowWidth >= 1200 && windowWidth < 1360
  //       ? 1
  //       : windowWidth >= 1460
  //       ? 0.8
  //       : 0.5;
  //   setRowGap(gap);
  //   return gap;
  // };
  const handleResize = () => {
    if (avatarContRef.current) {
      const localWidth = getWidthWithMarginAndPadding(avatarContRef);
      if (localWidth > 140) {
        const itemCount = Math.floor(localWidth / 145);
        setCount(itemCount);
      }
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [isExpanded]);

  const renderInfoBox = ({ label, value }: InfoBoxProps): JSX.Element => (
    <>
      {value && (
        <Box
          sx={{
            display: "flex",
            minWidth: "auto",
            flexDirection: "column",
            gap: 0.6,
          }}
        >
          {renderLabel(label)}
          {renderValue(value, label)}
        </Box>
      )}
    </>
  );

  const renderLabel = (label: string): JSX.Element => (
    <Typography
      sx={{
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "16px",
        color: "#605c5c",
        width: "100%",
      }}
    >
      {label}
    </Typography>
  );

  const renderValue = (value: string | null, label: string): JSX.Element => {
    return (
      <>
        {label === "Project" ? (
          <Tooltip title={value}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "12px",
                color: "#000",
                maxWidth: `${dimensions.width - 10}px`,
                width: "100%",
              }}
              className="ellipsis"
            >
              {value}
            </Typography>
          </Tooltip>
        ) : (
          value &&
          value.length > 0 && (
            <Typography
              ref={ellipsisContainerRef}
              style={{
                fontWeight: 600,
                fontSize: "12px",
                color: "#000",
                width: "auto",
                maxWidth: isExpanded
                  ? `${userAvatarDimension.width - 10}px`
                  : "unset",
              }}
              className="ellipsis"
            >
              {value}
            </Typography>
          )
        )}
      </>
    );
  };

  const renderAvatar = (user: AssignedUserState | InvitedNumber | UserInfo) => {
    const avatarLetter =
      user?.firstName &&
      user.firstName?.[0]?.toUpperCase?.() +
        (user.surName?.[0]?.toUpperCase?.() || "");
    return (
      <>
        {user?.profilePic ? (
          <Avatar
            alt="avater"
            src={user?.profilePic}
            variant="circular"
            sx={{ width: "24px", height: "24px", border: "1px solid #E2E4E5" }}
          />
        ) : (
          <>
            {avatarLetter && (
              <Avatar variant="circular" sx={{ width: "24px", height: "24px" }}>
                {avatarLetter}
              </Avatar>
            )}
          </>
        )}
      </>
    );
  };

  const renderUserWithAvatar = ({
    label,
    users,
  }: {
    label: string;
    users: AssignedUserState[] | InvitedNumber[] | UserInfo[] | null;
  }) => {
    let localCount: number | null = 0;
    const isSentTo = label === "Sent to" || label === "Invitees";
    localCount =
      label === "Sent to"
        ? users && users?.length - count
        : users && users?.length - 1;
    return (
      <>
        {users && (
          <Box
            ref={label === "Sent to" ? avatarContRef : null}
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              pt: "9px",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "12px",
                color: "#605c5c",
              }}
            >
              {label}
            </Typography>
            <Box
              ref={infoBoxRef}
              className="ellipsis"
              sx={{
                display: "flex",
                gap: 1.25,
                alignItems: "center",
                flexWrap: "wrap",
                height: isExpanded ? "36px" : "auto",
                overflow: isExpanded ? "hidden" : "unset",
                marginTop: label === "Invitees" ? "6px" : null,
                width: "97%",
              }}
            >
              {users.map((user, i) => {
                return (
                  <Box
                    ref={userAvatarRef}
                    key={i}
                    sx={{
                      display: "flex",
                      gap: 0.6,
                      alignItems: "center",
                      flexWrap: "nowrap",
                      pt: 1,
                      width: isExpanded ? "135px" : "auto",
                    }}
                  >
                    {renderAvatar(user)}
                    {renderValue(formatUserName(user), "")}
                  </Box>
                );
              })}
            </Box>{" "}
            {isSentTo && isExpanded && localCount && localCount > 0 ? (
              <Box
                sx={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#0076C8",
                  pt: "4px",
                  position: "absolute",
                  right: label === "Invitees" ? "12%" : "1%",
                  top: "50%",
                }}
              >
                +{localCount}
              </Box>
            ) : (
              <></>
            )}
          </Box>
        )}
      </>
    );
  };

  const handleFullView = () => {
    let showFullViewData;
    const data = localStorage.getItem("showFullView");
    if (data) {
      showFullViewData = JSON.parse(data);
    }
    localStorage.setItem(
      "showFullView",
      JSON.stringify({ ...showFullViewData, [taskUID]: !isExpanded })
    );
    startTransition(() => {
      setIsExpanded(!isExpanded);
    });
  };

  return (
    <Box>
      <Box>
        <Grid container sx={{ gap: 0.8 }}>
          <Grid container justifyContent={"space-between"}>
            <Grid item> {renderLabel("Main Information")}</Grid>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <IconButton
                  onClick={handleFullView}
                  sx={{ height: "24px", width: "24px" }}
                >
                  {isExpanded ? (
                    <assets.ExpandLessIcon sx={{ color: "#0076C8" }} />
                  ) : (
                    <assets.ExpandMoreIcon sx={{ color: "#0076C8" }} />
                  )}
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "23%" }}>
            {renderInfoBox({
              label: data.TaskID.label,
              value: data.TaskID.value,
            })}
          </Grid>
          {data.Project.value && (
            <Grid item sx={{ width: "25%" }} ref={containerRef}>
              {renderInfoBox({
                label: data.Project.label,
                value: data.Project.value,
              })}
            </Grid>
          )}
          {data.CreatedDate.value && (
            <Grid item sx={{ width: "22%" }}>
              {renderInfoBox({
                label: data.CreatedDate.label,
                value: data.CreatedDate.value,
              })}
            </Grid>
          )}
          {data.DueDate.value && (
            <Grid item sx={{ width: "22%" }}>
              {renderInfoBox({
                label: data.DueDate.label,
                value: data.DueDate.value,
              })}
            </Grid>
          )}
        </Grid>
        {/* users */}
        <Grid
          container
          sx={{
            justifyContent: {
              sm: "space-between",
              lg: splitView ? "space-between" : "unset",
            },
          }}
        >
          <Grid
            className="ellipsis"
            item
            sx={{ width: { sm: "50%", lg: splitView ? "50%" : "23.5%" } }}
          >
            {renderUserWithAvatar({
              label: data.Createdby.label,
              users: data.Createdby.value,
            })}
          </Grid>
          {data.Confirmer.value && (
            <Grid
              item
              sx={{ width: { sm: "50%", lg: splitView ? "50%" : "76%" } }}
            >
              {renderUserWithAvatar({
                label: data.Confirmer.label,
                users: data.Confirmer.value,
              })}
            </Grid>
          )}
          {isExpanded && data.Invitees.value && (
            <Grid
              item
              sx={{
                width: "12%",
                minWidth: "170px",
              }}
            >
              {renderUserWithAvatar({
                label: data.Invitees.label,
                users: data.Invitees.value,
              })}
            </Grid>
          )}
        </Grid>

        {renderUserWithAvatar({
          label: data.sentTo.label,
          users: data.sentTo.value,
        })}
        {!isExpanded &&
          renderUserWithAvatar({
            label: data.Viewer.label,
            users: data.Viewer.value,
          })}
        {!isExpanded &&
          renderUserWithAvatar({
            label: data.Invitees.label,
            users: data.Invitees.value,
          })}
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Typography
            sx={{
              cursor: "pointer",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: "400",
              color: "#0076C8",
            }}
            onClick={handleFullView}
          >
            {isExpanded ? "View more" : "View less"}
          </Typography>
        </Box>
      </Box>

      {/* {isExpanded && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>{renderLabel("Main Information")}</Box>
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

          <Box>Collapsed view</Box>
        </>
      )} */}
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
  );
}
