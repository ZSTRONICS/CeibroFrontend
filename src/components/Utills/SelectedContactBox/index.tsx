import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import { Contact } from "constants/interfaces";

interface ContactProps {
  isDisabled: boolean;
  contact: Contact | any;
  handleSelectedList: (contact: Contact, checked: boolean) => void;
}

export default function SelectedContactBox({
  contact,
  handleSelectedList,
  isDisabled,
}: ContactProps) {
  const {
    contactFirstName,
    contactSurName,
    isCeiborUser,
    userCeibroData = {},
    _id,
  } = contact;

  let imageSrc: string = "";
  let placeholder: string = "";
  if (isCeiborUser && userCeibroData && userCeibroData.profilePic) {
    imageSrc = userCeibroData.profilePic;
  } else if (contact.profilePic) {
    imageSrc = contact.profilePic;
  } else {
    const firstInitial = contactFirstName ? contactFirstName[0] : "";
    const lastInitial = contactSurName ? contactSurName[0] : "";
    placeholder = `${firstInitial}${lastInitial}` || "NA";
  }

  return (
    !isDisabled && (
      <Box
        key={_id + "SelectedContactBox"}
        sx={{
          position: "relative",
          display: "inline-block",
          marginTop: "8px",
          marginBottom: "2px",
          marginRight: "8px",
          marginLeft: "4px",
          borderRadius: "6px",
          pointerEvents: `${isDisabled ? "none" : ""}`,
          opacity: `${isDisabled ? "0.5" : "1"}`,
        }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            bgcolor: "#F4F4F4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`profilePic`}
              style={{ width: "50px", height: "50px" }}
            />
          ) : (
            <Typography variant="body1" color="text.primary">
              {placeholder}
            </Typography>
          )}
        </Box>
        <IconButton
          aria-label="delete"
          onClick={(e) => {
            e.stopPropagation();
            handleSelectedList(contact, false);
          }}
          sx={{
            position: "absolute",
            bottom: "-4px",
            right: "-6px",
            backgroundColor: "#0075D0",
            color: "#fff",
            width: "16px",
            height: "16px",
          }}
          disableRipple
        >
          <ClearOutlinedIcon sx={{ width: "16px", height: "16px" }} />
        </IconButton>
      </Box>
    )
  );
}
