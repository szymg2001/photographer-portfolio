"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

export default function AboutTitle() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef);

  return (
    <h6 className={`about__title ${inView && "--titleInView"}`} ref={titleRef}>
      Kim Jestem
    </h6>
  );
}
