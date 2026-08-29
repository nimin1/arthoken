"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Publishes a normalised pointer offset as --px / --py on its own element.
 * Pointer-only, rAF-throttled, capped, and inert under reduced motion or
 * on coarse pointers. Children stay server-rendered.
 */
export default function PointerParallax({
  children,
  strength = 14,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const enabled = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enabled.current = fine && !still;
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled.current) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const ny = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.setProperty("--px", `${(nx * strength).toFixed(2)}px`);
        el.style.setProperty("--py", `${(ny * strength).toFixed(2)}px`);
      });
    },
    [strength]
  );

  const reset = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
  }, []);

  return (
    <div ref={ref} className={className} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </div>
  );
}
