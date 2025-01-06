import React from "react";
import "@/styles/cornerbox.css";

interface CornerBoxI {
  children: React.ReactNode;
  corners?: ("lt" | "lb" | "rt" | "rb")[];
  color?: React.CSSProperties["color"];
}

export default function CornerBox({
  children,
  corners = ["lt", "lb", "rt", "rb"],
  color = "black",
}: CornerBoxI) {
  return (
    <div className="corner-box__container">
      {corners.map((corner) => (
        <div
          key={corner}
          className={`corner-box__single-corner corner-${corner}`}
          style={{ borderColor: color }}
        />
      ))}

      {children}
    </div>
  );
}
