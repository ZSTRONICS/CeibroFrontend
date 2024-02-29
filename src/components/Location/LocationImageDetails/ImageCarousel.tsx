import Box from "@mui/material/Box";
import { PinImage } from "constants/interfaces";
import { ReactNode } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
interface ImageCarouselProps {
  images: PinImage[];
  locationimgdetail: boolean;
  handleChange?: ((index: number, item: ReactNode) => void) | undefined;
}

const ImageCarousel = ({
  images,
  handleChange,
  locationimgdetail,
}: ImageCarouselProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "max-content",
      }}
      className="image-carousel"
    >
      <Carousel
        showArrows={true}
        onChange={handleChange && handleChange}
        onClickItem={() => {}}
        onClickThumb={() => {}}
        showThumbs={false}
      >
        {images.map((image, index) => (
          <Box
            sx={{
              width: "100%",
              height: "31vh",
              background: " #f8f8f8",
              borderRadius: "10px",
            }}
            key={`img-${index}`}
          >
            <img
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              src={image.fileUrl}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
