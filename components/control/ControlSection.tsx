"use client";

import React from "react";

interface ControlSectionI {
  title: string;
  children: React.ReactNode;
  note?: string;
}

export default function ControlSection({
  children,
  title,
  note = "",
}: ControlSectionI) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div className={`control-section ${isExpanded ? "--sectionExpanded" : ""}`}>
      <div
        className="control-section__head"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <img
          src="/expand.svg"
          className={`control-section__expand-toggle ${
            isExpanded ? "--rotateToggle" : ""
          }`}
        />
        <p className="control-section__title">{title}</p>
      </div>
      <p className="control-section__note">{note}</p>
      <div className={`control-section__content`}>{children}</div>
    </div>
  );
}
