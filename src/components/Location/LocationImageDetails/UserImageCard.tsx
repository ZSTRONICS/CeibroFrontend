import Checkbox from "@mui/material/Checkbox";
import { CustomStack, SubHeadingTag } from "components/CustomTags";
import NameAvatar from "components/Utills/Others/NameAvatar";

interface IProps {
  user: UserInfo;
  handleSelectedList: (user: UserInfo, checked: boolean) => void;
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
  return (
    <CustomStack
      key={user._id + "image-card"}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "8px",
        marginTop: "8px",
        cursor: `${!isDisabled ? "pointer" : "not-allowed"}`,
        pointerEvents: `${isDisabled ? "none" : ""}`,
        opacity: `${isDisabled ? "0.5" : "1"}`,
        // padding: "0 16px",
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
      {showImage && (
        <NameAvatar
          url={""}
          firstname={user.firstName}
          surname={user.surName}
        />
      )}
      <div>
        <SubHeadingTag
          sx={{
            color: "#000",
            fontWeight: "500 !important",
            lineHeight: "20px",
          }}
        >
          {`${user.firstName} ${user.surName}`}
        </SubHeadingTag>
        {/* <SubLabelTag>{`${displayText}`}</SubLabelTag>
        <SubLabelTag>{`${displayText}`}</SubLabelTag> */}
      </div>
    </CustomStack>
  );
}
