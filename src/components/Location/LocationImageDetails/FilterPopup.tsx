import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import CustomDateRangePicker from "./DateRangePicker";
import SortByDropdown from "./SortByDropdown";
import { default as TagListDropdown } from "./TagsDropdown";
import UserListDropdown from "./UserListDropdown";
interface IProps {
  handleChangeValues: (
    typ: "user" | "tag",
    value: UserInfo | string,
    checked: boolean
  ) => void;
  ShowPopup?: boolean;
  isSmall?: boolean;
  handlePopUpClose?: () => void;
  users: UserInfo[];
  tags: string[];
  selectedUser: UserInfo[];
  selectedTags: string[];
}
const FilterPopup = (props: IProps) => {
  const {
    handleChangeValues,
    ShowPopup,
    handlePopUpClose,
    users,
    tags,
    selectedUser,
    selectedTags,
    isSmall,
  } = props;
  const AllInputsFilds = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "80px",
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
            gap: "16px",
            alignItems: "center",
            width: "calc(100% - 0px)",
            borderBottom: ShowPopup ? "solid 1px #818181" : "none",
          }}
        >
          <UserListDropdown options={users ?? []} />
          <TagListDropdown options={tags ?? []} />
          {/* <ImageUserDropdown
            ShowPop={ShowPopup}
            maxWidth={"180px"}
            label={"user"}
            type="user"
            data={users}
            LocationImageDetail={true}
            isSmall={isSmall}
            handleChangeValues={handleChangeValues}
            selectedList={selectedUser}
          /> */}
          {/* <TagsDropdown
            ShowPop={ShowPopup}
            maxWidth={"180px"}
            label={"tags"}
            tags={tags}
            LocationImageDetail={true}
            handleChangeValues={handleChangeValues}
            selectedList={selectedTags}
          /> */}
          {/* <ImageUserDropdown
            ShowPop={ShowPopup}
            maxWidth={"180px"}
            label={"tags"}
            type="tag"
            data={tags}
            LocationImageDetail={true}
            isSmall={isSmall}
            handleChangeValues={handleChangeValues}
            selectedList={selectedTags}
          /> */}
          <CustomDateRangePicker ShowPop={ShowPopup} ImageDetail={true} />
          {ShowPopup ? null : <SortByDropdown ShowPop={ShowPopup} />}
        </Box>
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
