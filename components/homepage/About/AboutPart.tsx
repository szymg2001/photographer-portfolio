import "@/styles/homepage/about.css";
import AboutImages from "./AboutImages";
import AboutTitle from "./AboutTitle";

export default function AboutPart() {
  return (
    <div className="about">
      <AboutImages />
      <div className="about__text-container">
        <AboutTitle />
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
