"use client";

import React from "react";

interface ControlSectionI {
  title: string;
  children: React.ReactNode;
}

export default function ControlSection({ children, title }: ControlSectionI) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div className={`control-section ${isExpanded ? "--sectionExpanded" : ""}`}>
      <div className="control-section__head">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="control-section__expand-toggle"
        >
          V
        </button>
        <p className="control-section__title">{title}</p>
      </div>
      <div className={`control-section__content`}>{children}</div>
    </div>
  );
}
