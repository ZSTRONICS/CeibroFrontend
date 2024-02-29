import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Dispatch, SetStateAction } from "react";
import CustomDateRangePicker from "./DateRangePicker";
import SortByDropdown from "./SortByDropdown";
import TagListDropdown from "./TagsDropdown";
import UserListDropdown from "./UserListDropdown";
interface IProps {
  ShowPopup?: boolean;
  isSmall?: boolean;
  handlePopUpClose?: () => void;
  users: UserInfo[];
  tags: string[];
  selectedUsers: UserInfo[];
  selectedTags: string[];
  setSelectedUsers: Dispatch<SetStateAction<UserInfo[]>>;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
}
const FilterPopup = (props: IProps) => {
  const {
    ShowPopup,
    handlePopUpClose,
    users,
    tags,
    selectedUsers,
    selectedTags,
    setSelectedTags,
    setSelectedUsers,
    isSmall,
  } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(960));

  const AllInputsFilds = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // gap: "80px",
          padding: "16px",
          borderBottom: !ShowPopup ? "1px solid #818181" : "none",
          "@media(max-width:1600px)": {
            gap: "20px",
            width: "100%",
          },
        }}
      >
        {ShowPopup ? <ClearIcon onClick={handlePopUpClose} /> : null}
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            justifyContent: "flex-start",
            gap: "16px",
            alignItems: "flex-start",
            width: ShowPopup ? "95%" : "90%",
            borderBottom: ShowPopup ? "solid 1px #818181" : "none",
          }}
        >
          <UserListDropdown
            isSmall={isSmall}
            options={users ?? []}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
          <TagListDropdown
            isSmall={isSmall}
            options={tags ?? []}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
          <CustomDateRangePicker ShowPop={ShowPopup} ImageDetail={true} />
          {ShowPopup ? null : <SortByDropdown ShowPop={ShowPopup} />}
        </Box>
        <Box
          sx={{
            width: "10%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {!ShowPopup ? (
            <Button
              sx={{
                fontSize: "12px",
                color: "#0076C8",
                fontWeight: "400",
                lineHeight: "175%",
                letterSpacing: "0.15px",
                padding: "0",
                textTransform: "unset",
                backgroundColor: "transparent",
                border: "none",
                width: "60px",
                transform: "translateX(10px)",
              }}
            >
              Clear all
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {ShowPopup ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {AllInputsFilds}
            </Box>
            <Button
              sx={{ border: "none", marginTop: "25px" }}
              variant="outlined"
              startIcon={<AddIcon />}
            >
              ADD FILTER
            </Button>
          </>
        ) : (
          AllInputsFilds
        )}
      </Box>
    </>
  );
};

export default FilterPopup;
