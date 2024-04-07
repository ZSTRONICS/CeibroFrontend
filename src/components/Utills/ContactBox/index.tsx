import Checkbox from "@mui/material/Checkbox";
import { CustomStack, SubHeadingTag, SubLabelTag } from "components/CustomTags";
import { Contact } from "constants/interfaces";
import NameAvatar from "../Others/NameAvatar";

interface IProps {
  contact: Contact;
  handleSelectedList: (contact: Contact, checked: boolean) => void;
  selected: boolean;
  isDisabled?: boolean;
}

export default function ContactBox({
  contact,
  handleSelectedList,
  selected,
  isDisabled,
}: IProps) {
  const { _id, contactFirstName, contactSurName, userCeibroData } = contact;

  const handleCheckBox = (checked: boolean) => {
    handleSelectedList(contact, checked);
  };
  const displayText = userCeibroData?.jobTitle
    ? `${userCeibroData?.companyName || ""} . ${userCeibroData?.jobTitle}`
    : `${userCeibroData?.companyName || ""}`;
  return (
    <CustomStack
      key={_id + "ContactBox"}
      sx={{
        display: "flex",
        gap: 1.4,
        marginBottom: "8px",
        marginTop: "8px",
        cursor: `${!isDisabled ? "pointer" : "not-allowed"}`,
        pointerEvents: `${isDisabled ? "none" : ""}`,
        opacity: `${isDisabled ? "0.5" : "1"}`,
      }}
      onClick={(e: any) => handleCheckBox(!selected)}
    >
      <Checkbox
        checked={selected}
        sx={{
          "&.MuiCheckbox-root": {
            color: "black",
          },
          "&.Mui-checked": {
            color: "#0076C8 !important",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      />
      <NameAvatar
        url={userCeibroData?.profilePic || ""}
        firstname={contactFirstName}
        surname={contactSurName}
      />
      <div>
        <SubHeadingTag sx={{ color: "#000" }}>
          {`${contactFirstName} ${contactSurName}`}
        </SubHeadingTag>
        <SubLabelTag>{`${displayText}`}</SubLabelTag>
      </div>
    </CustomStack>
  );
}
