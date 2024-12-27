interface HeroPhotoI {
  src: string;
}

export default function HeroPhoto({ src }: HeroPhotoI) {
  return (
    <div className="hero-photo">
      <img src={src} alt="Main photo" className="hero-photo__img" />
      <p className="hero-photo__description">
        <span>Przykładowe zdjęcie</span>
        <span className="hero-photo__description__separate"></span>
      </p>
    </div>
  );
}
