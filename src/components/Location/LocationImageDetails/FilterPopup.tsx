import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import CustomDateRangePicker from "./DateRangePicker";
import ImageUserDropdown from "./ImageUserDropdown";
import SortByDropdown from "./SortByDropdown";
interface IProps {
  handleChangeValues: any;
  ShowPopup: boolean;
}
const FilterPopup = (props: IProps) => {
  const { handleChangeValues, ShowPopup } = props;
  console.log(ShowPopup, "ShowPopup....");
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "80px",
            padding: "16px",
            borderBottom: "1px solid #818181",
            marginBottom: "10px",
            "@media(max-width:1600px)": {
              gap: "20px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              width: "calc(100% - 47px)",
            }}
          >
            <ImageUserDropdown maxWidth={"180px"} label={"User"} type="user" />
            <ImageUserDropdown maxWidth={"180px"} label={"Tags"} type="tag" />

            <CustomDateRangePicker />
            <SortByDropdown />
          </Box>
          {!ShowPopup ? (
            <Button
              style={{
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
              }}
            >
              Clear all
            </Button>
          ) : (
            ""
          )}
        </Box>
        {ShowPopup ? (
          <Button
            sx={{ border: "none", marginTop: "25px" }}
            variant="outlined"
            startIcon={<AddIcon />}
          >
            ADD FILTER
          </Button>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default FilterPopup;
