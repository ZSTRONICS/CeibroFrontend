import React, { useEffect, useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  handleLoad?: () => void;
  maxWidth: any;
  imgZoomHandler?: boolean;
}

const ImageLazyLoad: React.FC<ImageProps> = ({
  src,
  alt,
  placeholder,
  handleLoad,
  imgZoomHandler,
  maxWidth,
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [zoomLevel, setZoomLevel] = useState(100);
  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    const handleObserver: IntersectionObserverCallback = (
      entries,
      observer
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(entry.target);
        }
      });
    };

    if (IntersectionObserver) {
      observer = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      });

      if (placeholder) {
        const lazyImage = document.getElementById("lazy-image");
        if (lazyImage) {
          observer.observe(lazyImage);
        }
      } else {
        setImageSrc(src);
      }
    } else {
      setImageSrc(src);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src, placeholder]);

  // const handleZoomIn = () => {
  //   setZoomLevel((prevZoom) => Math.min(prevZoom + 10, 200));
  // };

  // const handleZoomOut = () => {
  //   setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 50));
  // };

  // const handleZoomReset = () => {
  //   setZoomLevel(100);
  // };

  const imageStyles = {
    width: "100%",
    transform: `scale(${zoomLevel / 100})`,
    transition: "transform 0.3s ease-in-out", // Add smooth transition
  };
  return (
    <>
      {imgZoomHandler === true ? (
        <div style={{ maxWidth: maxWidth, margin: "0 auto" }}>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
              position: "relative",
              zIndex: "1000",
            }}
          >
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
            <button onClick={handleZoomReset}>Reset Zoom</button>
          </div> */}
          <img
            id="lazy-image"
            src={imageSrc}
            alt={alt}
            onLoad={handleLoad}
            style={imageStyles}
          />
        </div>
      ) : (
        <img id="lazy-image" src={imageSrc} alt={alt} onLoad={handleLoad} />
      )}
    </>
  );
};

export default ImageLazyLoad;
