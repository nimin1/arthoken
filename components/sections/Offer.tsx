import Button from "@/components/ui/Button";
import { offer } from "@/lib/content";
import styles from "./Offer.module.css";

/**
 * The one place the page raises its voice. Full bleed, teal, and it
 * says the single most differentiating thing Arthoken has to say
 * before the visitor has had to work for it.
 */
export default function Offer() {
  return (
    <section
      className={`stage ${styles.section}`}
      data-panel="dark"
      aria-labelledby="offer-title"
    >
      <div className={`shell grid12 ${styles.inner}`}>
        <p className={`eyebrow ${styles.eyebrow}`} data-reveal="fade">
          <span className="label">{offer.label}</span>
        </p>

        <h2 id="offer-title" className={`display-0 ${styles.statement}`}>
          {offer.statement.map((line, i) => (
            <span
              key={line}
              data-reveal="mask"
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
            >
              <span className="mask-inner">{line}</span>
            </span>
          ))}
        </h2>

        <div className={styles.body}>
          {offer.body.map((paragraph, i) => (
            <p
              key={paragraph}
              className={styles.para}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${180 + i * 90}ms` }}
            >
              {paragraph}
            </p>
          ))}
          <p className={styles.caveat}>{offer.caveat}</p>
          <div className={styles.action}>
            <Button href={offer.cta.href}>
              {offer.cta.label}
            </Button>
          </div>
        </div>

        <dl className={styles.facts}>
          {offer.facts.map((fact, i) => (
            <div
              key={fact.k}
              className={styles.fact}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <dt className={styles.factKey}>{fact.k}</dt>
              <dd className={styles.factVal}>{fact.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
