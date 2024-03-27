import React, { useState } from "react";
import { PhotoSlider } from "react-photo-view";

interface ImagePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  currImg: number;
  imgs: any;
}
const ImagePhotoViewer: React.FC<ImagePreviewProps> = (props) => {
  const { isOpen, onClose, currImg, imgs } = props;
  const [index, setIndex] = useState(currImg || 0);
  return (
    <PhotoSlider
      toolbarRender={({ onScale, scale }) => {
        return (
          <>
            <svg
              className="PhotoView-Slider__toolbarIcon"
              width="44"
              height="44"
              viewBox="0 0 768 768"
              fill="white"
              onClick={() => onScale(scale + 0.5)}
            >
              <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
            </svg>

            <svg
              className="PhotoView-Slider__toolbarIcon"
              width="44"
              height="44"
              viewBox="0 0 768 768"
              fill="white"
              onClick={() => onScale(scale - 0.5)}
            >
              <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z" />
            </svg>
          </>
        );
      }}
      images={imgs.map((item: string) => ({ src: item, key: item }))}
      index={index}
      onClose={onClose}
      visible={isOpen}
      onIndexChange={setIndex}
    />
  );
};

export default ImagePhotoViewer;
