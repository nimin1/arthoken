import SectionHead from "@/components/ui/SectionHead";
import HardeningDiagram from "@/components/motif/HardeningDiagram";
import { hardening } from "@/lib/content";
import styles from "./Hardening.module.css";

export default function Hardening() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="hardening-title">
      <div className="shell grid12">
        <SectionHead
          id="hardening-title"
          className={styles.head}
          label={hardening.label}
          headline={hardening.headline}
          lede={hardening.lede}
        />

        <p className={styles.closing} data-reveal="fade">
          {hardening.closing}
        </p>

        <div className={styles.diagram} data-reveal="fade">
          <HardeningDiagram />
        </div>
      </div>
    </section>
  );
}
