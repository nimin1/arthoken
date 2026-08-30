"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole document. Server components opt in with
 * `data-reveal="mask | fade | line"`, so no section needs to become a
 * client component just to animate on entry.
 *
 * The important detail is what happens when a reveal is missed. A fast
 * scroll, a press of End, or a jump to an anchor can carry an element
 * past the viewport without the observer ever reporting it as visible,
 * and with a naive implementation that element stays invisible for the
 * rest of the session. Everything below exists to make that impossible.
 */
export default function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (targets.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const show = (el: Element) => el.classList.add("is-in");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal when it comes into view, and also when it has gone
          // past the top, which is how a fast scroll presents an
          // element the observer never got to report as intersecting.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      // Threshold 0 catches elements taller than the viewport, which can
      // never satisfy a ratio-based threshold on a small screen.
      { rootMargin: "0px 0px -10% 0px", threshold: [0, 0.15] }
    );

    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) show(el);
      else io.observe(el);
    });

    // A belt-and-braces sweep. If anything is still hidden once the
    // scroll settles but is at or above the fold, show it.
    let raf = 0;
    const sweep = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        for (const el of Array.from(
          document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
        )) {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            show(el);
            io.unobserve(el);
          }
        }
      });
    };

    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep, { passive: true });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("resize", sweep);
    };
  }, [pathname]);

  return null;
}
