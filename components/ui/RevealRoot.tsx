"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole document. Server components opt in with
 * `data-reveal="mask | fade | line"`, so no section needs to become a
 * client component just to animate on entry.
 */
export default function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
    );

    targets.forEach((el) => {
      // Anything already above the fold on load shows immediately.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add("is-in");
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
