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
          // console.log("Selected image file:", file);
        } else {
          toast.error("Please select a valid image file");
        }
      }
    };
    input.click();
  };
  const position: string = props.showHeader ? "block" : "absolute";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        zIndex: "50",
        background: "white",
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
        padding: "8px 0",
        height: "55px",
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
          label={"Document"}
          icon={<InsertDriveFileOutlinedIcon />}
          variant="outlined"
          onClick={handleSelectDocument}
        />
      )}
      {props.handleAttachImageValue && (
        <CustomButton
          label={"Attach"}
          icon={<AttachFileOutlinedIcon />}
          variant="outlined"
          onClick={handleAttachImage}
        />
      )}
      <CustomButton
        onClick={props.handleSubmitForm}
        icon={<ArrowForwardOutlinedIcon />}
        variant="contained"
        disabled={props.disabled}
      />
    </Box>
  );
};

export default Footer;
