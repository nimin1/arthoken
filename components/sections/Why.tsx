import { why } from "@/lib/content";
import styles from "./Why.module.css";

/**
 * Deliberately the quietest section on the page. It arrives after the
 * pricing band, which is loud, and it is set small so the scroll has
 * somewhere to land before the closing panel.
 */
export default function Why() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="why-title">
      <div className="shell grid12">
        <div className="head-quiet">
          <h2 id="why-title" className={`label ${styles.kicker}`}>
            {why.label}
          </h2>
          <p className={styles.aside}>{why.aside}</p>
        </div>

        <ul className={styles.list}>
          {why.points.map((point, i) => (
            <li
              key={point.n}
              className={styles.item}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span className={`label ${styles.n}`}>{point.n}</span>
              <h3 className={styles.title}>{point.title}</h3>
              <p className={styles.itemBody}>{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
