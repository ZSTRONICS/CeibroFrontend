import React, { useEffect, useState } from "react";
// import ImageViewer from "react-simple-image-viewer";

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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(currImg);
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
      {/* {isOpen && imgs.length > 0 && (
        <ImageViewer
          src={imgs}
          currentIndex={currentImageIndex}
          onClose={handleClose}
          disableScroll={true}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )} */}
    </>
  );
};

export default ImgsViewerSlider;
