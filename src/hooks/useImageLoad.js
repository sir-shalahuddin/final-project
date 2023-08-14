import { useState, useEffect } from "react";

function useImageLoad(src) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    image.addEventListener("load", handleImageLoad);

    return () => {
      image.removeEventListener("load", handleImageLoad);
    };
  }, [src]);

  return imageLoaded;
}

export default useImageLoad;