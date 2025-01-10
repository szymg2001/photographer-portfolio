import React from "react";
import { OffertBox } from "./OffertBox";
import "@/styles/homepage/offertpart.css";

export default function OffertPart() {
  return (
    <div className="offert-part">
      <h4 className="offert-part__title">Co Mogę dla Ciebie zrobić</h4>
      <div className="offert-part__offert-boxes">
        <OffertBox title="Fotografia Ślubna" icon="/heart.svg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          mollitia provident quaerat dolore at quibusdam doloremque facere id
          esse? Fugit dolores rem nam minima. Ex.
        </OffertBox>
        <OffertBox title="Fotografia Eventowa" icon="/event.svg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          mollitia provident quaerat dolore at quibusdam.
        </OffertBox>
        <OffertBox title="Sesje rodzinne i portrety" icon="/event.svg">
          Rodzinne chwile są bezcenne – uwiecznij je w naturalny sposób podczas
          sesji rodzinnej. Oferuję również indywidualne portrety dla osób, które
          chcą podkreślić swoją osobowość.
        </OffertBox>
        <OffertBox title="Fotografia Produktowa" icon="/event.svg">
          Profesjonalne zdjęcia produktów, jedzenia i wnętrz – idealne do
          e-commerce, katalogów i kampanii reklamowych.
        </OffertBox>
      </div>
    </div>
  );
}
