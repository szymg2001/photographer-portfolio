import Link from "next/link";
import "@/styles/homepage/navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <p className="navbar__heading">Magdalena Pęcak</p>
      <Link className="navbar__link" href="/portfolio">
        Portfolio
      </Link>
      <Link className="navbar__link" href="/#contact-section">
        Kontakt
      </Link>
    </div>
  );
}
