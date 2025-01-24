import Link from "next/link";
import "@/styles/footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <h6 className="footer__title">Magdalena Pęcak</h6>
      <div className="footer__nav-wrapper">
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/#contact-section">Contact</Link>
      </div>
      <div className="footer__media">
        <img src={"/facebook.svg"} className="footer__media__button" />
        <img src={"/insta.svg"} className="footer__media__button" />
      </div>
      <p className="footer__copy">© 2024</p>
    </div>
  );
}
