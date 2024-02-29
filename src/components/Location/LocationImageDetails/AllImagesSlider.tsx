import { CheckCircle, Circle } from "@mui/icons-material";
import { Box, Checkbox } from "@mui/material";
import { PinImage } from "constants/interfaces";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import projectActions from "redux/action/project.action";

interface AllImagesSliderProps {
  isStartExport: boolean;
  allImages: PinImage[];
}

const AllImagesSlider = ({
  isStartExport,
  allImages,
}: AllImagesSliderProps) => {
  const totalWidth = allImages.length * (135 + 10);

  const dispatch = useDispatch();

  const [selectedImages, setSelectedImages] = React.useState<PinImage[]>([]);

  useEffect(() => {
    if (!isStartExport) {
      dispatch(projectActions.setExportList(selectedImages));
    }
  }, [isStartExport]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    image: PinImage
  ) => {
    let values = [...selectedImages];
    if (checked) {
      values.push(image);
      setSelectedImages(values);
    } else {
      const foundIndex = values.findIndex(
        (value: PinImage) => value._id == image._id
      );
      values.splice(foundIndex, 1);
      setSelectedImages(values);
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "0px 16px",
        }}
      >
        <Box
          component="span"
          sx={{
            color: "#605C5C",
            fontSize: "12px",
            fontWeight: "500",
            marginBottom: "5px",
            display: "inline-block",
          }}
        >
          All Images
        </Box>
        <Box
          sx={{
            background: "#EBF5FB",
            borderRadius: "8px",
            padding: "14px",
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              overflowX: "auto",
              paddingBottom: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: `${totalWidth}px`,
              }}
            >
              {allImages.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "120px",
                    height: "110px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    position: "relative",
                    "@media(max-width:1366px)": {
                      // width:"100px",
                      // height:"100px"
                    },
                  }}
                >
                  {isStartExport && (
                    <Checkbox
                      checked={selectedImages.some(
                        (item) => item._id == image._id
                      )}
                      onChange={(event, checked) =>
                        handleChange(event, checked, image)
                      }
                      icon={
                        <Circle
                          sx={{
                            borderRadius: "50%",
                            color: "white",
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                          }}
                        />
                      }
                      checkedIcon={<CheckCircle sx={{ color: "green" }} />}
                      sx={{
                        padding: 0,
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                      }}
                    />
                  )}
                  <img
                    src={image.fileUrl}
                    width="100%"
                    height="100%"
                    alt={`Image ${index + 1}`}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AllImagesSlider;
