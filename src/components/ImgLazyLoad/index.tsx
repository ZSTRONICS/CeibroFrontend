import React, { useState, useEffect } from "react";

interface ImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  handleLoad?:()=>void
}

const ImageLazyLoad: React.FC<ImageProps> = ({ src, alt, placeholder,handleLoad }) => {
  const [imageSrc, setImageSrc] = useState(placeholder);

  useEffect(() => {
    let observer: IntersectionObserver;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(entry.target as Element);
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
        observer.observe(document.getElementById("lazy-image") as Element);
      } else {
        setImageSrc(src);
      }
    } else {
      setImageSrc(src);
    }

    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(document.getElementById("lazy-image") as Element);
      }
    };
  }, [src, placeholder]);

  return <img id="lazy-image" src={imageSrc} alt={alt} onLoad={handleLoad}/>;
};

export default ImageLazyLoad;
