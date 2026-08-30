import { outcomes } from "@/lib/content";
import SectionHead from "@/components/ui/SectionHead";
import styles from "./Outcomes.module.css";

/**
 * Nothing in here is a claim. The measures are categories we agree
 * before a build starts, and the record is the shape a real case study
 * will take. The empty state is stated rather than papered over.
 */
export default function Outcomes() {
  return (
    <section className="section" id="results" aria-labelledby="outcomes-title">
      <div className="shell grid12">
        <SectionHead
          id="outcomes-title"
          label={outcomes.label}
          headline={outcomes.headline}
          lede={outcomes.lede}
        />

        <div className={styles.measures} data-rise>
          <p className={`label ${styles.blockLabel}`}>{outcomes.measuresLabel}</p>
          <dl className={styles.grid}>
            {outcomes.measures.map((m, i) => (
              <div
                key={m.k}
                className={styles.measure}
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${Math.min(i, 3) * 60}ms` }}
              >
                <dt className={styles.measureKey}>{m.k}</dt>
                <dd className={styles.measureVal}>{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.record} data-rise>
          <p className={`label ${styles.blockLabel}`}>{outcomes.recordLabel}</p>
          <ol className={styles.recordList}>
            {outcomes.record.map((r) => (
              <li key={r.n} className={styles.recordRow}>
                <span className={`label ${styles.recordN}`}>{r.n}</span>
                <span className={styles.recordField}>{r.field}</span>
                <span className={styles.recordNote}>{r.note}</span>
              </li>
            ))}
          </ol>
          <p className={styles.honest}>{outcomes.honest}</p>
        </div>
      </div>
    </section>
  );
}
