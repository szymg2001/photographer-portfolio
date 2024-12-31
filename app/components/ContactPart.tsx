import CornerBox from "./CornerBox";

export default function ContactPart() {
  return (
    <div className="contact-part">
      <CornerBox>
        <div className="contact-part__wrapper">
          <h6 className="contact-part__title">Want to work together?</h6>
          <img src="/chat.svg" className="contact-part__icon" />
          <p className="contact-part__text">Let's talk!</p>
          <p className="contact-part__subtitle">Available entire Poland</p>
          <div className="contact-part__contact-details">
            <div className="contact-info">
              <img src="/mail.svg" className="contact-info__icon" />
              <p className="contact-info__text">emailadress@email.com</p>
            </div>
            <div className="contact-info">
              <img src="/phone.svg" className="contact-info__icon" />
              <p className="contact-info__text">+48 123 456 789</p>
            </div>
          </div>
        </div>
      </CornerBox>
    </div>
  );
}
