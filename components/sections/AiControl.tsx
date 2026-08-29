import SectionHead from "@/components/ui/SectionHead";
import PipelineDiagram from "@/components/motif/PipelineDiagram";
import { aiControl } from "@/lib/content";
import styles from "./AiControl.module.css";

export default function AiControl() {
  return (
    <section className="section" id="ai" aria-labelledby="ai-title">
      <div className="shell grid12">
        <SectionHead
          id="ai-title"
          className={styles.head}
          label={aiControl.label}
          headline={aiControl.headline}
          lede={aiControl.lede}
        />

        <div className={styles.diagram} data-reveal="fade">
          <PipelineDiagram />
        </div>

        <p className={styles.closing} data-reveal="mask">
          <span className="mask-inner">{aiControl.closing}</span>
        </p>
      </div>
    </section>
  );
}
