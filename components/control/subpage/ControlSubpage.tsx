import Link from "next/link";
import React from "react";
import "@/styles/control/control-subpage.css";

interface ControlSubpageI {
  children: React.ReactNode;
  title: string;
}

export default function ControlSubpage({ children, title }: ControlSubpageI) {
  return (
    <div className="control-subpage">
      <div className="control-subpage__head">
        <p className="control-subpage__heading">{title}</p>
        <Link className="control-subpage__back" href="/control">
          Wróć
        </Link>
      </div>
      <div className="control-subpage__children">{children}</div>
    </div>
  );
}
