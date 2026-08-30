import SectionHead from "@/components/ui/SectionHead";
import { why } from "@/lib/content";
import styles from "./Why.module.css";

/**
 * The operating-model contrast. Read left to right, each row is the same
 * decision made two ways. Nobody is named, and the left column describes
 * an arrangement rather than the people working inside one.
 */
export default function Why() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="why-title">
      <div className="shell grid12">
        <SectionHead
          id="why-title"
          label={why.label}
          headline={why.headline}
          lede={why.lede}
        />

        <div className={styles.table} data-rise>
          <div className={styles.headRow} aria-hidden="true">
            <span className={`label ${styles.usualHead}`}>{why.usualHead}</span>
            <span className={`label label--accent ${styles.oursHead}`}>{why.oursHead}</span>
          </div>

          <dl className={styles.rows}>
            {why.rows.map((row, i) => (
              <div
                key={row.ours}
                className={styles.row}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${Math.min(i, 4) * 60}ms` }}
              >
                <dt className={styles.usual}>{row.usual}</dt>
                <dd className={styles.ours}>
                  <span className={styles.oursTitle}>{row.ours}</span>
                  <span className={styles.gloss}>{row.gloss}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className={styles.compounding} data-reveal="fade">
          {why.compounding}
        </p>
      </div>
    </section>
  );
}
