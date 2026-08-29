import SectionHead from "@/components/ui/SectionHead";
import { pricing } from "@/lib/content";
import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <section className="section" id="cost" aria-labelledby="pricing-title">
      <div className="shell grid12">
        <SectionHead
          id="pricing-title"
          label={pricing.label}
          headline={pricing.headline}
          lede={pricing.lede}
          aside={
            <div className={styles.aside} data-reveal="fade">
              {pricing.range ? <p className={styles.range}>{pricing.range}</p> : null}
              <ul className={styles.notes}>
                {pricing.notes.map((note) => (
                  <li key={note} className={styles.note}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          }
        />

        <ol className={styles.schedule}>
          {pricing.schedule.map((slice, i) => (
            <li
              key={slice.when}
              className={`${styles.slice} ${slice.free ? styles.free : ""}`}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <p className={styles.amount}>{slice.amount}</p>
              <h3 className={styles.when}>{slice.when}</h3>
              <p className={styles.sliceBody}>{slice.body}</p>
            </li>
          ))}
        </ol>

        <ul className={styles.terms}>
          {pricing.terms.map((term, i) => (
            <li
              key={term.title}
              className={styles.term}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <span className={styles.termMark} aria-hidden="true" />
              <div>
                <h3 className={styles.termTitle}>{term.title}</h3>
                <p className={styles.termBody}>{term.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className={styles.footnote}>{pricing.footnote}</p>
      </div>
    </section>
  );
}
