import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import EngagementDiagram from "@/components/motif/EngagementDiagram";
import { engagement } from "@/lib/content";
import styles from "./Engagement.module.css";

export default function Engagement() {
  return (
    <section
      className={`section ${styles.section}`}
      id="how"
      aria-labelledby="engagement-title"
    >
      <div className="shell grid12">
        <SectionHead
          id="engagement-title"
          className={styles.head}
          label={engagement.label}
          headline={engagement.headline}
          lede={engagement.lede}
        />
        <div className={styles.action}>
          <Button href={engagement.cta.href}>{engagement.cta.label}</Button>
        </div>

        <div className={styles.diagram} data-reveal="fade">
          <EngagementDiagram />
        </div>

        <ol className={styles.steps}>
          {engagement.steps.map((step, i) => (
            <li
              key={step.n}
              className={styles.step}
              data-reveal="fade"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <span className={`label ${styles.when}`}>{step.when}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className={styles.boundary}>
          <p className={`label ${styles.boundaryLabel}`}>The small print</p>
          <p className={styles.boundaryText}>{engagement.boundary}</p>
        </div>
      </div>
    </section>
  );
}
