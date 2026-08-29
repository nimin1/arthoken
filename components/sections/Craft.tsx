import SectionHead from "@/components/ui/SectionHead";
import PipelineDiagram from "@/components/motif/PipelineDiagram";
import { craft } from "@/lib/content";
import styles from "./Craft.module.css";

/**
 * Replaces the two separate "how we think" interludes. One section,
 * three movements: what we do before building, where the model helps
 * and where it does not, and what a handover has that a demo does not.
 */
export default function Craft() {
  return (
    <section className={`section ${styles.section}`} id="how-we-work" aria-labelledby="craft-title">
      <div className="shell grid12">
        <SectionHead
          id="craft-title"
          label={craft.label}
          headline={craft.headline}
          lede={craft.lede}
        />

        {/* --- Where the model helps --- */}
        <div className={styles.diagram} data-reveal="fade">
          <PipelineDiagram />
        </div>

        <p className={styles.accountability} data-reveal="fade">
          {craft.accountability}
        </p>

        {/* --- Then the part that takes the time --- */}
        <div className={styles.production}>
          <p className={`label ${styles.productionLabel}`}>{craft.productionLabel}</p>
          <div className={styles.productionGrid}>
            <div className={styles.demoCol}>
              <span className="label">Week one, what you click</span>
              <ul className={styles.demoList}>
                {craft.demo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.prodCol}>
              <span className="label label--accent">What we hand over</span>
              <ul className={styles.prodList}>
                {craft.production.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className={styles.closing} data-reveal="mask">
          <span className="mask-inner">{craft.closing}</span>
        </p>
      </div>
    </section>
  );
}
