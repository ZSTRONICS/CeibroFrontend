import { Box, Checkbox } from "@mui/material";
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
      <NameAvatar
        url={profilePic || ""}
        firstname={firstName || ""}
        surname={surName || ""}
      />
      <div>
        <SubHeadingTag sx={{ color: "#0076C8" }}>
          {contactFullName || ""}
        </SubHeadingTag>
        <SubLabelTag>{`Company: ${companyName || "N/A"}`}</SubLabelTag>
      </div>
      <Box></Box>
    </Box>
  );
}
