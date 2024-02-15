import { CheckCircle, Circle } from "@mui/icons-material";
import { Box, Checkbox } from "@mui/material";
import React from "react";

interface AllImagesSliderProps {
  isStartExport: boolean;
}

const AllImagesSlider = ({ isStartExport }: AllImagesSliderProps) => {
  const allImages = [
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
    "https://react-responsive-carousel.js.org/assets/6.jpeg",
  ];

  const totalWidth = allImages.length * (135 + 10);

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          padding: "10px 16px",
        }}
      >
        <Box
          component="span"
          sx={{
            color: "#605C5C",
            fontSize: "12px",
            fontWeight: "500",
            lineHeight: "16px",
            marginBottom: "10px",
            display: "inline-block",
          }}
        >
          All Images
        </Box>
        <Box
          sx={{
            background: "#EBF5FB",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              overflowX: "auto",
              paddingBottom: "14px",
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
                    width: "135px",
                    height: "119px",
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
                      checked={true}
                      onChange={() => {}}
                      icon={<Circle sx={{ color: "white" }} />}
                      checkedIcon={<CheckCircle sx={{ color: "white" }} />}
                      sx={{
                        padding: 0,
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                      }}
                    />
                  )}
                  <img
                    src={image}
                    width="100%"
                    height="100%"
                    alt={`Image ${index + 1}`}
                  />
                  {/* <Radio
                    checked={selectedValue === "a"}
                    onChange={handleChange}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    sx={{
                      position:"absolute",
                      right:"0",
                      top:"0",
                    }}
                  /> */}
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
