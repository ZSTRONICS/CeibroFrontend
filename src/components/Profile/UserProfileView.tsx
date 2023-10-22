import { Avatar, Divider, Grid } from "@mui/material";
import { DocumentNameTag, SubLabelTag } from "components/CustomTags";
import { UserCeibroData } from "constants/interfaces/user.interface";

interface Props {
  userData: UserCeibroData | null | undefined;
}

function UserProfileView({ userData }: Props) {
  let smPoint = 11;
  const avatarLetter =
    userData?.firstName &&
    userData.firstName?.[0]?.toUpperCase?.() +
    (userData.surName?.[0]?.toUpperCase?.() || "");

  return (
    <>
      <Grid container justifyContent="center" pb={2} p={2.5}>
        <Grid item container justifyContent="center">
          <Grid item md={3}>
            {userData?.profilePic ? (
              <Avatar
                alt="avater"
                src={userData?.profilePic}
                variant="rounded"
                sx={{ width: "100px", height: "100px" }}
              />
            ) : (
              <Avatar
                variant="rounded"
                sx={{ width: "100px", height: "100px" }}
              >
                {avatarLetter}
              </Avatar>
            )}
          </Grid>
          <Grid
            item
            container
            flexDirection="column"
            md={9}
            pl={2}
            sm={smPoint}
            rowGap={1.5}
          >
            <Grid item sx={{ marginTop: "5px" }}>
              <SubLabelTag>Name</SubLabelTag>
              <DocumentNameTag
                sx={{ wordWrap: "break-word", wordBreak: "break-all", maxWidth: "250px" }}
              >
                {userData?.firstName || "N/A"}
              </DocumentNameTag>
            </Grid>

            <Grid item>
              <SubLabelTag>Surname</SubLabelTag>
              <DocumentNameTag
                sx={{ wordWrap: "break-word", wordBreak: "break-all", maxWidth: "250px" }}
              >
                {userData?.surName || "N/A"}
              </DocumentNameTag>
            </Grid>
            <Grid item>
              <SubLabelTag>Email</SubLabelTag>
              <DocumentNameTag
                sx={{
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                  maxWidth: "280px",
                  color: "#0075D0",
                }}
              >
                {userData?.email || "N/A"}
              </DocumentNameTag>
            </Grid>
            <Grid item>
              <SubLabelTag>Contact number</SubLabelTag>
              <DocumentNameTag
                sx={{ wordWrap: "break-word", wordBreak: "break-all", maxWidth: "250px" }}
              >
                {userData?.phoneNumber || "N/A"}
              </DocumentNameTag>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2.5, width: "100%" }} />
      </Grid>
    </>
  );
}

export default UserProfileView;
