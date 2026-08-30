import SectionHead from "@/components/ui/SectionHead";
import EngagementWalkthrough from "@/components/motif/EngagementWalkthrough";
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
          label={engagement.label}
          headline={engagement.headline}
          lede={engagement.lede}
        />

        <div className={styles.instrument} data-rise>
          <EngagementWalkthrough />
        </div>

        <div className={styles.boundary}>
          <p className={`label ${styles.boundaryLabel}`}>The small print</p>
          <p className={styles.boundaryText}>
            {engagement.boundary} <strong>{engagement.founding}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
