import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import ContactCta from "@/components/sections/ContactCta";
import { insights } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Insights",
  description: insights.lede,
};

export default function InsightsPage() {
  return (
    <>
      <PageHeader label="Insights" headline={insights.headline} lede={insights.lede} />

      <section className="section section--tight">
        <div className="shell">
          <ul className={styles.list}>
            {insights.items.map((item) => (
              <li key={item.title} className={styles.item}>
                <div className={styles.meta}>
                  <span className="label">{item.category}</span>
                  <span className="label label--accent">{item.status}</span>
                </div>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.dek}>{item.dek}</p>
              </li>
            ))}
          </ul>
          <p className={styles.note}>
            The archive opens with the first published piece. We would rather publish three
            essays worth reading than thirty worth skimming.
          </p>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
