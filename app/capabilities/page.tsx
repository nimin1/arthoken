import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import Hardening from "@/components/sections/Hardening";
import Modernization from "@/components/sections/Modernization";
import Architecture from "@/components/sections/Architecture";
import AiEngineering from "@/components/sections/AiEngineering";
import ContactCta from "@/components/sections/ContactCta";
import { capabilities } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Capabilities",
  description: capabilities.lede,
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        label="Capabilities"
        headline={capabilities.headline}
        lede={capabilities.lede}
      />

      <section className="section section--tight">
        <div className="shell">
          {capabilities.items.map((cap) => (
            <article key={cap.n} className={styles.block}>
              <div className={styles.meta}>
                <span className="label label--accent">{cap.n}</span>
                <h2 className={styles.title}>{cap.title}</h2>
              </div>

              <div className={styles.body}>
                <p className="lede">{cap.lede}</p>
                <p className={styles.when}>
                  <span className="label">Engaged when</span>
                  <span className={styles.whenText}>{cap.engagedWhen}</span>
                </p>
                <ul className={styles.items}>
                  {cap.items.map((item) => (
                    <li key={item} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Hardening />

      <Modernization />

      <Architecture />

      <AiEngineering />

      <ContactCta />
    </>
  );
}
