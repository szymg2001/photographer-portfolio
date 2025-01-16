import Link from "next/link";
import React from "react";
import "@/styles/portfolio/portfolio.css";
import Heading from "@/components/Heading";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="portfolio-layout">
      <Heading value="Moje Portfolio" />
      {children}
    </div>
  );
}
