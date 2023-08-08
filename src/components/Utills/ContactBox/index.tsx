import { Box, Checkbox, Typography } from "@mui/material";
import { SubHeadingTag, SubLabelTag } from "components/CustomTags";

interface IProps {
  contact: any[];
  handleSelectedList: (contact: object, checked: boolean) => void;
  selected: boolean;
  isDisabled?: boolean;
}

export default function ContactBox({
  contact,
  handleSelectedList,
  selected,
  isDisabled,
}: IProps) {
  const {
    _id,
    contactFirstName = "",
    contactFullName = "",
    contactSurName = "",
    isCeiborUser = "",
    userCeibroData = {},
  } = contact;
  console.log("isDisabled", isDisabled);
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
      sx={{
        display: "flex",
        gap: 1.4,
        marginBottom: "8px",
        marginTop: "8px",
        cursor: `${!isDisabled ? "pointer" : "not-allowed"}`,
        pointerEvents: `${isDisabled ? "none" : ""}`,
        opacity: `${isDisabled ? "0.5" : "1"}`,
      }}
      onClick={(e) => handleCheckBox(!selected)}
    >
      <Checkbox
        checked={selected}
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
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
