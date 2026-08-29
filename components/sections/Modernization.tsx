import SectionHead from "@/components/ui/SectionHead";
import StranglerDiagram from "@/components/motif/StranglerDiagram";
import { modernization } from "@/lib/content";
import styles from "./Modernization.module.css";

export default function Modernization() {
  return (
    <section className="section" aria-labelledby="modernization-title">
      <div className="shell grid12">
        <SectionHead
          id="modernization-title"
          className={styles.head}
          label={modernization.label}
          headline={modernization.headline}
          lede={modernization.lede}
        />

        <ol className={styles.steps}>
          {modernization.steps.map((step, i) => (
            <li
              key={step.n}
              className={styles.step}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span className="label label--accent">{step.n}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className={styles.diagram} data-reveal="fade">
          <StranglerDiagram />
        </div>
      </div>
    </section>
  );
}
