import React from "react";
import { OffertBox } from "./OffertBox";
import "../../styles/offertpart.css";

export default function OffertPart() {
  return (
    <div className="offert-part">
      <h4 className="offert-part__title">Oferta</h4>
      <div className="offert-part__offert-boxes">
        <OffertBox title="Wedding Photos" icon="/heart.svg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          mollitia provident quaerat dolore at quibusdam doloremque facere id
          esse? Fugit dolores rem nam minima. Ex.
        </OffertBox>
        <OffertBox title="Special Events" icon="/event.svg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          mollitia provident quaerat dolore at quibusdam.
        </OffertBox>
      </div>
    </div>
  );
}
