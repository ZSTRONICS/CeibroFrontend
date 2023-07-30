import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";
import NameAvatar from "../Others/NameAvatar";
import { SubHeadingTag, SubLabelTag } from "components/CustomTags";

interface IProps {
  contact: any[];
  handleSelectedList: (contact: object, checked: boolean) => void;
  selected: boolean;
}

export default function ContactBox({
  contact,
  handleSelectedList,
  selected,
}: IProps) {
  const {
    _id,
    contactFirstName = "",
    contactFullName = "",
    contactSurName = "",
    isCeiborUser = "",
    userCeibroData = {},
  } = contact;

  let imgSrc: string = "";
  let placeholder: string = "";
  if (isCeiborUser && userCeibroData && userCeibroData.profilePic) {
    imgSrc = userCeibroData.profilePic;
  } else {
    placeholder = contactFullName ? contactFullName.slice(0, 2) : "NA";
  }

  const handleCheckBox = (checked: boolean) => {
    handleSelectedList(contact, checked);
  };

  return (
    <Box
      sx={{ display: "flex", gap: 1.4 }}
      onClick={(e) => handleCheckBox(!selected)}
    >
      <Checkbox
        onChange={(e, checked) => handleCheckBox(checked)}
        checked={selected}
      />
      {imgSrc ? (
        <img
          src={imgSrc}
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
            {placeholder}
          </Typography>
        </Box>
      )}
      <div>
        <SubHeadingTag sx={{ color: "#000" }}>
          {contactFullName || ""}
        </SubHeadingTag>
        <SubLabelTag>{`${
          (userCeibroData && userCeibroData.companyName) || "N/A"
        }`}</SubLabelTag>
      </div>
      <Box></Box>
    </Box>
  );
}
