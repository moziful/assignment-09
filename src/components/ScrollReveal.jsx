"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    // Import scrollreveal only on the client
    import("scrollreveal").then((module) => {
      const ScrollReveal = module.default;
      const sr = ScrollReveal({
        origin: "bottom",
        distance: "30px",
        duration: 800,
        delay: 100,
        easing: "ease-out",
        reset: false,
      });

      if (ref.current) sr.reveal(ref.current);
    });
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}
