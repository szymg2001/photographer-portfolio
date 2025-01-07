import Image from "next/image";

interface HeroPhotoI {
  src: string;
}

export default function HeroPhoto({ src }: HeroPhotoI) {
  return (
    <div className="hero-photo">
      <Image
        src={src}
        alt="Main photo"
        className="hero-photo__img"
        width={550}
        height={870}
      />
    </div>
  );
}
