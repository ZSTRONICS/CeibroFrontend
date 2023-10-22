// mui
import { Box, Button, Grid } from "@mui/material";

// components
import { CustomStack, SubHeadingTag, SubLabelTag } from "components/CustomTags";
import NameAvatar from "components/Utills/Others/NameAvatar";
import SvgIcon from "components/material-ui/icons/CustomSvgIcon/SvgIcon";
import { UserCeibroData } from "constants/interfaces/user.interface";
import useResponsive from "hooks/useResponsive";
import ViewProfile from "./ViewProfile";

interface IConnectionsProps {
  style: any;
  isCeiborUser: boolean;
  firstName: string;
  surName: string;
  isBlocked: boolean;
  companyName: string | undefined;
  profilePic: string | undefined;
  ceibroUserData: UserCeibroData | undefined;
  listIndex: any;
}

const ConnectionCard = ({
  style,
  companyName,
  isCeiborUser,
  isBlocked,
  profilePic,
  firstName,
  surName,
  listIndex,
  ceibroUserData,
}: IConnectionsProps) => {
  const isTabOrMobile = useResponsive("down", "sm", "");
  const iconColor = isBlocked ? "red" : isCeiborUser ? "#F1B740" : "#818181";

  const listCards = Array.from(
    document.querySelectorAll(".listCard")
  ) as HTMLElement[];

  if (isTabOrMobile && listCards) {
    listCards.forEach((element: HTMLElement) => {
      element.style.position = "relative";
    });
  }

  return (
    <div style={style} className="listCard" id={listIndex}>
      <Grid
        container
        justifyContent="space-between"
        sx={{ borderBottom: "1px solid #E2E4E5", py: 1, px: 1, rowGap: 2.4 }}
      >
        <Grid item xs={12} md={7}>
          <CustomStack gap={1} justifyContent="space-between">
            <Box sx={{ display: "flex", gap: 1.4 }}>
              <NameAvatar
                url={profilePic || ""}
                firstname={firstName}
                surname={surName}
              />
              <div>
                <SubHeadingTag sx={{ color: "#0075D0" }}>
                  {`${firstName} ${surName}`}
                </SubHeadingTag>
                <SubLabelTag>{`Company: ${companyName ? companyName : "N/A"
                  }`}</SubLabelTag>
              </div>
            </Box>
            {isTabOrMobile && (
              <Box>
                <SvgIcon color={iconColor}>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.41315 18.0042L12.6792 23.9264L22.1867 18.4239L20.6897 15.8259L12.6792 20.469L5.40713 16.2722L5.40047 7.86527L12.6659 3.65513L20.6897 8.29162L22.1801 5.69359L12.6659 0.197754L2.40649 6.13325L2.41315 18.0042ZM7.29665 15.1731L12.6792 18.2774L17.2965 15.5928L15.7929 13.0081L12.6792 14.8134L10.2906 13.4411V10.6898L12.6725 9.31753L15.7929 11.1162L17.2965 8.52479L12.6659 5.85349L7.29665 8.9578V15.1731Z"
                  />
                </SvgIcon>
              </Box>
            )}
          </CustomStack>
        </Grid>
        <Grid item md={5} xs={12}>
          <CustomStack gap={2.4} justifyContent="flex-end">
            {!isTabOrMobile && (
              <SvgIcon color={iconColor}>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.41315 18.0042L12.6792 23.9264L22.1867 18.4239L20.6897 15.8259L12.6792 20.469L5.40713 16.2722L5.40047 7.86527L12.6659 3.65513L20.6897 8.29162L22.1801 5.69359L12.6659 0.197754L2.40649 6.13325L2.41315 18.0042ZM7.29665 15.1731L12.6792 18.2774L17.2965 15.5928L15.7929 13.0081L12.6792 14.8134L10.2906 13.4411V10.6898L12.6725 9.31753L15.7929 11.1162L17.2965 8.52479L12.6659 5.85349L7.29665 8.9578V15.1731Z"
                />
              </SvgIcon>
            )}
            <Button
              size={isTabOrMobile ? "small" : "medium"}
              variant="contained"
            >
              Create task
            </Button>

            <ViewProfile
              disabled={!isCeiborUser}
              userId={ceibroUserData?._id}
              userData={ceibroUserData}
            />
          </CustomStack>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConnectionCard;
