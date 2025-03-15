"use client";
import Image from "next/image";
import React from "react";
import { ClipLoader } from "react-spinners";

interface ImgViewI {
  src: string | null;
  onClose: () => void;
}

export default function ImgView({ src, onClose }: ImgViewI) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
  }, [src]);

  const loadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {}, 2000);
  };

  React.useEffect(() => {
    console.log("status: ", isLoading);
  }, [isLoading]);

  return (
    <div className={`img-view ${!isLoading && "--isLoaded"}`}>
      {/* {isLoading && (
        <ClipLoader cssOverride={{ margin: "10px auto" }} size={50} />
      )} */}
      <div className="img-view__wrapper">
        {src ? (
          <Image
            className="img-view__photo"
            width={1500}
            height={1500}
            src={src}
            alt="Pełny widok zdjęcia"
            onLoad={loadingComplete}
            /* style={{ visibility: isLoading ? "hidden" : "visible" }} */
          />
        ) : (
          <p>Nie znaleziono zdjęcia</p>
        )}
      </div>
      <p className="img-view__close" onClick={() => onClose()}>
        {isLoading ? <ClipLoader size={10} /> : "Zamknij"}
      </p>
    </div>
  );
}
