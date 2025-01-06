import Link from "next/link";
import React from "react";
import "./styles/portfolio.css";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="portfolio-layout">
      <div className="portfolio__head">
        <h1 className="portfolio__title">Moje Portfolio</h1>
        <Link className="portfolio__back" href="/">
          Wróć do strony głównej
        </Link>
      </div>
      {children}
    </div>
  );
}
