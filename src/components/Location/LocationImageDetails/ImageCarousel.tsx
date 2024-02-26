import Box from "@mui/material/Box";
import { PinImage } from "constants/interfaces";
import { ReactNode } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
interface ImageCarouselProps {
  images: PinImage[];
  handleChange?: ((index: number, item: ReactNode) => void) | undefined;
}

const ImageCarousel = ({ images, handleChange }: ImageCarouselProps) => {
  return (
    <div className="image-carousel">
      <Carousel
        showArrows={true}
        onChange={handleChange && handleChange}
        onClickItem={() => {}}
        onClickThumb={() => {}}
        showThumbs={false}
      >
        {images.map((image, index) => (
          <Box key={`img-${index}`}>
            <img src={image.fileUrl} />
          </Box>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
