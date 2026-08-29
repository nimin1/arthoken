"use client";

import { useState } from "react";
import SectionHead from "@/components/ui/SectionHead";
import { pains } from "@/lib/content";
import styles from "./Pains.module.css";

/**
 * The buyer's sentence, not ours. Everything else on the page follows from
 * whichever of these four a visitor recognises.
 */
export default function Pains() {
  const [active, setActive] = useState(0);
  const pain = pains.items[active];

  const blocks = [
    { label: "What is usually going on", body: pain.really },
    { label: "What we do about it", body: pain.weDo },
    { label: "What you end up with", body: pain.youGet },
  ];

  return (
    <section className="section section--sunk" id="pains" aria-labelledby="pains-title">
      <div className="shell grid12">
        <SectionHead
          id="pains-title"
          label={pains.label}
          headline={pains.headline}
          lede={pains.lede}
        />

        <div className={styles.tabs} role="tablist" aria-label="Common problems">
          {pains.items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`pain-tab-${item.id}`}
              aria-selected={i === active}
              aria-controls="pain-panel"
              tabIndex={i === active ? 0 : -1}
              className={styles.tab}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  e.preventDefault();
                  setActive((v) => (v + 1) % pains.items.length);
                }
                if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  setActive((v) => (v - 1 + pains.items.length) % pains.items.length);
                }
              }}
            >
              <span className={styles.tabQuote}>&ldquo;{item.quote}&rdquo;</span>
              <span className={styles.tabShort}>{item.short}</span>
            </button>
          ))}
        </div>

        <div
          className={styles.panel}
          id="pain-panel"
          role="tabpanel"
          aria-labelledby={`pain-tab-${pain.id}`}
          tabIndex={0}
        >
          <div key={pain.id} className={styles.panelKey}>
            <div className={styles.panelTop}>
              <span className="label label--accent">{pain.short}</span>
            </div>
            {blocks.map((block) => (
              <div key={block.label} className={styles.block}>
                <span className="label">{block.label}</span>
                <p className={styles.blockBody}>{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
