"use client";

import "@/styles/control/portfolio-order.css";
import { useAppContext } from "@/lib/AppContext";
import React from "react";

export default function ControlPortfolioOrder() {
  const { folders, settings, changePortfolioOrder } = useAppContext();

  const orderArray = React.useMemo(() => {
    return folders
      .filter((f) => f.showInPortfolio)
      .sort(
        (a, b) =>
          settings.portfolioOrder.indexOf(a.id) -
          settings.portfolioOrder.indexOf(b.id)
      );
  }, [folders, settings]);

  return (
    <div className="portfolio-order">
      <div className="portfolio-order__menu">
        <button className="portfolio-order__menu__button">
          Sortuj od najnowszego
        </button>
        <button className="portfolio-order__menu__button">
          Sortuj od najstarszego
        </button>
      </div>
      <div className="portfolio-order__list">
        {orderArray.map((f, index) => (
          <div className="portfolio-order__list-element" key={f.id}>
            <button
              onClick={() => changePortfolioOrder(-1, index)}
              className="portfolio-order__list-element__button"
            >
              Up
            </button>
            <button
              onClick={() => changePortfolioOrder(1, index)}
              className="portfolio-order__list-element__button"
            >
              Down
            </button>
            <p className="portfolio-order__list-element__name">{f.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
