import SectionHead from "@/components/ui/SectionHead";
import { philosophy } from "@/lib/content";
import styles from "./Philosophy.module.css";

export default function Philosophy() {
  return (
    <section
      className={`section ${styles.section}`}
      data-surface="sunk"
      id="philosophy"
      aria-labelledby="philosophy-title"
    >
      <div className="shell grid12">
        <div className={styles.aside}>
          <SectionHead
            id="philosophy-title"
            label={philosophy.label}
            headline={philosophy.headline}
            lede={philosophy.lede}
          />
          <p className={styles.count}>
            <span className={styles.countNum}>07</span>
            <span className="label">Positions</span>
          </p>
        </div>

        <ol className={styles.list}>
          {philosophy.principles.map((p, i) => (
            <li
              key={p.n}
              className={styles.item}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${Math.min(i, 4) * 70}ms` }}
            >
              <span className={`label ${styles.n}`}>{p.n}</span>
              <div>
                <h3 className={styles.statement}>{p.statement}</h3>
                <p className={styles.gloss}>{p.gloss}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
