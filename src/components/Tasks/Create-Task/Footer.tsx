import * as React from "react";
import Button from "@mui/material/Button";
import CustomButton from "components/Utills/CustomButton";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

interface FooterPropsType {
  handleSubmitForm: () => void;
  handleAttachImageValue?: (file: File) => void;
  handleSelectDocumentValue?: (file: File) => void;
  handleGetLocationValue?: () => void;
}

const Footer = (props: FooterPropsType) => {
  const handleGetLocation = () => {
    // Code to get user's location
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
    input.accept = "application/pdf";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      console.log("Selected PDF file:", file);
      props.handleSelectDocumentValue &&
        file &&
        props.handleSelectDocumentValue(file);
    };
    input.click();
  };

  const handleAttachImage = () => {
    // Code to handle attaching an image file
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      console.log("Selected image file:", file);
      props.handleAttachImageValue &&
        file &&
        props.handleAttachImageValue(file);
    };
    input.click();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.1)",
        textTransform: "capitalize",
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        padding: "8px",
      }}
    >
      {props.handleGetLocationValue && (
        <CustomButton
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
      />
    </div>
  );
};

export default Footer;
