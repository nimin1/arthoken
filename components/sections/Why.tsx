import SectionHead from "@/components/ui/SectionHead";
import { honesty, why } from "@/lib/content";
import styles from "./Why.module.css";

/**
 * The trust section. It says the awkward thing first, on purpose:
 * a new firm that admits it reads better than one that hides it.
 */
export default function Why() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="why-title">
      <div className="shell grid12">
        <SectionHead
          id="why-title"
          className={styles.head}
          label={honesty.label}
          headline={honesty.headline}
        />

        <div className={styles.body}>
          {honesty.body.map((paragraph, i) => (
            <p
              key={paragraph}
              className="prose"
              data-reveal="fade"
              style={{
                ["--reveal-delay" as string]: `${i * 90}ms`,
                marginBlockStart: i ? "1rem" : 0,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <hr className={`accent-rule ${styles.rule}`} data-reveal="line" />

        <ul className={styles.list}>
          {why.points.map((point, i) => (
            <li
              key={point.n}
              className={styles.item}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <div className={styles.itemHead}>
                <span className={`label ${styles.n}`}>{point.n}</span>
                <h3 className={styles.title}>{point.title}</h3>
              </div>
              <p className={styles.itemBody}>{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
