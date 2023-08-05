// @ts-nocheck
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Box, IconButton, Typography } from "@mui/material";

interface ContactProps {
  isDisabled: boolean;
  contact: any;
  handleSelectedList: (contact: object, checked: boolean) => void;
}

export default function SelectedContactBox({
  contact,
  handleSelectedList,
  isDisabled,
}: ContactProps) {
  const {
    contactFirstName = "",
    contactFullName = "",
    contactSurName = "",
    isCeiborUser = "",
    userCeibroData = {},
  } = contact;

  let imageSrc: string = "";
  let placeholder: string = "";
  if (isCeiborUser && userCeibroData && userCeibroData.profilePic) {
    imageSrc = userCeibroData.profilePic;
  } else if (contact.profilePic) {
    imageSrc = contact.profilePic;
  } else {
    placeholder = contactFullName ? contactFullName.slice(0, 2) : "NA";
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        marginTop: "8px",
        marginBottom: "8px",
        pointerEvents: `${isDisabled ? "none" : ""}`,
        opacity: `${isDisabled ? "0.5" : "1"}`,
      }}
      key={contact.contactFullName + 1}
    >
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
      {!isDisabled && (
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
            backgroundColor: "#0076C8",
            color: "#fff",
            width: "16px",
            height: "16px",
          }}
          disableRipple
        >
          <ClearOutlinedIcon sx={{ width: "16px", height: "16px" }} />
        </IconButton>
      )}
    </Box>
  );
}
