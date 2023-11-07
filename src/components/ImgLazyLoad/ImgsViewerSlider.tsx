// @ts-nocheck
import React, { useEffect, useState } from "react";
import ImgsViewer from "react-images-viewer";

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currImg: number;
  imgs: any;
}
const ImgsViewerSlider: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  onClose,
  imgs,
  currImg,
}) => {
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(currImg);
  useEffect(() => {
    setCurrentImageIndex(currImg);
  }, [currImg]);

  const handleClose = () => {
    setLoadingError(false);
    setCurrentImageIndex(0);
    onClose();
  };

  const gotoPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgs.length - 1 : prevIndex - 1
    );
  };

  const gotoNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imgs.length - 1 ? 0 : prevIndex + 1
    );
  };
  // useEffect(() => {
  //   let loadingTimeout: NodeJS.Timeout;
  //   if (isOpen) {
  //     loadingTimeout = setTimeout(() => {
  //       setLoadingError(true);
  //       setTimeout(() => {
  //         handleClose();
  //       }, 3000);
  //     }, 10000);
  //   }

  //   return () => {
  //     clearTimeout(loadingTimeout);
  //   };
  // }, [isOpen]);
  return (
    <>
      {imgs.length > 0 && (
        <ImgsViewer
          imgs={imgs}
          currImg={currentImageIndex}
          isOpen={isOpen}
          onClose={handleClose}
          onClickPrev={gotoPrevious}
          onClickNext={gotoNext}
        />
      )}
    </>
  );
};

export default ImgsViewerSlider;
