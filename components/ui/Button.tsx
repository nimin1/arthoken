"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import styles from "./Button.module.css";

type Props = {
  href: string;
  children: string;
  variant?: "primary" | "ghost";
  size?: "default" | "small";
  onInk?: boolean;
  magnetic?: boolean;
  arrow?: boolean;
  className?: string;
};

/**
 * Magnetic behaviour is reserved for the two most important calls to action.
 * It is pointer-only, capped at 6px, and disabled under reduced motion.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  onInk = false,
  magnetic = false,
  arrow = true,
  className,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef(0);

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (!magnetic || event.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${(dx * 12).toFixed(2)}px, ${(dy * 8).toFixed(2)}px, 0)`;
      });
    },
    [magnetic]
  );

  const reset = useCallback(() => {
    cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.transform = "";
  }, []);

  const classes = [
    styles.base,
    styles[variant],
    size === "small" ? styles.small : "",
    onInk ? styles.onInk : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      ref={ref}
      href={href}
      className={classes}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <span className={styles.labelWrap}>
        <span className={styles.label}>{children}</span>
        <span className={styles.labelGhost} aria-hidden="true">
          {children}
        </span>
      </span>
      {arrow ? (
        <svg className={styles.arrow} viewBox="0 0 12 10" fill="none" aria-hidden="true">
          <path d="M0 5h10.5M7 1.5 10.5 5 7 8.5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      ) : null}
    </Link>
  );
}
