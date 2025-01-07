"use client";

import { useAppContext } from "@/lib/AppContext";
import React from "react";
import "@/styles/homepage/about.css";

export default function AboutPart() {
  const { getFolderImagesByName } = useAppContext();
  const photos = React.useMemo(() => getPhotos(), []);

  function getPhotos() {
    let photosArray = getFolderImagesByName("aboutPhotos");
    if (photosArray.length !== 2) {
      photosArray = Array(2)
        .fill(null)
        .map((_, index) =>
          photosArray[index]
            ? photosArray[index]
            : { id: "PLACEHOLDER", url: "https://placehold.co/600x800" }
        );
    }

    return photosArray;
  }

  return (
    <div className="about">
      <div className="about__images">
        {photos.map((p) => (
          <img className="about__image" src={p.url} alt={p.id} key={p.id} />
        ))}
      </div>
      <div className="about__text-container">
        <h6 className="about__title">Kim Jestem</h6>
        <p className="about__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          suscipit corrupti autem ipsa dolorem eum fuga quas? Perferendis sunt
          numquam cumque? Accusamus iste libero saepe dolorem harum repudiandae
          pariatur nam nisi cum eius eaque, aliquam minus repellendus at cumque
          adipisci illo molestias ipsum laudantium optio quos quas debitis
          incidunt. Suscipit!
        </p>
        <div className="contact-info about__contact-info">
          <img src="/mail.svg" className="contact-info__icon" />
          <p className="contact-info__text">emailadress@email.com</p>
        </div>
        <div className="contact-info about__contact-info">
          <img src="/phone.svg" className="contact-info__icon" />
          <p className="contact-info__text">+48 123 456 789</p>
        </div>
      </div>
    </div>
  );
}
