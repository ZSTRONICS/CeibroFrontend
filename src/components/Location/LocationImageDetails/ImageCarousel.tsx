import Box from "@mui/material/Box";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  return (
    <div className="image-carousel">
      <Carousel
        showArrows={true}
        onChange={() => {}}
        onClickItem={() => {}}
        onClickThumb={() => {}}
        showThumbs={false}
      >
        {images.map((image, index) => (
          <Box key={`img-${index}`}>
            <img src={image} />
          </Box>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
