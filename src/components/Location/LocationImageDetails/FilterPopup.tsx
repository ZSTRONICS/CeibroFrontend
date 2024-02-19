import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import CustomDateRangePicker from "./DateRangePicker";
import ImageUserDropdown from "./ImageUserDropdown";
import SortByDropdown from "./SortByDropdown";
interface IProps {
  handleChangeValues: any;
  ShowPopup?: boolean;
  handlePopUpClose?: () => void;
}
const FilterPopup = (props: IProps) => {
  const { handleChangeValues, ShowPopup, handlePopUpClose } = props;

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
            width: "calc(100% - 20px)",
            borderBottom: ShowPopup ? "solid 1px #818181" : "none",
          }}
        >
          <ImageUserDropdown
            ShowPop={ShowPopup}
            maxWidth={"180px"}
            label={"user"}
            type="user"
            LocationImageDetail={true}
          />
          <ImageUserDropdown
            ShowPop={ShowPopup}
            maxWidth={"180px"}
            label={"tags"}
            type="tag"
            LocationImageDetail={true}
          />
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
