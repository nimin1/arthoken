import SectionHead from "@/components/ui/SectionHead";
import { order } from "@/lib/content";
import styles from "./Order.module.css";

/** Three small glyphs, built from the same geometry as the mark. */
const GLYPHS = [
  // one unit
  "M17 8L26 13L17 18L8 13Z",
  // unit on a base
  "M17 6L26 11L17 16L8 11ZM17 20L26 25L17 30L8 25Z",
  // a small structure
  "M17 4L26 9L17 14L8 9ZM8 13L17 18L26 13M8 19L17 24L26 19",
];

export default function Order() {
  return (
    <section className="section" aria-labelledby="order-title">
      <div className="shell grid12">
        <SectionHead
          id="order-title"
          className={styles.head}
          label={order.label}
          headline={order.headline}
        />

        <ol className={styles.cards}>
          {order.steps.map((step, i) => (
            <li
              key={step.n}
              className={styles.card}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
            >
              <div className={styles.cardTop}>
                <span className="label label--accent">{step.n}</span>
                <svg className={styles.glyph} viewBox="0 0 34 34" aria-hidden="true">
                  <path
                    d={GLYPHS[i]}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                    opacity="0.85"
                  />
                </svg>
              </div>
              <h3 className={styles.term}>{step.term}</h3>
              <p className={styles.gloss}>{step.gloss}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
