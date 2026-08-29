import SectionHead from "@/components/ui/SectionHead";
import { ai } from "@/lib/content";
import styles from "./AiEngineering.module.css";

export default function AiEngineering() {
  return (
    <section
      className={`section ${styles.section}`}
      data-surface="ink"
      id="ai"
      aria-labelledby="ai-title"
    >
      <div className="shell grid12">
        <SectionHead
          id="ai-title"
          className={styles.head}
          label={ai.label}
          headline={ai.headline}
          lede={ai.lede}
          wide
        />

        <div className={styles.columns}>
          {ai.columns.map((col) => (
            <div key={col.heading} className={styles.col} data-reveal="fade">
              <h3 className={styles.colHeading}>{col.heading}</h3>
              <ul className={styles.items}>
                {col.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className={styles.closing} data-reveal="mask">
          <span className="mask-inner">{ai.closing}</span>
        </p>
        <div className={styles.closingRule} data-reveal="line" />
      </div>
    </section>
  );
}
