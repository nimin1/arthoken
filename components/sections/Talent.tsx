import { talent } from "@/lib/content";
import styles from "./Talent.module.css";

export default function Talent() {
  return (
    <section
      className="section"
      aria-labelledby="talent-title"
    >
      <div className="shell grid12">
        <p className={`eyebrow ${styles.label}`}>
          <span className="label">{talent.label}</span>
        </p>

        <h2 id="talent-title" className={styles.headline} data-reveal="mask">
          <span className="mask-inner">{talent.headline}</span>
        </h2>

        <div className={styles.body}>
          {talent.body.map((p, i) => (
            <p
              key={p}
              className="prose"
              data-reveal="fade"
              style={{
                ["--reveal-delay" as string]: `${i * 90}ms`,
                marginBlockStart: i ? "1rem" : 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        <ul className={styles.commitments}>
          {talent.commitments.map((c, i) => (
            <li
              key={c}
              className={styles.commitment}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <span className={`label ${styles.commitmentIndex}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
