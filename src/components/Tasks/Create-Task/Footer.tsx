import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { Box } from "@mui/material";
import CustomButton from "components/Utills/CustomButton";
import {
  isValidDocumentType,
  isValidImageType,
  validTypes,
} from "components/Utills/Globals";
import _ from "lodash";
import { toast } from "react-toastify";

interface FooterPropsType {
  handleSubmitForm: () => void;
  handleAttachImageValue?: (file: File[]) => void;
  handleSelectDocumentValue?: (file: File[]) => void;
  handleGetLocationValue?: () => void;
  showHeader: boolean | undefined;
  disabled: boolean;
  isSubmitted: boolean;
}

const Footer = (props: FooterPropsType) => {
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  };

  const handleSelectDocument = () => {
    // Code to handle selecting a PDF file from the system
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = validTypes.join(", ");
    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && !_.isEmpty(files)) {
        const validFiles = Array.from(files).filter((file) =>
          isValidDocumentType(file.type)
        );
        if (!_.isEmpty(validFiles)) {
          props.handleSelectDocumentValue &&
            props.handleSelectDocumentValue(validFiles);
        } else {
          toast.error("Please select a valid document file");
        }
      }
    };
    input.click();
  };

  const handleAttachImage = () => {
    // Code to handle attaching an image file
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && !_.isEmpty(files)) {
        const validFiles = Array.from(files).filter((file) =>
          isValidImageType(file.type)
        );
        if (!_.isEmpty(validFiles)) {
          props.handleAttachImageValue &&
            props.handleAttachImageValue(validFiles);
        } else {
          toast.error("Please select a valid image file");
        }
      }
    };
    input.click();
  };
  const position: string = props.showHeader ? "block" : "fixed";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        zIndex: "50",
        background: "white",
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: `${
          props.showHeader ? "" : "0px -2px 6px rgba(0, 0, 0, 0.1)"
        }`,
        textTransform: "capitalize",
        position: `${position}`,
        marginTop: `${props.showHeader ? "20px" : "unset"}`,
        paddingBottom: `${props.showHeader ? "0" : "unset"}`,
        bottom: 0,
        left: 0,
        width: "100%",
        padding: "7px 0",
        height: "57px",
      }}
    >
      {props.handleGetLocationValue && (
        <CustomButton
          disabled
          label={"Location"}
          icon={<FmdGoodOutlinedIcon />}
          variant="outlined"
          onClick={handleGetLocation}
        />
      )}
      {props.handleSelectDocumentValue && (
        <CustomButton
          sx={{
            border: "none !important",
            "&:hover": {
              border: "0px solid transparent",
            },
          }}
          label={"Document"}
          icon={<InsertDriveFileOutlinedIcon />}
          variant="outlined"
          disabled={props.isSubmitted || false}
          onClick={handleSelectDocument}
        />
      )}
      {props.handleAttachImageValue && (
        <CustomButton
          sx={{
            border: "none !important",
            "&:hover": {
              border: "0px solid transparent",
            },
          }}
          label={"Attach"}
          icon={<AttachFileOutlinedIcon />}
          variant="outlined"
          disabled={props.isSubmitted || false}
          onClick={handleAttachImage}
        />
      )}
      <CustomButton
        sx={{
          border: "none !important",
          "&:hover": {
            border: "0px solid transparent",
          },
          "& .MuiButton-startIcon": {
            marginLeft: 0,
            marginRight: 0,
          },
        }}
        onClick={props.handleSubmitForm}
        icon={<ArrowForwardOutlinedIcon />}
        variant="contained"
        loading={props.isSubmitted}
        disabled={props.disabled || props.isSubmitted}
      />
    </Box>
  );
};

export default Footer;
