import SectionHead from "@/components/ui/SectionHead";
import ReframeDiagram from "@/components/motif/ReframeDiagram";
import { imagine } from "@/lib/content";
import styles from "./Imagine.module.css";

export default function Imagine() {
  return (
    <section
      className={`section ${styles.section}`}
      id="imagine"
      aria-labelledby="imagine-title"
    >
      <div className="shell grid12">
        <SectionHead
          id="imagine-title"
          className={styles.head}
          label={imagine.label}
          headline={imagine.headline}
          lede={imagine.lede}
        />

        <p className={styles.promise} data-reveal="fade">
          {imagine.promise}
        </p>

        <div className={styles.diagram} data-reveal="fade">
          <ReframeDiagram />
        </div>
        <p className={styles.caption}>
          An illustration of the move, not a client engagement. The particular process
          changes every time. The question we ask about it does not.
        </p>

        <ol className={styles.moves}>
          {imagine.moves.map((move, i) => (
            <li
              key={move.n}
              className={styles.move}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <span className="label label--accent">{move.n}</span>
              <h3 className={styles.moveTitle}>{move.title}</h3>
              <p className={styles.moveBody}>{move.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
