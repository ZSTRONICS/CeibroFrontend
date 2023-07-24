import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";
import NameAvatar from "../Others/NameAvatar";
import { SubHeadingTag, SubLabelTag } from "components/CustomTags";

interface IProps {
  profilePic: string;
  firstName: string;
  surName: string;
  contactFullName: string;
  companyName: string;
}

export default function ContactBox(props: IProps) {
  const { profilePic, firstName, surName, contactFullName, companyName } =
    props;
  return (
    <Box sx={{ display: "flex", gap: 1.4 }}>
      <Checkbox />
      {profilePic ? (
        <img
          src={profilePic}
          alt={"profilePic"}
          style={{ width: "50px", height: "50px" }}
        />
      ) : (
        <Box
          sx={{
            width: "50px",
            height: "50px",
            bgcolor: "#F4F4F4", // You can set a placeholder background color here
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" color="text.primary">
            {"KR"}
          </Typography>
        </Box>
      )}
      {/* <NameAvatar
        url={profilePic || ""}
        firstname={firstName || ""}
        surname={surName || ""}
      /> */}
      <div>
        <SubHeadingTag sx={{ color: "#000" }}>
          {contactFullName || "Kristo"}
        </SubHeadingTag>
        <SubLabelTag>{`${companyName || "N/A"}`}</SubLabelTag>
      </div>
      <Box></Box>
    </Box>
  );
}
