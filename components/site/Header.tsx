"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";
import Button from "@/components/ui/Button";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.style.removeProperty("overflow");
      return;
    }
    document.body.style.overflow = "hidden";
    overlayRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (!focusable || focusable.length === 0) return;
      const list = Array.from(focusable);
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.removeProperty("overflow");
    };
  }, [open]);

  const isActive = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) return false;
      return href === "/" ? pathname === "/" : pathname.startsWith(href);
    },
    [pathname]
  );

  return (
    <>
      <header
        className={styles.header}
        data-scrolled={scrolled}
        data-open={open}
        data-panel={open ? "dark" : undefined}
      >
        <span className={styles.progress} aria-hidden="true" />
        <div className={`shell ${styles.inner}`}>
          <Link href="/" className={styles.logo} aria-label={`${site.name}, home`}>
            <Image
              className={styles.mark}
              src="/brand/mark.png"
              alt=""
              width={320}
              height={373}
              priority
              sizes="32px"
            />
            <span className={styles.wordmarkStack}>
              <Image
                className={`${styles.wordmark} ${styles.wordmarkInk}`}
                src="/brand/wordmark-ink.png"
                alt={site.name}
                width={640}
                height={100}
                priority
                sizes="130px"
              />
              <Image
                className={`${styles.wordmark} ${styles.wordmarkPaper}`}
                src="/brand/wordmark-paper.png"
                alt=""
                width={640}
                height={100}
                sizes="130px"
              />
            </span>
          </Link>

          <div className={styles.right}>
            <nav className={styles.nav} aria-label="Primary">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navLink}
                  data-active={isActive(item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <span className={styles.desktopCta}>
              <Button href="/contact" size="small">
                Start a conversation
              </Button>
            </span>

            <button
              ref={toggleRef}
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="label">{open ? "Close" : "Menu"}</span>
              <span className={styles.toggleBars} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={overlayRef}
        className={styles.overlay}
        data-panel="dark"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="shell">
          <nav className={styles.overlayNav} aria-label="Mobile">
            {nav.map((item, i) => (
              <div className={styles.overlayItem} key={item.href}>
                <Link
                  href={item.href}
                  className={styles.overlayLink}
                  style={{ transitionDelay: `${120 + i * 55}ms` }}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.overlayIndex}>{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className={styles.overlayFoot}>
            <Button href="/contact">Start a conversation</Button>
            <p className={`label ${styles.overlayTagline}`}>{site.tagline}</p>
          </div>
        </div>
      </div>
    </>
  );
}
