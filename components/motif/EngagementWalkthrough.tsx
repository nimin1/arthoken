"use client";

import { useRef, useState } from "react";
import { engagement } from "@/lib/content";
import styles from "./EngagementWalkthrough.module.css";

/** Index of the first step that costs money. Everything before it is free. */
const PAID_FROM = 4;

/**
 * The one thing on the page you operate rather than read. The section
 * claims you'll be clicking on something by the second meeting, so the
 * page hands you something to click on in the first thirty seconds.
 *
 * Under the hood it is an ordinary horizontal tablist: arrow keys,
 * Home and End work, and a noscript fallback lists every step as plain
 * text for anyone the JavaScript never reaches.
 */
export default function EngagementWalkthrough() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const steps = engagement.steps;
  const step = steps[active];
  const paid = active >= PAID_FROM;

  const go = (next: number) => {
    const i = (next + steps.length) % steps.length;
    setActive(i);
    tabs.current[i]?.focus();
  };

  return (
    <div className={styles.wrap} data-panel="dark">
      <div className={styles.top}>
        <span className="label label--mono">How an engagement runs</span>
        <span className={`label label--mono ${styles.hint}`} aria-hidden="true">
          Click a step
        </span>
      </div>

      {/* ---------- The track ---------- */}
      <div
        className={styles.track}
        role="tablist"
        aria-label="Steps in an engagement"
        aria-orientation="horizontal"
        style={{ ["--count" as string]: steps.length, ["--active" as string]: active }}
      >
        <span className={styles.rail} aria-hidden="true" />
        <span className={styles.railFill} aria-hidden="true" />
        <span className={styles.boundary} aria-hidden="true">
          <span className={styles.boundaryTag}>Nothing invoiced before this line</span>
        </span>

        {steps.map((s, i) => (
          <button
            key={s.n}
            type="button"
            role="tab"
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`eng-tab-${s.n}`}
            aria-selected={i === active}
            aria-controls="eng-panel"
            tabIndex={i === active ? 0 : -1}
            className={styles.stop}
            data-state={i === active ? "on" : i < active ? "done" : "off"}
            data-paid={i >= PAID_FROM ? "true" : "false"}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                go(active + 1);
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                go(active - 1);
              }
              if (e.key === "Home") {
                e.preventDefault();
                go(0);
              }
              if (e.key === "End") {
                e.preventDefault();
                go(steps.length - 1);
              }
            }}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.stopN}>{s.n}</span>
            <span className={styles.stopWhen}>{s.when}</span>
          </button>
        ))}
      </div>

      {/* ---------- The panel ---------- */}
      <div
        className={styles.panel}
        id="eng-panel"
        role="tabpanel"
        aria-labelledby={`eng-tab-${step.n}`}
        tabIndex={0}
      >
        <div key={step.n} className={styles.panelBody}>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.body}>{step.body}</p>
        </div>

        <div className={styles.meter} data-paid={paid ? "true" : "false"}>
          <span className="label label--mono">Invoiced so far</span>
          <span className={styles.amount}>{paid ? "Agreed up front" : "0"}</span>
          <span className={styles.meterNote}>
            {paid
              ? "A fixed price for this phase, quoted after you have seen the prototype."
              : "No invoice, no deposit, no retainer. You can stop here and owe us nothing."}
          </span>
        </div>
      </div>

      {/* Without JavaScript the track cannot be operated, so every step
          is written out instead of leaving four of them unreachable. */}
      <noscript>
        <ol className={styles.fallback}>
          {steps.map((s, i) => (
            <li key={s.n}>
              <span className="label label--mono">
                {s.n} · {s.when}
                {i >= PAID_FROM ? " · chargeable" : " · free"}
              </span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </li>
          ))}
        </ol>
      </noscript>
    </div>
  );
}
