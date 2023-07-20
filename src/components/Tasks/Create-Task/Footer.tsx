import * as React from "react";
import Button from "@mui/material/Button";

function Footer() {
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
      const file = event.target.files[0];
      console.log("Selected PDF file:", file);
    };
    input.click();
  };

  const handleAttachImage = () => {
    // Code to handle attaching an image file
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      console.log("Selected image file:", file);
    };
    input.click();
  };

  const handleRightArrowClick = () => {
    // Placeholder function for the right arrow button
    console.log("Right Arrow button clicked");
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
        width: "100%",
      }}
    >
      <Button
        variant="text"
        sx={{ textTransform: "capitalize" }}
        onClick={handleSelectDocument}
      >
        Location
      </Button>
      <Button
        variant="text"
        sx={{ textTransform: "capitalize" }}
        onClick={handleSelectDocument}
      >
        Document
      </Button>
      <Button
        variant="text"
        sx={{ textTransform: "capitalize" }}
        onClick={handleAttachImage}
      >
        Attach
      </Button>
      <Button
        variant="text"
        sx={{ textTransform: "capitalize" }}
        onClick={handleRightArrowClick}
      >
        Right Arrow
      </Button>
    </div>
  );
}

export default Footer;
