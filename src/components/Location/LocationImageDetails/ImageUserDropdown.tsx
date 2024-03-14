import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import SearchWithButton from "./SearchWithButton";
import UserImageCard from "./UserImageCard";

interface ImageUserDropdownProps {
  maxWidth: string;
  label: string;
  type: "user" | "tag";
  ShowPop?: Boolean;
  LocationImageDetail?: Boolean;
  isSmall?: Boolean;
  data: UserInfo[];
  handleChangeValues: (
    typ: "user" | "tag",
    value: UserInfo | string,
    checked: boolean
  ) => void;
  selectedList: UserInfo[];
  isSmallScreen?: Boolean;
}

const ImageUserDropdown = ({
  maxWidth,
  label,
  type,
  ShowPop,
  LocationImageDetail,
  isSmall,
  selectedList,
  data,
  handleChangeValues,
}: ImageUserDropdownProps) => {
  const theme = useTheme();
  const isCustomScreen = useMediaQuery(theme.breakpoints.between(960, 1200));

  const handleChange = (event: SelectChangeEvent) => {
    // setUser(event.target.value as string);
  };

  const handleSearch = (searchText: string) => {};

  const handleSelectedList = (user: UserInfo, checked: boolean) => {
    handleChangeValues(type, user, checked);
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: maxWidth }}>
        <FormControl sx={{ width: "100%" }} size="small">
          <InputLabel
            id="demo-simple-select-label"
            // sx={{ paddingRight: isCustomScreen ? "15px" : null }}
            sx={{
              paddingRight: LocationImageDetail ? "4px" : null,
              backgroundColor: "white",
              paddingLeft: "4px",
              width: "max-content",
            }}
          >
            {type === "user"
              ? !isSmall
                ? "Select User"
                : "User"
              : !isSmall
              ? "Select Tag"
              : "Tag"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            label={"jhsaghjfasghjdfgjasj"}
            sx={{
              color: "black",
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                border: ShowPop ? "none !important" : "",
              },
            }}
          >
            <SearchWithButton
              handleSearch={handleSearch}
              searchText=""
              handleDone={() => {}}
            />
            {type === "user" &&
              data &&
              data.map((item, index) => {
                return (
                  <>
                    <UserImageCard
                      key={`img-user-card${index}`}
                      user={item}
                      handleSelectedList={handleSelectedList}
                      selected={selectedList?.some(
                        (user) => user._id === item._id
                      )}
                      showImage={true}
                    />
                  </>
                );
              })}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default ImageUserDropdown;
