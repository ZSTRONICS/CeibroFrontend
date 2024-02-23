import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { Box } from "@mui/material";
import { LoadingButton } from "components/Button";
import { CustomStack } from "components/CustomTags";
import CustomButton from "components/Utills/CustomButton";
import { isValidDocumentType, validTypes } from "components/Utills/Globals";
import _ from "lodash";

interface FooterPropsType {
  handleSubmitForm: () => void;
  handleAttachImageValue?: (file: File[]) => void;
  handleSelectDocumentValue?: (file: File[]) => void;
  handleGetLocationValue?: () => void;
  handleClose: () => void;
  isCommentUi?: boolean;
  isForwardUi?: boolean;
  acceptImgOnly?: boolean;
  FooterPosition?: "fixed" | "reletive" | "absolute" | "sticky";
  showHeader: boolean;
  disabled: boolean;
  isSubmitted: boolean;
}

const Footer = (props: FooterPropsType) => {
  const { FooterPosition, acceptImgOnly } = props;
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
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = acceptImgOnly ? "image/*" : validTypes.join(", ");
    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && !_.isEmpty(files)) {
        const attachments = Array.from(files).filter((file) =>
          file.type.startsWith("image/")
        );
        const validFiles = Array.from(files).filter((file) =>
          isValidDocumentType(file.type)
        );
        if (attachments.length > 0) {
          props.handleAttachImageValue &&
            props.handleAttachImageValue(attachments);
        }
        if (!_.isEmpty(validFiles)) {
          props.handleSelectDocumentValue &&
            props.handleSelectDocumentValue(validFiles);
        } else {
          // toast.error("Please select a valid document file");
        }
      }
    };
    input.click();
  };

  // const handleAttachImage = () => {
  //   // Code to handle attaching an image file
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*";
  //   input.multiple = true;
  //   input.onchange = (event) => {
  //     const files = (event.target as HTMLInputElement).files;
  //     if (files && !_.isEmpty(files)) {
  //       const validFiles = Array.from(files).filter((file) =>
  //         isValidImageType(file.type)
  //       );
  //       if (!_.isEmpty(validFiles)) {
  //         props.handleAttachImageValue &&
  //           props.handleAttachImageValue(validFiles);
  //       } else {
  //         toast.error("Please select a valid image file");
  //       }
  //     }
  //   };
  //   input.click();
  // };
  const handleClick = () => {
    props.handleClose();
  };

  const position: string = props.showHeader
    ? "absolute"
    : (FooterPosition && FooterPosition) || "fixed";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        zIndex: "15",
        alignItems: "center",
        background: "white",
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: `${
          props.showHeader ? "0px -2px 6px rgba(0, 0, 0, 0.1)" : "none"
        }`,
        textTransform: "capitalize",
        position: `${position}`,
        paddingBottom: `${props.showHeader ? "0" : "unset"}`,
        bottom: 0,
        left: 0,
        width: "100%",
        gap: 1,
        padding: "7px 14px",
        height: "57px",
        pr: "3%",
      }}
    >
      {props.isCommentUi ? (
        <>
          <LoadingButton
            color="error"
            variant="outlined"
            onClick={handleClick}
            sx={{
              fontSize: "12px",
              borderRadius: "4px",
              fontWeight: "700",
              border: "1px solid #FA0808",
              padding: "2px 16px",
              color: "#D9000D",
              maxWidth: "100px",
              maxHeight: "30px",
            }}
          >
            Cancel
          </LoadingButton>
        </>
      ) : (
        <>
          {props.handleGetLocationValue && (
            <CustomButton
              sx={{ opacity: 0 }}
              disabled
              label={"Location"}
              icon={<FmdGoodOutlinedIcon />}
              variant="outlined"
              onClick={handleGetLocation}
            />
          )}
          {/* {props.handleSelectDocumentValue && (
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
          )} */}
        </>
      )}
      <CustomStack sx={{ gap: 5 }}>
        {!props.isForwardUi && props.handleSelectDocumentValue && (
          <CustomButton
            sx={{
              border: "none !important",
              flexDirection: "column",
              textTransform: "capitalize",

              padding: "2px",

              "&:hover": {
                border: "0px solid transparent",
              },
              span: {
                marginRight: "0px",
              },
            }}
            label={"Attach"}
            icon={<AttachFileOutlinedIcon />}
            variant="outlined"
            disabled={props.isSubmitted || false}
            onClick={handleSelectDocument}
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
      </CustomStack>
    </Box>
  );
};

export default Footer;
