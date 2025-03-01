import Image from "next/image";

interface ImgViewI {
  src: string;
  onClose: () => void;
}

export default function ImgView({ src, onClose }: ImgViewI) {
  return (
    <div className="img-view">
      <Image
        className="img-view__photo"
        width={1000}
        height={1000}
        src={src}
        alt="Pełny widok zdjęcia"
      />
      <p className="img-view__close" onClick={() => onClose()}>
        Zamknij
      </p>
    </div>
  );
}
