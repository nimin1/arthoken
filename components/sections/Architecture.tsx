import SectionHead from "@/components/ui/SectionHead";
import ArchitectureDiagram from "@/components/motif/ArchitectureDiagram";
import { architecture } from "@/lib/content";
import styles from "./Architecture.module.css";

export default function Architecture() {
  return (
    <section className={`section ${styles.section}`} id="ai" aria-labelledby="architecture-title">
      <div className="shell grid12">
        <SectionHead
          id="architecture-title"
          className={styles.head}
          label={architecture.label}
          headline={architecture.headline}
          lede={architecture.lede}
        />

        <div className={styles.diagram} data-reveal="fade">
          <ArchitectureDiagram />
        </div>

        <ol className={styles.notes}>
          {architecture.notes.map((note, i) => (
            <li
              key={note.n}
              className={styles.note}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span className="label label--accent">{note.n}</span>
              <h3 className={styles.noteTitle}>{note.title}</h3>
              <p className={styles.noteBody}>{note.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
