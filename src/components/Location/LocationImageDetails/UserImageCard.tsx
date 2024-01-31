import Checkbox from "@mui/material/Checkbox";
import { CustomStack, SubHeadingTag, SubLabelTag } from "components/CustomTags";
import NameAvatar from "components/Utills/Others/NameAvatar";

interface IProps {
  user: string;
  handleSelectedList: (contact: string, checked: boolean) => void;
  selected: boolean;
  isDisabled?: boolean;
  showImage?: boolean;
}

export default function UserImageCard({
  user,
  handleSelectedList,
  selected,
  isDisabled,
  showImage,
}: IProps) {
  const handleCheckBox = (checked: boolean) => {
    handleSelectedList(user, checked);
  };
  const displayText = "";
  return (
    <CustomStack
      key={user + "image-card"}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "8px",
        marginTop: "8px",
        cursor: `${!isDisabled ? "pointer" : "not-allowed"}`,
        pointerEvents: `${isDisabled ? "none" : ""}`,
        opacity: `${isDisabled ? "0.5" : "1"}`,
        padding: "0 16px",
      }}
      onClick={(e: any) => handleCheckBox(!selected)}
    >
      <Checkbox
        checked={selected}
        sx={{
          "&.MuiCheckbox-root": {
            color: "black",
            padding: "0",
          },
          "&.Mui-checked": {
            color: "#000 !important",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      />
      {showImage && <NameAvatar url={""} firstname={user} surname={user} />}
      <div>
        <SubHeadingTag
          sx={{
            color: "#000",
            fontWeight: "500 !important",
            lineHeight: "20px",
          }}
        >
          {`${user} ${user}`}
        </SubHeadingTag>
        <SubLabelTag>{`${displayText}`}</SubLabelTag>
      </div>
    </CustomStack>
  );
}
